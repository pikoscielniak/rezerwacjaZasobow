/*global _,$,angular */

angular.module('project.controllers')
    .controller('applicationController', ['$scope', 'reservations', 'resources', 'users', '$rootScope', 'filterData', 'applicationConfig',
        function ($scope, reservations, resources, users, $rootScope, filterData, applicationConfig) {
        "use strict";

        loadReservations();

        $scope.users = users.get();
        $scope.resources = resources.get();

        $scope.userSelectorOptions = applicationConfig.userSelectorOptions();
        $scope.resourceSelectorOptions = applicationConfig.resourceSelectorOptions();

        $scope.reservationSelector = function (reservation) {
            var ret = true;
            var resource = filterData.getResource();
            var user = filterData.getUser();
            if (resource) {
                ret = ret && reservation.resource_id === resource.id;
            }

            if (user) {
                ret = ret && reservation.user_id === user.id;
            }

            return ret;
        };

        function loadReservations() {
                $scope.reservations = reservations.get();
        }

        $scope.$on('refresh', function (e) {
            $scope.$apply(function(){
                loadReservations();
            });
        });

        $scope.$watch('userId', function(user_id){
            var user = users.find(user_id);
            filterData.setUser(user);
            $rootScope.$broadcast('filterReservations');
        });
            
        $scope.$watch('resourceId', function(resource_id){
            var resource = resources.find(resource_id);
            filterData.setResource(resource);
            $rootScope.$broadcast('filterReservations');
        });

    }]);