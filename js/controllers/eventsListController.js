/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('eventsListController', ['$scope', 'reservations', '$timeout', '$rootScope', 'resources', 'filterData', '$q',
        function ($scope, reservations, $timeout, $rootScope, resources, filterData, $q) {
            "use strict";

            $scope.filter = "";

            $scope.loadMore = function(page) {
                var filter;
                if($scope.filter.length >= 2){
                    filter = $scope.filter;
                }
                return reservations.page(page, filter);
            };

            var filtered;
            $scope.$watch('filter', function(){
                var filter = $scope.filter;

                $timeout(function(){
                    if(filter === $scope.filter){
                        if($scope.filter.length >= 2){
                            $scope.reservationsList.reload();
                            filtered = true;
                        } else {
                            if(filtered){
                                $scope.reservationsList.reload();
                                filtered = false;
                            }
                        }
                    }
                }, 400);

            });

        }]);