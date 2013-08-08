/*global angular,_,$,kendo */

angular.module('project.services')
    .factory('schedulerConfig', ['resources', 'reservations', 'filterData', function(resources, reservations, filterData){
        "use strict";

        var today = new Date(kendo.format('{0:MM-dd-yyyy}', new Date()));

        var parseDate = function (d) {
            return new Date(d);
        };

        var dataSourceSchema = function(){
            return {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number", validation: { required: true } },
                        title: { defaultValue: "No title", validation: { required: true } },
                        start: { type: "date", parse: parseDate, validation: { required: true }},
                        end: { type: "date", parse: parseDate, validation: { required: true }},
                        user_id: {type: "number", validation: { required: true }},
                        user_name: {type: "string", validation: { required: true }},
                        resource_id: {type: "number", validation: { required: true }},
                        resource_name: {type: "string", validation: { required: true }},
                        description: {type: "string", validation: { required: true }}
                    }
                }
            };
        };

        var generateSchedulerDataSource = function(){
            return new kendo.data.SchedulerDataSource({
                data: reservations.where({user: filterData.getUser(), resource: filterData.getResource()}),
                schema: dataSourceSchema()
            });
        };

        var views = function(){
            return [
                "day",
                "week",
                {type: "month", selected: true }
            ];
        };

        var getResources = function(){
            return [
                {
                    field: "resource_id",
                    dataTextField: "name",
                    dataValueField: "id",
                    dataSource: resources.get()
                }
            ];
        };

        var getTemplate = function () {
//            debugger;
//                var html = $compile($("#scheduler-editor").html())($scope);
//                $("#scheduler-editor").html("");
//                $("#scheduler-editor").find("option[value='"+($scope.resource && $scope.resource.id)+"']").attr("selected","selected");
//            var sel = $("#scheduler-editor").find("select[name='resource']");
//                console.log(sel);
//            sel.val($scope.resource && $scope.resource.id);
//                $("#scheduler-editor").find('select[name="resource"]').find('option[value="'+($scope.resource && $scope.resource.id)+'"]').attr("selected",true);

            return $("#scheduler-editor").html();
        };

        var getSchedulerOptions = function(saveReservation, removeReservation){
            return {
                allDaySlot: true,
                date: today,
                height: 500,
                editable: {
                    confirmation: "Czy jesteś pewien?",
                    template: getTemplate
                },
                eventTemplate: $("#event-template").html(),
                majorTick: 30,
                minorTickCount: 2,
                views: views(),
                timezone: "Etc/UTC",

                dataSource: generateSchedulerDataSource(),

                resources: getResources(resources),

                save: function (e) {
                    saveReservation(e.model);
                },
                remove: function (e) {
                    removeReservation(e.event);
                }
            };
        };

        return {
            getSchedulerOptions: getSchedulerOptions,
            generateSchedulerDataSource: generateSchedulerDataSource
        };
    }]);


