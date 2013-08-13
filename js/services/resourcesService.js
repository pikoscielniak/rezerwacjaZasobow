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
            resource_id = parseInt(resource_id, 10);
            return _.find(resources, function (resource) {
                return resource.id === resource_id;
            });
        };

        var maxId = function () {
            var max = _.max(resources,function (res) {
                return res.id;
            }).id;
            return max || 1;
        };

        var count = 0;
        var generate = function(){
            var newResource = {
                id: maxId()+1,
                name: "zasób nr "+count,
                color: "#"+(Math.floor((Math.random()*16777216))).toString(16)
            };
            count += 1;
            resources.push(newResource);
            return newResource;
        };

        return {
            get: get,
            find: find,
            generate: generate
        };
    });

