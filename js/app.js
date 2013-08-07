/*global angular*/

var app = angular.module('project', ['kendo.directives', 'project.controllers', 'project.services']).
    config(function ($routeProvider, $locationProvider) {
        "use strict";

        $routeProvider.
            when("/", {controller: 'kendoSchedulerController', templateUrl: "view/kendoScheduler/index.html"}).
            when("/kendoScheduler", {controller: 'kendoSchedulerController', templateUrl: "view/kendoScheduler/index.html"}).
            when("/eventsCalendar", {controller: 'eventsCalendarController', templateUrl: "view/eventsCalendar/index.html"}).
            when("/dhxScheduler", {controller: 'dhxSchedulerController', templateUrl: "view/dhxScheduler/index.html"}).
            otherwise({redirectTo: "/"});

//        $locationProvider.html5Mode(true);
    });

angular.module('project.controllers',[]);
angular.module('project.services',[]);
angular.module('project.directives',[]);
angular.module('project.filters',[]);