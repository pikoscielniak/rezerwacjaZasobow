/*global angular,_,$,scheduler */

angular.module('project.services')
    .factory('dhxSchedulerConfig', ['resources', 'reservations', 'users', 'filterData', function(resources, reservations, users, filterData){
        "use strict";

        var firstInit=true;


        var loadReservations = function(){
            var reserv = reservations.where({user:filterData.getUser(), resource:filterData.getResource()});
            var data = _.map(reserv, function(reservation){
                return parseEvent(reservation);
            });
            return data;
        };

        var refreshDhxScheduler = function(){
            scheduler.clearAll();
            _.each(loadReservations(), function(reservation){
                scheduler.addEvent(reservation);
            });
        };

        var parseEvent = function(reservation){
            return {
                reservation_id: reservation.id,
                text: reservation.description,
                start_date: new Date(reservation.start),
                end_date: new Date(reservation.end),
                color: resources.find(reservation.resource_id).color,
                textColor: "red",
//                        unused properties
                title: reservation.title,
                user_id: reservation.user_id,
                user_name: reservation.user_name,
                resource_id: reservation.resource_id,
                resource_name: reservation.resource_name

            };
        };

        var parseReservation = function(event){
            return {
                id: event.reservation_id,
                description: event.text,
                start: new Date(event.start_date),
                end: new Date(event.end_date),
                title: event.title,
                user_id: event.user_id,
                user_name: event.user_name,
                resource_id: event.resource_id,
                resource_name: event.resource_name
            };
        };

        var init = function($scope, $rootScope){
            if(firstInit){
                firstInit = false;

                var saveEvent = function(id, event){
                    $scope.$apply(function(){
                        if(!event){
                            event = scheduler.getEvent(id);
                        }
                        var reservation = parseReservation(event);
                        reservation = reservations.save(reservation);
                        event.reservation_id = reservation.id;
                    });
                };

                var destroyEvent = function(id){
                    $scope.$apply(function(){
                        var event = scheduler.getEvent(id);
                        var reservation = reservations.find(event.reservation_id);
                        reservations.destroy(reservation);
                    });
                };

                scheduler.attachEvent("onBeforeEventDelete", function(id,e){
                    destroyEvent(id);
                    return true;
                });

                scheduler.attachEvent("onEventDeleted", function(id){
                    $rootScope.$broadcast('refresh');
                    return true;
                });

                scheduler.attachEvent("onEventChanged", function(id, e){
                    saveEvent(id);
                    $rootScope.$broadcast('refresh');
                    return true;
                });

                scheduler.attachEvent("onEventSave",function(id,event,isNewEvent){
                    if(isNewEvent){
                        saveEvent(id, event);
                    }

                    return true;
                });

                scheduler.attachEvent("onAfterLightbox",function(id,event,isNewEvent){
                    $rootScope.$broadcast('refresh');
                    return true;
                });

                scheduler.locale.labels.section_title = "Tytuł";
                scheduler.locale.labels.section_user = "Użytkownik";
                scheduler.locale.labels.section_resource = "Zasób";

                var usersOpt = _.map(users.get(), function(user){ return {key: user.id, label:user.name}; });
                var resourcesOpt = _.map(resources.get(), function(resource){ return {key: resource.id, label: resource.name}; });

                scheduler.config.lightbox.sections=[
                    { name:"title",    height:43, type:"textarea", map_to:"title"},
                    { name:"description", height:50, type:"textarea", map_to:"text", focus:true},
                    { name:"user", height:25, type:"select", map_to:"user_id", options: usersOpt},
                    { name:"resource", height:25, type:"select", map_to:"resource_id", options: resourcesOpt},
                    { name:"time",        height:72, type:"time",     map_to:"auto"}
                ];
            }

            scheduler.init('scheduler_here', new Date(),"month");
            refreshDhxScheduler();
        };


        return {
            init: init,
            refreshDhxScheduler : refreshDhxScheduler
        };
    }]);

