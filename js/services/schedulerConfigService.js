/*global angular,_,$,kendo */

angular.module('project.services')
    .factory('schedulerConfig', ['resources', 'reservations', 'filterData', function(resources, reservations, filterData){
        "use strict";

        var today = new Date(kendo.format('{0:MM-dd-yyyy}', new Date()));

        var current_month = today.getMonth();
        var current_year = today.getFullYear();

        var views = function(){
            return [
                {
                    type: "day",
                    startTime: new Date("2013/6/6 08:00"),
                    endTime: new Date("2013/6/6 18:00")},
                {
                    type: "week",
                    startTime: new Date("2013/6/6 08:00"),
                    endTime: new Date("2013/6/6 18:00")},
                {
                    type: "month",
                    eventHeight: 20,
                    selected: true
                }
            ];
        };

        var getResources = function(){
            return [
                {
                    field: "resource",
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
                            cache: false,
                            data: {
                                month: current_month,
                                year: current_year
                            }
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
                    },
                    schema: {
                        data: function(reservations) {
                            if(reservations instanceof Array){
                                _.each(reservations, function(reservation){
                                    reservation.user = reservation.user._id;
                                    reservation.resource = reservation.resource._id;
                                });
                            } else if(!(reservations instanceof String)) {
                                reservations.user = reservations.user._id || reservations.user;
                                reservations.resource = reservations.resource._id || reservations.resource;
                            }
                            return reservations;
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
                        user: e.model.user.value || e.model.user,
                        resource: e.model.resource.value || e.model.resource
                    };
                    return true;
                },
                remove: function (e) {
                    e.event.reservation = {
                        _id: e.event._id
                    };
                    return true;
                },
                dataBinding: function(e) {
                    if(current_month !== this.date().getMonth() || current_year !== this.date().getFullYear()){
                        current_month = this.date().getMonth();
                        current_year = this.date().getFullYear();
                        this.dataSource.read({
                            month: current_month,
                            year: current_year
                        });
                    }
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


