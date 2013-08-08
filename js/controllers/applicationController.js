/*global _,$,angular */

angular.module('project.controllers')
    .controller('applicationController', ['$scope', 'reservations', 'resources', 'users', '$rootScope', 'filterData',
        function ($scope, reservations, resources, users, $rootScope, filterData) {
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

        function loadReservations() {
                $scope.reservations = reservations.get();
        }

        $scope.$on('refresh', function (e) {
            $scope.$apply(function(){
                loadReservations();
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