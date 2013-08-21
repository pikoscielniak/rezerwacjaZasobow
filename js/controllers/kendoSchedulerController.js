/*global _,$,angular */

angular.module('project.controllers')
    .controller('kendoSchedulerController', ['$scope', 'reservations', 'schedulerConfig', '$rootScope', 'filterData', '$timeout',
        function ($scope, reservations, schedulerConfig, $rootScope, filterData, $timeout) {
        "use strict";

        $scope.filter = "";

        var refreshScheduler = function() {
//            var dataSource = schedulerConfig.generateSchedulerDataSource();
//            $scope.scheduler.setDataSource(dataSource);
        };

        $scope.userSelectorOptions = schedulerConfig.selectorOptions("Wybierz użytkownika", "http://localhost:3000/users");
        $scope.resourceSelectorOptions = schedulerConfig.selectorOptions("Wybierz zasób", "http://localhost:3000/resources");

        var refreshCallback = function(func){
            return function(a){
                var ret = func(a);

                $rootScope.$broadcast('refresh');
                return ret;
            };
        };

        $scope.schedulerOptions = schedulerConfig.getSchedulerOptions(refreshCallback(reservations.save), refreshCallback(reservations.destroy));

        var filterScheduler = function(){
            var filter = {
                logic: "and",
                filters: []
            };

            if(filterData.getUser()){
                filter.filters.push({field: "user", operator: "eq", value: filterData.getUser()});
            }

            if(filterData.getResource()){
                filter.filters.push({field: "resource", operator: "eq", value: filterData.getResource()});
            }

            _.each($scope.filter.split(' '), function(f){
                if(f.length >= 2){
                    var strFilter = {
                        logic: "or",
                        filters: [
                            {field: "fullUser.name", operator: "contains", value: f},
                            {field: "fullResource.name", operator: "contains", value: f},
                            {field: "fullResource.description", operator: "contains", value: f},
                            {field: "description", operator: "contains", value: f},
                            {field: "title", operator: "contains", value: f}
                        ]
                    };

                    filter.filters.push(strFilter);
                }
            });


            $scope.scheduler.dataSource.filter(filter);
        };

        $scope.$on('filterReservations', function (e) {
            filterScheduler();
        });

        var filtered;
        $scope.$watch('filter', function(){
            var filter = $scope.filter;

            $timeout(function(){
                if(filter === $scope.filter){
                    if($scope.filter.length >= 2){
                        filterScheduler();
                        filtered = true;
                    } else {
                        if(filtered){
                            filterScheduler();
                            filtered = false;
                        }
                    }
                }
            }, 400);

        });

    }]);