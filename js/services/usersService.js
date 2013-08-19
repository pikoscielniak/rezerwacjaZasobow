/*global _,$,angular*/

angular.module('project.services')
    .factory('users',['$http', '$q', function($http, $q){
        "use strict";

        var users = [
            {"id": 3, "name": "Franek"},
            {"id": 1, "name": "Maciek"},
            {"id": 2, "name": "Wojtek"}
        ];

        var get = function(){
            var deferred = $q.defer();

            $http.get("http://localhost:3000/users").
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Error loading users.");
                });
            return deferred.promise;
        };

        var find = function (user_id) {
            var deferred = $q.defer();

            $http.get("http://localhost:3000/user/"+user_id).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("User not found.");
                });
            return deferred.promise;

            user_id = parseInt(user_id, 10);
            return _.find(users, function (user) {
                return user._id === user_id;
            });
        };

        return {
            get: get,
            find: find
        };
    }]);

