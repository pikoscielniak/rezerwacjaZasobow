/*global _,$,angular*/

angular.module('project.services')
    .factory('resources', function(){
        "use strict";

        var resources = [
            {"id": 3, "name": "drukarka", "color": "orange"},
            {"id": 1, "name": "samochód", "color": "blue"},
            {"id": 2, "name": "projektor", "color": "yellow"}
        ];

        var get = function(){
            return resources;
        };

        var find = function (resource_id) {
            return _.find(resources, function (resource) {
                return resource.id === resource_id;
            });
        };

        return {
            get: get,
            find: find
        };
    });

