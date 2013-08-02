/*global kendo,angular,$,_,alert*/
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

//    $http.get('app/reservations/reservations.json').success(function (data) {
//        debugger;
//        $scope.reservations = data;
//    });

    $scope.reservations = [
        {"id": 6, "user_id": 0, "resource_id": 0, "start": "2013-08-01T15:00:00.000Z", "end": "2013-08-01T18:00:00.000Z", "title": "asd"},
        {"id": 1, "user_id": 1, "resource_id": 0, "start": "2013-08-01T18:00:00.000Z", "end": "2013-08-02T18:00:00.000Z", "title": "dddd"},
        {"id": 2, "user_id": 2, "resource_id": 1, "start": "2013-08-02T08:00:00.000Z", "end": "2013-08-02T16:00:00.000Z", "title": "dwa"},
        {"id": 3, "user_id": 2, "resource_id": 1, "start": "2013-08-03T08:00:00.000Z", "end": "2013-08-07T08:00:00.000Z", "title": "2 1"},
        {"id": 4, "user_id": 0, "resource_id": 2, "start": "2013-08-01T15:00:00.000Z", "end": "2013-08-01T18:00:00.000Z", "title": "0 2"},
        {"id": 5, "user_id": 1, "resource_id": 2, "start": "2013-08-15T14:45:00.000Z", "end": "2013-08-15T15:45:00.000Z", "title": "1 2"}
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

    $scope.removeReservation = function(obj){
        $scope.reservations = $.grep($scope.reservations, function(value) {
            if(value.id !== obj.id){
                return value;
            }
        });
    };

    $scope.newReservation = function(obj){
//        if(_.filter($scope.reservations, function(res){ return res.id === obj.id; }).length < 0){
        if(obj.id === 0){
            obj.id = _.max($scope.reservations, function(res){return res.id;}).id + 1;
            $scope.reservations.push(obj);
            return true;
        } else {
            var i = _.indexOf($scope.reservations, _.find($scope.reservations, function(res){return res.id === obj.id;}));
            $scope.reservations[i] = obj;
            return false;
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
        views: [
            "day",
            "week",
            {type: "month", selected: true },
            "agenda"
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
                        start: { type: "date", parse: function(d){return new Date(d);}, validation: { required: true }},
                        end: { type: "date", parse: function(d){return new Date(d);}, validation: { required: true }},
                        user_id: {type: "number", validation: { required: true }},
                        resource_id: {type: "number", validation: { required: true }}
                    }
                }
            }

        },

        save: function(e){
            $scope.$apply(function(){
                $scope.newReservation(e.model);
//                $scope.reservations.push({id: 100, user_id:0, resource_id:0, start: e.model.start, end: e.model.end, title: e.model.title});
            });
        },
        remove: function(e){
            $scope.$apply(function(){
                $scope.removeReservation(e.event);
            });
        }


    };
}