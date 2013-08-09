/*global _,$,angular */

angular.module('project.controllers')
    .controller('kendoSchedulerController', ['$scope', 'reservations', 'schedulerConfig', '$rootScope', 'filterData',
        function ($scope, reservations, schedulerConfig, $rootScope, filterData) {
        "use strict";

        var refreshScheduler = function() {
            var dataSource = schedulerConfig.generateSchedulerDataSource();
            $scope.scheduler.setDataSource(dataSource);
        };

        var refreshCallback = function(func){
            return function(a){
                var ret = func(a);

                $rootScope.$broadcast('refresh');
                return ret;
            };
        };

        $scope.selectorOptions = schedulerConfig.selectorOptions;

        $scope.schedulerOptions = schedulerConfig.getSchedulerOptions(refreshCallback(reservations.save), refreshCallback(reservations.destroy));

        $scope.$on('filterReservations', function (e) {
            refreshScheduler();
        });

        $scope.$on('refresh', function(e){
            refreshScheduler();
        });

    }]);