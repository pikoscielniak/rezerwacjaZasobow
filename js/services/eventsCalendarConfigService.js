/*global angular,_,$,kendo */

angular.module('project.services')
    .factory('eventsCalendarConfig', ['resources', 'reservations', function(resources, reservations){
        "use strict";

        var getOptions = function (dataStorage) {
            dataStorage = {
                addEvent: function (obj, successCallback, errorCallback) {
                    debugger;
                },
                updateEvent: function (obj, successCallback, errorCallback) {
                    debugger;
                },
                deleteEvent: function (obj, successCallback, errorCallback) {
                    debugger;
                },
                loadEvents: function (visibleCalendars, successCallback, errorCallback) {
                    debugger;
                },
                addCalendar: function (obj, successCallback, errorCallback) {
                    debugger;
                },
                updateCalendar: function (obj, successCallback, errorCallback) {
                    debugger;
                },
                deleteCalendar: function (obj, successCallback, errorCallback) {
                    debugger;
                },
                loadCalendars: function (successCallback, errorCallback) {
                    debugger;
                }
            };

            return {
                timeInterval: 15,
                timeIntervalHeight: 30,
                timeRulerFormat: "{0:h:mm tt}",
                timeRulerInterval: 30,
//                dataStorage: dataStorage
            };
        };


        return {
            getOptions: getOptions
        };
    }]);
