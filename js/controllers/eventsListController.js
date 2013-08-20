/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('eventsListController', ['$scope', 'reservations', 'dhxSchedulerConfig', '$rootScope', 'resources', 'filterData', '$q',
        function ($scope, reservations, dhxSchedulerConfig, $rootScope, resources, filterData, $q) {
            "use strict";

            $scope.reservations = [];

            reservations.get().then(function(response){
                $scope.reservations = response;
            }, function(){

            });

            $scope.loading = false;

            $scope.loadMore = function(page) {
                return reservations.page(page);
            };

//            debugger;
//            var childrenHeight;
//            do {
//                childrenHeight = 0;
//                $(".list-view").children().each(function(){
//                    childrenHeight += $(this).height();
//                });
//            } while($(".list-view").height() < childrenHeight);

        }]);