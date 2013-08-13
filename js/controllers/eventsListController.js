/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('eventsListController', ['$scope', 'reservations', 'dhxSchedulerConfig', '$rootScope', 'resources', 'filterData',
        function ($scope, reservations, dhxSchedulerConfig, $rootScope, resources, filterData) {
            "use strict";

            $scope.reservations = reservations.get();

            $scope.showDetails = function(reservation){
                $("#reservation-"+reservation.id+" .details").slideToggle();
            };

            $scope.loading = false;

            $scope.loadMore = function() {
                if($scope.loading){
                    return;
                } else {
                    $scope.loading = true;
                    setTimeout(function(){
                        $scope.$apply(function(){
                            var reservation = reservations[0];
                            $scope.reservations.push({id: "7",title:"Nowa rezerwacja", user_name: "Franek", "start": "2013-08-01T15:00:00.000Z", "end": "2013-08-01T18:00:00.000Z", description: "lorem ipsum"});
                            $scope.loading = false;
                        });
                    },1000);
                }
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