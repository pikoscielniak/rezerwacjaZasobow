/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('eventsListController', ['$scope', 'reservations', 'dhxSchedulerConfig', '$rootScope', 'resources', 'filterData', '$q',
        function ($scope, reservations, dhxSchedulerConfig, $rootScope, resources, filterData, $q) {
            "use strict";

            $scope.reservations = reservations.get();

            $scope.loading = false;

            $scope.loadMore = function() {
                var deferred = $q.defer();

                setTimeout(function(){
                    $scope.$apply(function(){
                        if(Math.random() < 0.8) {
                            var reservation = {title:"Nowa rezerwacja", user_id: 1, resource_id: 1, "start": "2013-08-01T15:00:00.000Z", "end": "2013-08-01T18:00:00.000Z", description: "lorem ipsum"};
                            deferred.resolve(reservations.save(reservation));
                        } else {
                            deferred.reject("Math.rand() > 0.8");
                        }
                    });
                },1000);

                return deferred.promise;
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