/*global angular*/

var app = angular.module('project', ['kendo.directives', 'project.controllers', 'project.services']).
    config(function ($routeProvider) {
        "use strict";

        $routeProvider.
            when("/", {controller: 'reservationsController', templateUrl: "view/reservationList.html"}).
            otherwise({redirectTo: "/"});

    });

angular.module('project.controllers',[]);
angular.module('project.services',[]);