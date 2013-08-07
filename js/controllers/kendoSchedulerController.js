/*global _,$,angular */

angular.module('project.controllers')
    .controller('kendoSchedulerController', ['$scope', 'reservations', 'schedulerConfig', '$rootScope',
        function ($scope, reservations, schedulerConfig, $rootScope) {
        "use strict";

        var refreshScheduler = function() {
            var dataSource = schedulerConfig.generateSchedulerDataSource();
            $scope.scheduler.setDataSource(dataSource);
            schedulerConfig.filterData($scope.scheduler, $scope.user, $scope.resource);
        };

        var refreshCallback = function(func){
            return function(a){
                var ret = func(a);

                $rootScope.$broadcast('refresh');
                return ret;
            };
        };

        $scope.schedulerOptions = schedulerConfig.getSchedulerOptions(refreshCallback(reservations.save), refreshCallback(reservations.destroy));

        $scope.$on('filterReservations', function (e, value) {
            filterData(value.user, value.resource);
        });

        $scope.$on('refresh', function(e, value){
            refreshScheduler();
        });

        var filterData = function (user, resource) {
            schedulerConfig.filterData($scope.scheduler, user, resource);
        };

    }]);