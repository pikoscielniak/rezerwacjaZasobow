/*global angular*/

var app = angular.module('project', ['kendo.directives', 'project.controllers', 'project.services', 'project.filters', 'project.directives']).
    config(function ($routeProvider, $locationProvider) {
        "use strict";

        $routeProvider.
            when("/", {controller: 'kendoSchedulerController', templateUrl: "view/kendoScheduler/index.html"}).
            when("/kendoScheduler", {controller: 'kendoSchedulerController', templateUrl: "view/kendoScheduler/index.html"}).
            when("/dhxScheduler", {controller: 'dhxSchedulerController', templateUrl: "view/dhxScheduler/index.html"}).
            when("/listView", {controller: 'eventsListController', templateUrl: "view/listView/index.html"}).
            when("/resourcesList", {controller: 'resourcesListController', templateUrl: "view/resourcesList/index.html"}).
            otherwise({redirectTo: "/"});

//        $locationProvider.html5Mode(true);
    });

angular.module('project.controllers',[]);
angular.module('project.services',[]);
angular.module('project.directives',[]);
angular.module('project.filters',[]);