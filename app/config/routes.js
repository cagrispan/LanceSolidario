/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('lanceSolidario')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/view1', {
                templateUrl: 'view/view1.html',
                controller: 'View1Ctrl',
                controllerAs: 'view1'
            })
            .when('/view2', {
                templateUrl: 'view/view2.html',
                controller: 'View2Ctrl',
                controllerAs: 'view2'
            })
            .otherwise({redirectTo: '/view1'});
    }]);