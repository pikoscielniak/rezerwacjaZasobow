/*global kendo,angular,$,_,alert*/
'use strict';

angular.module('project', ['kendo.directives']).
    config(function ($routeProvider) {
        $routeProvider.
            when("/", {controller: ReservationsCtrl, templateUrl: "view/reservationList.html"}).
            otherwise({redirectTo: "/"});

    });

function ReservationsCtrl($scope, $http, $compile) {
    $http.get('app/users/users.json').success(function (data) {
        $scope.users = data;
    });

//    $http.get('app/resources/resources.json').success(function (data) {
//        $scope.resources = data;
//    });

//    $http.get('app/reservations/reservations.json').success(function (data) {
//        debugger;
//        $scope.reservations = data;
//    });

    $scope.resources = [
        {"id": 3, "name": "drukarka", "color": "orange"},
        {"id": 1, "name": "samochód", "color": "blue"},
        {"id": 2, "name": "projektor", "color": "yellow"}
    ];

    $scope.reservations = [
        {"id": 6, "user_id": 3, "user_name": "Franek", "resource_id": 3, "resource_name": "drukarka", "start": "2013-08-01T15:00:00.000Z", "end": "2013-08-01T18:00:00.000Z", "title": "asd", "description": ""},
        {"id": 1, "user_id": 1, "user_name": "Maciek", "resource_id": 3, "resource_name": "drukarka", "start": "2013-08-01T18:00:00.000Z", "end": "2013-08-02T18:00:00.000Z", "title": "dddd", "description": ""},
        {"id": 2, "user_id": 2, "user_name": "Wojtek", "resource_id": 1, "resource_name": "samochód", "start": "2013-08-02T08:00:00.000Z", "end": "2013-08-02T16:00:00.000Z", "title": "dwa", "description": ""},
        {"id": 3, "user_id": 2, "user_name": "Wojtek", "resource_id": 1, "resource_name": "samochód", "start": "2013-08-03T08:00:00.000Z", "end": "2013-08-07T08:00:00.000Z", "title": "2 1", "description": ""},
        {"id": 4, "user_id": 3, "user_name": "Franek", "resource_id": 2, "resource_name": "projektor", "start": "2013-08-01T15:00:00.000Z", "end": "2013-08-01T18:00:00.000Z", "title": "0 2", "description": ""},
        {"id": 5, "user_id": 1, "user_name": "Maciek", "resource_id": 2, "resource_name": "projektor", "start": "2013-08-15T14:45:00.000Z", "end": "2013-08-15T15:45:00.000Z", "title": "1 2", "description": ""}
    ];

    $scope.reservationSelector = function (reservation) {
        var ret = true;
        if ($scope.resource) {
            ret = ret && reservation.resource_id === $scope.resource.id;
        }

        if ($scope.user) {
            ret = ret && reservation.user_id === $scope.user.id;
        }

        return ret;
    };

    $scope.addReservation = function () {
        if (!$scope.user) {
            alert("Musisz wybrać użytkownika.");
        }
        else if (!$scope.resource) {
            alert("Musisz wybrać zasób.");
        }
        else {
            $scope.reservations.push({user_id: $scope.user.id, resource_id: $scope.resource.id, start: $scope.startTime, end: $scope.endTime});
        }
    };

    $scope.removeReservation = function (obj) {
        $scope.reservations = $.grep($scope.reservations, function (value) {
            if (value.id !== obj.id) {
                return value;
            }
        });
    };

    $scope.newReservation = function (obj) {
        obj.user_name = $scope.findUser(obj.user_id).name;
        obj.resource_name = $scope.findResource(obj.resource_id).name;
        if (_.find($scope.reservations, function (a) {
            return a.id === obj.id;
        }) === undefined) {
            obj.id = _.max($scope.reservations,function (res) {
                return res.id;
            }).id + 1;
            $scope.reservations.push(obj);
            return true;
        } else {
            var i = _.indexOf($scope.reservations, _.find($scope.reservations, function (res) {
                return res.id === obj.id;
            }));
            $scope.reservations[i] = obj;
            return false;
        }
    };

    $scope.findUser = function (user_id) {
        return _.find($scope.users, function (user) {
            return user.id === user_id;
        });
    };

    $scope.findResource = function (resource_id) {
        return _.find($scope.resources, function (resource) {
            return resource.id === resource_id;
        });
    };

    $scope.resourceSelected = function (id) {
        return id === ($scope.resource && $scope.resource.id);
    };

    var today = new Date(kendo.format('{0:MM-dd-yyyy}', new Date()));

    var dataPickerOptions = {
        culture: "pl-PL",
        value: today,
        start: "month",
        depth: "year",
        interval: 15,
        timeFormat: "HH:mm",
        format: "dd/MM/yyyy HH:mm"
    };

    $scope.endDataPickerOptions = dataPickerOptions;

    $scope.startDataPickerOptions = dataPickerOptions;

    $scope.schedulerOptions = {
        allDaySlot: true,
        date: today,
        height: 400,
        editable: {
            confirmation: "Czy jesteś pewien?",
            template: function () {
                debugger;
//                var html = $compile($("#scheduler-editor").html())($scope);
//                $("#scheduler-editor").html("");
//                $("#scheduler-editor").find("option[value='"+($scope.resource && $scope.resource.id)+"']").attr("selected","selected");
                var sel = $("#scheduler-editor").find("select[name='resource']");
//                console.log(sel);
                sel.val($scope.resource && $scope.resource.id);
//                $("#scheduler-editor").find('select[name="resource"]').find('option[value="'+($scope.resource && $scope.resource.id)+'"]').attr("selected",true);


                return $("#scheduler-editor").html();
            }
        },
        eventTemplate: $("#event-template").html(),
        majorTick: 30,
        minorTickCount: 2,
        views: [
            "day",
            "week",
            {type: "month", selected: true }
        ],
        timezone: "Etc/UTC",

        dataSource: {
            data: $scope.reservations,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number", validation: { required: true } },
                        title: { defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", parse: function (d) {
                            return new Date(d);
                        }, validation: { required: true }},
                        end: { type: "date", parse: function (d) {
                            return new Date(d);
                        }, validation: { required: true }},
                        user_id: {type: "number", validation: { required: true }},
                        user_name: {type: "string", validation: { required: true }},
                        resource_id: {type: "number", validation: { required: true }},
                        resource_name: {type: "string", validation: { required: true }},
                        description: {type: "string", validation: { required: true }}
                    }
                }
            }
        },

        resources: [
            {
                field: "resource_id",
                dataTextField: "name",
                dataValueField: "id",
                dataSource: $scope.resources
            }
        ],

        save: function (e) {
            $scope.$apply(function () {
                $scope.newReservation(e.model);
            });
        },
        remove: function (e) {
            $scope.$apply(function () {
                $scope.removeReservation(e.event);
            });
        },
        cancel: function (e) {
            console.log("Cancel");
        }

    };

    $scope.addDataFilter = function () {
        var filter = {
            logic: "and",
            filters: []
        };

        if ($scope.user) {
            filter.filters.push({field: "user_id", operator: "eq", value: $scope.user.id});
        }

        if ($scope.resource) {
            filter.filters.push({field: "resource_id", operator: "eq", value: $scope.resource.id});
        }
        $scope.scheduler.dataSource.filter(filter);
    };
}