/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('resourcesListController', ['$scope', 'reservations', 'dhxSchedulerConfig', '$rootScope', 'resources', 'filterData', '$q',
        function ($scope, reservations, dhxSchedulerConfig, $rootScope, resources, filterData, $q) {
            "use strict";

            resources.generate();
            resources.generate();
            resources.generate();
            resources.generate();
            resources.generate();
            $scope.resources = resources.get();

            $scope.loading = false;

            $scope.loadMore = function() {
                var deferred = $q.defer();

                setTimeout(function(){
                    $scope.$apply(function(){
                        if(Math.random() < 0.8) {
                            deferred.resolve(resources.generate());
                        } else {
                            deferred.reject("Math.rand() > 0.8");
                        }
                    });
                },1000);

                return deferred.promise;
            };



        }]);