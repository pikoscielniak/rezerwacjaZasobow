/*global _,$,angular */

angular.module('project.controllers')
    .controller('applicationController', ['$scope', 'reservations', 'resources', 'users', '$rootScope',
        function ($scope, reservations, resources, users, $rootScope) {
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

        $scope.filterData = function () {
            $rootScope.$broadcast('filterReservations', {user: $scope.user, resource: $scope.resource});
        };

        $scope.$on('refresh', function (e) {
            $scope.$apply(function(){
                loadReservations();
            });
        });

    }]);