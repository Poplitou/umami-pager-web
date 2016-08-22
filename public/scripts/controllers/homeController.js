/**
 * Home controller
 * @author Fabio Costa
 */
(function () {
    "use strict";

    var controllerId = "homeController";

    app.controller(controllerId, ["$scope", "$state", "$rootScope", homeController]);

    function homeController ($scope, $state, $rootScope) {

        var model = {};
        var audio1 = new WebAudio('sound/ding.mp3');

        model.orders = $rootScope.orders;

        model.orders.$watch(function(event) {
            if(model == null){
                return;
            }
            if(event.event == "child_changed"){
                var order = model.orders[model.orders.$indexFor(event.key)];
                if(order.done == order.locations.length) {
                    audio1.play();
                }
            }

            if(event.event == "child_added" || event.event == "child_removed") {
                if(model.orders.length == 0){
                    $state.go("welcome");
                }
            }

        });

        $scope.$on("$destroy", function () {

            model = null;
            console.log(controllerId + ".$destroy");

        });

        $scope.model = model;
    }

    function WebAudio(src) {
    if(src) this.load(src);
}

WebAudio.prototype.audioContext = new AudioContext;

WebAudio.prototype.load = function(src) {
    if(src) this.src = src;
    console.log('Loading audio ' + this.src);
    var self = this;
    var request = new XMLHttpRequest;
    request.open("GET", this.src, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
        self.audioContext.decodeAudioData(request.response, function(buffer) {
            if (!buffer) {
                if(self.onerror) self.onerror();
                return;
            }

            self.buffer = buffer;

            if(self.onload)
                self.onload(self);
        }, function(error) {
            self.onerror(error);
        });
    };
    request.send();
};

WebAudio.prototype.play = function() {
    var source = this.audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
};

})();
