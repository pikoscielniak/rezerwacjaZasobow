/*global _,$,angular */

angular.module('project.controllers')
    .controller('applicationController', ['$scope', 'reservations', 'resources', 'users', '$rootScope', 'filterData', 'applicationConfig',
        function ($scope, reservations, resources, users, $rootScope, filterData, applicationConfig) {
        "use strict";

         users.get().then(function(users) {
                $scope.users = users;
            }, function(error) {
                console.error(error);
            });

         resources.get().then(function(resources) {
                $scope.resources = resources;
            }, function(error) {
                console.error(error);
            });

         reservations.get().then(function(reservations) {
                $scope.reservations = reservations;
            }, function(error) {
                console.error(error);
            });

        $scope.userSelectorOptions = applicationConfig.userSelectorOptions;
        $scope.resourceSelectorOptions = applicationConfig.resourceSelectorOptions;

        $scope.reservationSelector = function (reservation) {
            var ret = true;
            var resource = filterData.getResource();
            var user = filterData.getUser();
            if (resource) {
                ret = ret && reservation.resource._id === resource;
            }

            if (user) {
                ret = ret && reservation.user._id === user;
            }

            return ret;
        };

        $scope.$on('refresh', function (e) {
            $scope.$apply(function(){
//                reload table
            });
        });

        $scope.$watch('user', function(user){
            filterData.setUser(user);
            $rootScope.$broadcast('filterReservations');
        });

        $scope.$watch('resource', function(resource){
            filterData.setResource(resource);
            $rootScope.$broadcast('filterReservations');
        });

    }]);