'use strict';
angular.module('lanceSolidario')
    .controller('NewAuctionCtrl', function ($scope) {
        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }

        $scope.events = [];
        $scope.options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: false,
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.hstep = 1;
        $scope.mstep = 15;

        var date = new Date();
        date.setMinutes( (Math.floor(date.getMinutes() / 15) * 15 ) + 15);

        $scope.dt = date;
        $scope.options.minDate = new Date();
    });
