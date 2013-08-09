/*global angular,_,$,scheduler */

angular.module('project.services')
    .factory('applicationConfig', ['resources', 'users', 'filterData', function(resources, users, filterData){
        "use strict";

        var defaultSelectorOptions = function(){
            return {
                dataTextField: "name",
                dataValueField: "id"
            };
        };

        var userSelectorOptions = function(){
            var options = defaultSelectorOptions();
            options.optionLabel = "Wszyscy użytkownicy";
            options.dataSource = users.get();

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