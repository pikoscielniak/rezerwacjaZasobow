/*global kendo,angular,$*/
'use strict';

angular.module('project', ['kendo.directives']).
    config(function ($routeProvider) {
        $routeProvider.
            when("/", {controller: ReservationsCtrl, templateUrl: "view/reservationList.html"}).
            otherwise({redirectTo: "/"});

    });

function ReservationsCtrl($scope, $http) {
    $http.get('app/users/users.json').success(function (data) {
        $scope.users = data;
    });

    $http.get('app/resources/resources.json').success(function (data) {
        $scope.resources = data;
    });

    $http.get('app/reservations/reservations.json').success(function (data) {
        $scope.reservations = data;
    });

    $scope.reservationSelector = function (reservation) {
        var ret = true;
        if ($scope.resource) {
            ret &= reservation.resource_id === $scope.resource.id;
        }

        if ($scope.user) {
            ret &= reservation.user_id === $scope.user.id;
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
            $scope.reservations.push({user_id: $scope.user.id, resource_id: $scope.resource.id, startTime: $scope.startTime, endTime: $scope.endTime});
        }
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
        allDaySlot: false,
        date: today,
        height: 400,
        editable: {
            confirmation: "Czy jesteś pewien?",
            template: $("#scheduler-editor").html()
        },
        eventTemplate: $("#event-template").html(),
        majorTick: 30,
        minorTickCount: 2,

        startTime: new Date("2013/6/13 07:00 AM"),
        views: [
            "day",
            { type: "week", selected: true },
            "month",
            "agenda"
        ],
        timezone: "Etc/UTC",
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "http://demos.kendoui.com/service/tasks",
                    dataType: "jsonp"
                },
                update: {
                    url: "http://demos.kendoui.com/service/tasks/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "http://demos.kendoui.com/service/tasks/create",
                    dataType: "jsonp"
                },
                destroy: {
                    url: "http://demos.kendoui.com/service/tasks/destroy",
                    dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                model: {
                    id: "taskId",
                    fields: {
                        taskId: { from: "TaskID", type: "number" },
                        title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", from: "Start" },
                        end: { type: "date", from: "End" },
                        startTimezone: { from: "StartTimezone" },
                        endTimezone: { from: "EndTimezone" },
                        description: { from: "Description" },
                        recurrenceId: { from: "RecurrenceID" },
                        recurrenceRule: { from: "RecurrenceRule" },
                        recurrenceException: { from: "RecurrenceException" },
                        ownerId: { from: "OwnerID", defaultValue: 1 },
                        isAllDay: { type: "boolean", from: "IsAllDay" }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                    { field: "ownerId", operator: "eq", value: 1 },
                    { field: "ownerId", operator: "eq", value: 2 }
                ]
            }
        },
        resources: [
            {
                field: "ownerId",
                title: "Owner",
                dataSource: [
                    { text: "Alex", value: 1, color: "#f8a398" },
                    { text: "Bob", value: 2, color: "#51a0ed" },
                    { text: "Charlie", value: 3, color: "#56ca85" }
                ]
            }
        ]
    };

}