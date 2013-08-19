/*global _,$,angular*/

angular.module('project.services')
    .factory('users',['$http', '$q', function($http, $q){
        "use strict";

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

        var find = function (_id) {
            var deferred = $q.defer();

            $http.get("http://localhost:3000/user/"+_id).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("User not found.");
                });
            return deferred.promise;
        };

        return {
            get: get,
            find: find
        };
    }]);

