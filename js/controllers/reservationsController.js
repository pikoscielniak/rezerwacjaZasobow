/*global _,$,angular */

angular.module('project.controllers')
    .controller('reservationsController', ['$scope', '$http', 'reservations', 'resources', 'users', 'schedulerConfig', function ($scope, $http, reservations, resources, users, schedulerConfig) {
        "use strict";

        loadReservations();

        $scope.users = users.get();
        $scope.resources = resources.get();

        $scope.reservationSelector = function (reservation) {
            var ret = true;
            if ($scope.resource) {
                ret = ret && reservation.resource_id === $scope.resource.id;
            }

            if ($scope.user) {
                ret = ret && reservation.user_id === $scope.user.id;
            }

            return ret;
        };

        $scope.resourceSelected = function (id) {
            return id === ($scope.resource && $scope.resource.id);
        };

        var refreshScheduler = function() {
            var dataSource = schedulerConfig.generateSchedulerDataSource();
            $scope.scheduler.setDataSource(dataSource);
            schedulerConfig.filterData($scope.scheduler, $scope.user, $scope.resource);
        };

        function loadReservations() {
            $scope.reservations = reservations.get();
        }

        var refreshCallback = function(func){
             return function(a){
                var ret = func(a);

                $scope.$apply(function () {
                    loadReservations();
                    refreshScheduler();
                });
                return ret;
             };
        };

        $scope.schedulerOptions = schedulerConfig.getSchedulerOptions(refreshCallback(reservations.save), refreshCallback(reservations.destroy));

        $scope.filterData = function () {
            schedulerConfig.filterData($scope.scheduler, $scope.user, $scope.resource);
        };

    }]);