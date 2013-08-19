/*global angular,_,$,scheduler */

angular.module('project.services')
    .factory('applicationConfig', ['resources', 'users', 'filterData', function(resources, users, filterData){
        "use strict";

        var selectorOptions = function(optionLabel, url){
            return {
                dataTextField: "name",
                dataValueField: "_id",
                optionLabel: optionLabel,
                dataSource: {
                    transport: {
                        read: {
                            dataType: "json",
                            url: url,
                            cache: false
                        }
                    }
                }
            };
        };

        var userSelectorOptions = selectorOptions("Wszyscy użytkownicy", "http://localhost:3000/users");
        var resourceSelectorOptions = selectorOptions("Wszystkie zasoby", "http://localhost:3000/resources");

        return {
            userSelectorOptions: userSelectorOptions,
            resourceSelectorOptions: resourceSelectorOptions

        };
    }]);