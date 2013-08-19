/*global _,$,angular */

angular.module('project.controllers')
    .controller('applicationController', ['$scope', 'reservations', 'resources', 'users', '$rootScope', 'filterData', 'applicationConfig',
        function ($scope, reservations, resources, users, $rootScope, filterData, applicationConfig) {
        "use strict";

        loadReservations();


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

        $scope.userSelectorOptions = applicationConfig.userSelectorOptions();
        $scope.resourceSelectorOptions = applicationConfig.resourceSelectorOptions();

//        $scope.reservationSelector = function (reservation) {
//            var ret = true;
//            var resource = filterData.getResource();
//            var user = filterData.getUser();
//            if (resource) {
//                ret = ret && reservation.resource._id === resource._id;
//            }
//
//            if (user) {
//                ret = ret && reservation.user._id === user._id;
//            }
//
//            return ret;
//        };

        function loadReservations() {
                $scope.reservations = reservations.get();
        }

        $scope.$on('refresh', function (e) {
            $scope.$apply(function(){
                loadReservations();
            });
        });

//        $scope.$watch('userId', function(user_id){
//            debugger;
//            var user = users.find(user_id);
//            filterData.setUser(user);
//            $rootScope.$broadcast('filterReservations');
//        });
//
//        $scope.$watch('resourceId', function(resource_id){
//            var resource = resources.find(resource_id);
//            filterData.setResource(resource);
//            $rootScope.$broadcast('filterReservations');
//        });

    }]);