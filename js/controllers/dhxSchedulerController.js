/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('dhxSchedulerController', ['$scope', 'reservations', 'eventsCalendarConfig', '$rootScope',
        function ($scope, reservations, eventsCalendarConfig, $rootScope) {
            "use strict";

            var loadReservations = function(){
                var reserv = reservations.get();
                var data = _.map(reserv, function(reservation){
                    return {
                        id: reservation.id,
                        text: reservation.title,
                        start_date: new Date(reservation.start),
                        end_date: new Date(reservation.end)
                    };
                });
                return data;
            };

            var refreshDhxScheduler = function(){
                scheduler.parse(loadReservations(), 'json');
            };

            var filterData = function(user, resource){

            };

            $scope.$on('filterReservations', function (e, value) {
                filterData(value.user, value.resource);
            });

            $scope.$on('refresh', function(e, value){
                refreshDhxScheduler();
            });

            var refreshCallback = function(func){
                return function(a){
                    var ret = func(a);

                    $rootScope.$broadcast('refresh');
                    return ret;
                };
            };

            scheduler.init('scheduler_here', new Date(),"month");
            scheduler.parse(loadReservations(), 'json');

            scheduler.attachEvent("onEventDeleted", function(id){
                var i = parseInt(id);
                var res = reservations.find(i);
                reservations.destroy(res);
                $rootScope.$broadcast('refresh');
            });


        }]);