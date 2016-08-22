/**
 * Main Application
 * @author Fabio Costa
 */
var app = (function () {
    "use strict";

    var app = angular.module("helloApp", [
        "ui.router", "firebase"
    ]);

    /**
     * @typedef {cast} cast
     */
    app.constant("cast", cast);

    app.config(["$stateProvider", function ($stateProvider) {

        $stateProvider
            .state("home", {
                templateUrl : "views/home.html",
                controller : "homeController"
            })
            .state("splash", {
                templateUrl : "views/splash.html",
                controller : "splashController"
            }).state("welcome", {
                templateUrl : "views/welcome.html",
                controller : "welcomeController"
            });

    }]);

    app.run(["$state", "$rootScope", "$firebaseArray", "messageBusService", run]);

    function run($state, $rootScope, $firebaseArray, messageBusService, mediaManagerService) {

        var ref = firebase.database().ref().child("orders");

        $rootScope.orders = $firebaseArray(ref);

        messageBusService.init();

        $state.go("splash");
    }

    app.filter('orderObjectBy', function() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    });


    return app;

})();
