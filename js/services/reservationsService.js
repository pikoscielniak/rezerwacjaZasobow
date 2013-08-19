/*global _,$,angular*/

angular.module('project.services')
    .factory('reservations', ['resources', 'users', '$http', '$q', function(resources, users, $http, $q){
        "use strict";

        var get = function(){
            var deferred = $q.defer();

            $http.get("http://localhost:3000/reservations").
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Error loading reservations.");
                });
            return deferred.promise;
        };

        var find = function (_id) {
            var deferred = $q.defer();

            $http.get("http://localhost:3000/reservation/"+_id).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Reservation not found.");
                });
            return deferred.promise;
        };

        var create = function(reservation){
            var deferred = $q.defer();

            $http.post("http://localhost:3000/reservation/new", {reservation: reservation}).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Cannot create reservation.");
                });
            return deferred.promise;
        };

        var update = function (reservation) {
            var deferred = $q.defer();

            $http.post("http://localhost:3000/resource/update", {reservation: reservation}).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Reservation not found.");
                });
            return deferred.promise;
        };

        var save = function (reservation) {
            return create(newReservation);
        };

        var destroy = function (reservation) {
            var deferred = $q.defer();

            $http.post("http://localhost:3000/resource/delete", {reservation: reservation}).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Cannon delete user.");
                });
            return deferred.promise;
        };

//        var where = function(properties){
//            if(properties.user || properties.resource){
//                var opt = {};
//                if(properties.user){
//                    opt.user_id = properties.user.id;
//                }
//
//                if(properties.resource){
//                    opt.resource_id = properties.resource.id;
//                }
//
//                return _.where(reservations, opt);
//            } else {
//                return reservations;
//            }
//        };

        return {
            get: get,
            find: find,
            update: update,
            create: create,
            destroy: destroy,
            save: save
//            where: where
        };
    }]);