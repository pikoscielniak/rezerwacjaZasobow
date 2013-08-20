/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('resourcesListController', ['$scope', 'reservations', 'dhxSchedulerConfig', '$rootScope', 'resources', 'filterData', '$q',
        function ($scope, reservations, dhxSchedulerConfig, $rootScope, resources, filterData, $q) {
            "use strict";

            $scope.loadMore = function(page) {
                return resources.page(page);
            };

            $scope.resource = {};

            $scope.addResource = function(){
                resources.create($scope.resource).then(function(){

                }, function(err){

                });
                $scope.resource = {};
            };



        }]);