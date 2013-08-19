/*global angular,_,$,kendo */

angular.module('project.services')
    .factory('schedulerConfig', ['resources', 'reservations', 'filterData', function(resources, reservations, filterData){
        "use strict";

        var today = new Date(kendo.format('{0:MM-dd-yyyy}', new Date()));

        var views = function(){
            return [
                {type: "day", startTime: new Date("2013/6/6 08:00"), endTime: new Date("2013/6/6 18:00")},
                {type: "week", startTime: new Date("2013/6/6 08:00"), endTime: new Date("2013/6/6 18:00")},
                {type: "month", selected: true }
            ];
        };

        var getResources = function(){
            return [
                {
                    field: "resource._id",
                    dataTextField: "name",
                    dataValueField: "_id",
                    dataSource: {
                        transport: {
                            read: {
                                url: "http://localhost:3000/resources",
                                dataType: "json",
                                cache: false
                            }
                        }
                    }
                }
            ];
        };

        var getTemplate = function () {
            return $("#scheduler-editor").html();
        };

        var getSchedulerOptions = function(saveReservation, removeReservation){
            return {
                allDaySlot: true,
                date: today,
                height: 600,
                editable: {
                    confirmation: "Czy jesteś pewien?",
                    template: getTemplate
                },
                eventTemplate: $("#event-template").html(),
                majorTick: 30,
                minorTickCount: 2,
                timezone: "Europe/Warsaw",
                views: views(),

                dataSource: {
                    transport: {
                        read: {
                            url: "http://localhost:3000/reservations",
                            dataType: "json",
                            cache: false
                        },
                        create: {
                            url: "http://localhost:3000/reservation/new",
                            dataType: "json",
                            method: "post"
                        },
                        update: {
                            url: "http://localhost:3000/reservation/update",
                            dataType: "json",
                            method: "post"
                        },
                        destroy: {
                            url: "http://localhost:3000/reservation/delete",
                            dataType: "json",
                            method: "post"
                        }
                    }
                },

                resources: getResources(),

                save: function (e) {
                    e.model.reservation = {
                        _id: e.model._id,
                        title: e.model.title,
                        description: e.model.description,
                        start: e.model.start,
                        end: e.model.end,
                        user: e.model.user.value || e.model.user._id,
                        resource: e.model.resource.value || e.model.resource._id
                    };
                    return true;
                },
                remove: function (e) {
                    e.event.reservation = {
                        _id: e.event._id
                    };
                    return true;
                }
            };
        };

        var selectorOptions = function(optionLabel, url){
            return {
                dataTextField: "name",
                dataValueField: "_id",
                optionLabel: optionLabel,
                dataSource: {
                    transport: {
                        read: {
                            dataType: "json",
                            url: url,
                            cache: false
                        }
                    }
                }
            };
        };

        return {
            getSchedulerOptions: getSchedulerOptions,
            selectorOptions: selectorOptions
        };
    }]);


