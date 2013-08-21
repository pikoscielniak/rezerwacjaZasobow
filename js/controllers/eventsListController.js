/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('eventsListController', ['$scope', 'reservations', 'dhxSchedulerConfig', '$rootScope', 'resources', 'filterData', '$q',
        function ($scope, reservations, dhxSchedulerConfig, $rootScope, resources, filterData, $q) {
            "use strict";

            $scope.loadMore = function(page) {
                return reservations.page(page);
            };

            $scope.changeFilter = function(){
                $scope.reservationsList.setFilter(function(obj){
                    return obj.title[0] === 'w';
                });
            };

        }]);