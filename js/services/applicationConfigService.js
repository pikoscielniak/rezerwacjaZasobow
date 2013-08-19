/*global angular,_,$,scheduler */

angular.module('project.services')
    .factory('applicationConfig', ['resources', 'users', 'filterData', function(resources, users, filterData){
        "use strict";

        var defaultSelectorOptions = function(){
            return {
                dataTextField: "name",
                dataValueField: "_id"
            };
        };

        var userSelectorOptions = function(){
            var options = defaultSelectorOptions();
            options.optionLabel = "Wszyscy użytkownicy";
            options.dataSource = {
                serverFiltering: true,
                transport: {
                    read: {
                        dataType: "json",
                        url: "http://localhost:3000/users",
//                        data: options.getData,
                        cache: false
                    }
                }
            };

            return options;
        };

        var resourceSelectorOptions = function(){
            var options = defaultSelectorOptions();
            options.optionLabel = "Wszystkie zasoby";
            options.dataSource = resources.get();

            return options;
        };


        return {
            userSelectorOptions: userSelectorOptions,
            resourceSelectorOptions: resourceSelectorOptions

        };
    }]);