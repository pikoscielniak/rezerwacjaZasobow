/*global _,$,angular*/

angular.module('project.services')
    .factory('resources', ['$q', '$http', function($q, $http){
        "use strict";


        var get = function(){
            var deferred = $q.defer();

            $http.get("http://localhost:3000/resources").
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Error loading resources.");
                });
            return deferred.promise;
        };

        var find = function (_id) {
            var deferred = $q.defer();

            $http.get("http://localhost:3000/resource/"+_id).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Resource not found.");
                });
            return deferred.promise;
        };

        var create = function(resource){
            var deferred = $q.defer();

            $http.post("http://localhost:3000/resource/new", {resource: resource}).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("User not found.");
                });
            return deferred.promise;
        };

        return {
            get: get,
            find: find,
            create: create
        };
    }]);

