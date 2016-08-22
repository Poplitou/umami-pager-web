/**
 * Order Item directive
 * @author Fabio Costa
 */
(function () {
    "use strict";

    app.directive("order", function () {
        return {
            restrict : "EA",
            scope: {
                data: '='
            },
            templateUrl: 'templates/order-item.html',
            link: function(scope, element, attr){
            }
        };

    });

})();
