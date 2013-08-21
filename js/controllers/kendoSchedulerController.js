/*global _,$,angular */

angular.module('project.controllers')
    .controller('kendoSchedulerController', ['$scope', 'reservations', 'schedulerConfig', '$rootScope', 'filterData',
        function ($scope, reservations, schedulerConfig, $rootScope, filterData) {
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

        $scope.$on('filterReservations', function (e) {
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

            $scope.scheduler.dataSource.filter(filter);
        });

        var filtered;
        $scope.$watch('filter', function(){
            if($scope.filter.length > 3){
                var current_month = $scope.scheduler.date().getMonth();
                var current_year = $scope.scheduler.date().getFullYear();
                $scope.scheduler.dataSource.read({
                    month: current_month,
                    year: current_year,
                    f: $scope.filter
                });
                filtered = true;
            } else {
                if(filtered){
                    var current_month = $scope.scheduler.date().getMonth();
                    var current_year = $scope.scheduler.date().getFullYear();
                    $scope.scheduler.dataSource.read({
                        month: current_month,
                        year: current_year,
                    });
                    filtered = false;
                }
            }
        });

//        $scope.$on('refresh', function(e){
//            refreshScheduler();
//        });

    }]);