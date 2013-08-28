/*global angular*/

var app = angular.module('project', ['kendo.directives', 'project.controllers', 'project.services', 'project.filters', 'project.directives', 'eDokument.calendar']).
    config(function ($routeProvider) {
        "use strict";

        $routeProvider.
            when("/", {controller: 'kendoSchedulerController', templateUrl: "view/kendoScheduler/index.html"}).
            when("/kendoScheduler", {controller: 'kendoSchedulerController', templateUrl: "view/kendoScheduler/index.html"}).
            when("/dhxScheduler", {controller: 'dhxSchedulerController', templateUrl: "view/dhxScheduler/index.html"}).
            when("/listView", {controller: 'eventsListController', templateUrl: "view/listView/index.html"}).
            when("/resourcesList", {controller: 'resourcesListController', templateUrl: "view/resourcesList/index.html"}).
            when("/generate", {controller: 'generateDataController', templateUrl: "view/generate/index.html"}).
            when("/eDokumentCalendar", {controller: 'eDocumentCalendarController', templateUrl: "view/calendar/index.html"}).
            otherwise({redirectTo: "/"});

//        $locationProvider.html5Mode(true);
    });

angular.module('project.controllers',[]);
angular.module('project.services',[]);
angular.module('project.directives',[]);
angular.module('project.filters',[]);