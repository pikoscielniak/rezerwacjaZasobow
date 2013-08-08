/*global angular*/

angular.module('project.services')
    .factory('filterData', function(){
        "use strict";

        var user;
        var resource;

        var setUser = function(u){
            user = u;
        };

        var getUser = function(){
            return user;
        };

        var setResource = function(r){
            resource = r;
        };

        var getResource = function(){
            return resource;
        };

        return {
            setResource: setResource,
            getResource: getResource,
            setUser: setUser,
            getUser: getUser
        };
    });