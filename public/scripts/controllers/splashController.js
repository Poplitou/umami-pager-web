/**
 * Splash controller
 * @author Fabio Costa
 */
(function () {
    "use strict";

    var controllerId = "splashController";

    app.controller(controllerId, ["$scope", "$state", "$rootScope", "$timeout", splashController]);

    function splashController ($scope, $state, $rootScope, $timeout) {

        var model = {

            title: "Umami Shop Order Pager",

            version: appConstant.APP.VERSION
        };

        var preloadImgs = ['img/cafe-complete-final.png',
            'img/cafe-complete.png',
            'img/cafe.png',
            'img/deli-complete-final.png',
            'img/deli-complete.png',
            'img/deli.png',
            'img/kitchen-complete-final.png',
            'img/kitchen-complete.png',
            'img/kitchen.png'
        ];

        preload(preloadImgs);

        $timeout(function () {

            if($rootScope.orders.length == 0)
                $state.go("welcome");
            else
                $state.go("home");

        }, 5000);

        $scope.$on("$destroy", function () {

            model = null;
            console.log(controllerId + ".$destroy");

        });

        $scope.model = model;
    }

    function preload(imgs) {
        var img;
        for (var i = 0, len = imgs.length; i < len; ++i) {
            img = new Image();
            img.src = imgs[i];
        }
    }

})();
