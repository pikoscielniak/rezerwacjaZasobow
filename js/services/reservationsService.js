/*global _,$,angular*/

angular.module('project.services')
    .factory('reservations', ['resources', 'users', function(resources, users){
        "use strict";

        var reservations = [
            {"id": 6, "user_id": 3, "user_name": "Franek", "resource_id": 3, "resource_name": "drukarka", "start": "2013-08-01T15:00:00.000Z", "end": "2013-08-01T18:00:00.000Z", "title": "asd", "description": ""},
            {"id": 1, "user_id": 1, "user_name": "Maciek", "resource_id": 3, "resource_name": "drukarka", "start": "2013-08-01T18:00:00.000Z", "end": "2013-08-02T18:00:00.000Z", "title": "dddd", "description": ""},
            {"id": 2, "user_id": 2, "user_name": "Wojtek", "resource_id": 1, "resource_name": "samochód", "start": "2013-08-02T08:00:00.000Z", "end": "2013-08-02T16:00:00.000Z", "title": "dwa", "description": ""},
            {"id": 3, "user_id": 2, "user_name": "Wojtek", "resource_id": 1, "resource_name": "samochód", "start": "2013-08-03T08:00:00.000Z", "end": "2013-08-07T08:00:00.000Z", "title": "2 1", "description": ""},
            {"id": 4, "user_id": 3, "user_name": "Franek", "resource_id": 2, "resource_name": "projektor", "start": "2013-08-01T15:00:00.000Z", "end": "2013-08-01T18:00:00.000Z", "title": "0 2", "description": ""},
            {"id": 5, "user_id": 1, "user_name": "Maciek", "resource_id": 2, "resource_name": "projektor", "start": "2013-08-15T14:45:00.000Z", "end": "2013-08-15T15:45:00.000Z", "title": "1 2", "description": ""}
        ];

        var get = function(){
            return reservations;
        };

        var find = function (id) {
            var res = _.find(reservations, function (reservation) {
                return reservation.id === id;
            });
            return res || false;
        };

        var update = function (reservation) {
            var res = find(reservation.id);
            var i = _.indexOf(reservations, res);
            reservations[i] = reservation;
            return true;
        };

        var maxId = function () {
            return _.max(reservations,function (res) {
                return res.id;
            }).id;
        };

        var create = function (reservation) {
            reservation.id = maxId() + 1;
            reservations.push(reservation);
            return reservation;
        };

        var validate = function(reservation){
            var newReservation = {
                id: reservation.id,
                user_id: reservation.user_id,
                resource_id: reservation.resource_id,
                start: reservation.start,
                end: reservation.end,
                title: reservation.title,
                description: reservation.description
            };

            var user = users.find(reservation.user_id);
            var resource = resources.find(reservation.resource_id);

            if(user && resource){
                newReservation.user_name = user.name;
                newReservation.resource_name = resource.name;
                return newReservation;
            } else {
                return false;
            }
        };

        var save = function (reservation) {
            var newReservation = validate(reservation);

            if(!newReservation){
                return false;
            }

            if (find(newReservation.id)) {
                return update(newReservation);
            } else {
                return create(newReservation);
            }
        };

        var destroy = function (reservation) {
            reservations = $.grep(reservations, function (value) {
                if (value.id !== reservation.id) {
                    return value;
                }
            });
            return reservation;
        };

        return {
            get: get,
            find: find,
            update: update,
            create: create,
            destroy: destroy,
            save: save
        };
    }]);