/**
 * Splash controller
 * @author Fabio Costa
 */
(function () {
    "use strict";

    var controllerId = "welcomeController";

    app.controller(controllerId, ["$scope", "$rootScope", "$state", splashController]);

    function splashController ($scope, $rootScope, $state) {

        var model = {

            title: "Welcome to Umami Shop!"

        };

        $rootScope.orders.$watch(function(event) {
            if(event.event == "child_added" || event.event == "child_removed") {
                console.log("working");
                if($rootScope.orders.length > 0){
                    $state.go("home");
                }
            }
        });

        $scope.$on("$destroy", function () {

            model = null;
            console.log(controllerId + ".$destroy");

        });

        $scope.model = model;
    }

})();
