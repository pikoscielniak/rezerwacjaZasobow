/*global _,$,angular,scheduler */

angular.module('project.controllers')
    .controller('dhxSchedulerController', ['$scope', 'reservations', 'eventsCalendarConfig', '$rootScope',
        function ($scope, reservations, eventsCalendarConfig, $rootScope) {
            "use strict";

            var loadReservations = function(){
                debugger;
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

            scheduler.init('scheduler_here', new Date(),"month");
            scheduler.parse(loadReservations(), 'json');


        }]);