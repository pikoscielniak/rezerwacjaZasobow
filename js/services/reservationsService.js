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

            $http.post("http://localhost:3000/reservation/update", {reservation: reservation}).
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

            $http.post("http://localhost:3000/reservation/delete", {reservation: reservation}).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Cannot delete reservation.");
                });
            return deferred.promise;
        };

        var page = function(page) {
            var deferred = $q.defer();

            $http.get("http://localhost:3000/reservations", {params: {page: page}}).
                success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("Cannot delete reservation.");
                });
            return deferred.promise;
        };

        return {
            get: get,
            find: find,
            update: update,
            create: create,
            destroy: destroy,
            save: save,
            page: page
        };
    }]);