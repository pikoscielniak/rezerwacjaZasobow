/* global describe,it,expect,beforeEach,module,inject,spyOn */

"use strict";

var emptyFunc = function(){};

describe('Karma', function() {
    it('should start execution when all files loaded and pass config', function() {
        expect(true).toEqual(true);
    });
});

describe("Calendar", function(){
    beforeEach(module('project.controllers'));

    var scope = {};
    var ctrl = {};
    var timeout;

    beforeEach(inject(function($rootScope, $controller, $timeout) {
        scope = $rootScope.$new();
        scope.scheduler = {
            dataSource: {
                filter: emptyFunc
            }
        };
        timeout = $timeout;
        ctrl = $controller("kendoSchedulerController", {
            $scope: scope,
            reservations: {
                save: emptyFunc,
                edit: emptyFunc
            },
            schedulerConfig: {
                selectorOptions: emptyFunc,
                getSchedulerOptions: emptyFunc
            },
            $rootScope: $rootScope,
            filterData: {
                getUser: emptyFunc,
                getResource: emptyFunc
            },
            $timeout: timeout
        });
    }));

    describe("filter", function(){
        beforeEach(function(){
            spyOn(scope.scheduler.dataSource, "filter");
        });

        it("change should call filterScheduler()", function(){

            scope.filter = "asdaa";
            scope.$digest();
            timeout.flush();

            expect(scope.scheduler.dataSource.filter).toHaveBeenCalled();
        });

        it("two instant changes should call filterScheduler() once", function(){

            scope.filter = "asdaa";
            scope.$digest();
            scope.filter = "bbb";
            scope.$digest();

            timeout.flush();


            expect(scope.scheduler.dataSource.filter.callCount).toEqual(1);
        });

        it("two words should add two filters", function(){


            scope.filter = "asdaa bb";
            scope.$digest();
            timeout.flush();

            expect(scope.scheduler.dataSource.filter).toHaveBeenCalledWith({
                logic: "and",
                filters: [{
                    logic: "or",
                    filters: [
                        {field: "fullUser.name", operator: "contains", value: "asdaa"},
                        {field: "fullResource.name", operator: "contains", value: "asdaa"},
                        {field: "fullResource.description", operator: "contains", value: "asdaa"},
                        {field: "description", operator: "contains", value: "asdaa"},
                        {field: "title", operator: "contains", value: "asdaa"}
                    ]
                },
                {
                    logic: "or",
                    filters: [
                        {field: "fullUser.name", operator: "contains", value: "bb"},
                        {field: "fullResource.name", operator: "contains", value: "bb"},
                        {field: "fullResource.description", operator: "contains", value: "bb"},
                        {field: "description", operator: "contains", value: "bb"},
                        {field: "title", operator: "contains", value: "bb"}
                    ]
                }]
            });
        });

//        it("filter user if user set", function(){
//
//            scope.filter = "asdaa bb";
//            scope.$digest();
//
//            expect(scope.scheduler.dataSource.filter.mostRecentCall.args.filter.length).toEqual(2);
//        });
    });
});