/*global _,$,angular */

angular.module('project.controllers')
    .controller('eventsCalendarController', ['$scope', 'reservations', 'eventsCalendarConfig', '$rootScope',
        function ($scope, reservations, eventsCalendarConfig, $rootScope) {
            "use strict";

            $("#eventsCalendar").wijevcal(eventsCalendarConfig.getOptions());


        }]);