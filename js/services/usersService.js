/*global _,$,angular*/

angular.module('project.services')
    .factory('users', function(){
        "use strict";

        var users = [
            {"id": 3, "name": "Franek"},
            {"id": 1, "name": "Maciek"},
            {"id": 2, "name": "Wojtek"}
        ];

        var get = function(){
            return users;
        };

        var find = function (user_id) {
            return _.find(users, function (user) {
                return user.id === user_id;
            });
        };

        return {
            get: get,
            find: find
        };
    });

