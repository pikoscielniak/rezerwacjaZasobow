/*global _,$,angular*/

angular.module('project.services')
    .factory('resources', function(){
        "use strict";

        var resources = [
            {"id": 3, "name": "drukarka", "color": "orange", "description": "opis drukarki"},
            {"id": 1, "name": "samochód", "color": "blue", "description": "opis samochodu"},
            {"id": 2, "name": "projektor", "color": "yellow", "description": "opis projektora"}
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
                color: "#"+(Math.floor((Math.random()*16777216))).toString(16),
                description: "opis zasobu nr "+count
            };
            count += 1;
            resources.push(newResource);
            return newResource;
        };

        var validate = function(resource){
            var newResource = {
                id: maxId() + 1,
                name: resource.name,
                description: resource.description,
                color: resource.color
            };
            return newResource;
        };

        var create = function(resource){
            resource = validate(resource);
            resources.push(resource);
            return resource;
        };

        return {
            get: get,
            find: find,
            generate: generate,
            create: create
        };
    });

