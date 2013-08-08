/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('dhxSchedulerController', ['$scope', 'reservations', 'dhxSchedulerConfig', '$rootScope', 'resources', 'filterData',
        function ($scope, reservations, dhxSchedulerConfig, $rootScope, resources, filterData) {
            "use strict";

            dhxSchedulerConfig.init($scope, $rootScope);

            $scope.$on('filterReservations', function (e, value) {
                dhxSchedulerConfig.refreshDhxScheduler();
            });

            $scope.$on('refresh', function(e){
                dhxSchedulerConfig.refreshDhxScheduler();
            });

        }]);