/*global kendo*/
angular.module('project', ['kendo.directives']).
    config(function($routeProvider){
        $routeProvider.
            when("/", {controller:ReservationsCtrl, templateUrl:"view/reservationList.html"}).
            otherwise({redirectTo:"/"});

    });

function ReservationsCtrl($scope, $http) {
    $http.get('app/users/users.json').success(function(data) {
        $scope.users = data;
    });

    $http.get('app/resources/resources.json').success(function(data) {
        $scope.resources = data;
    });

    $http.get('app/reservations/reservations.json').success(function(data) {
        $scope.reservations = data;
    });

    $scope.reservationSelector = function(reservation){
        var ret = true;
        if($scope.resource){
            ret &= reservation.resource_id == $scope.resource.id;
        }

        if($scope.user){
            ret &= reservation.user_id == $scope.user.id;
        }

        return ret;
    }

    $scope.addReservation = function() {
        if(!$scope.user){
            alert("Musisz wybrać użytkownika.");
        }
        else if(!$scope.resource){
            alert("Musisz wybrać zasób.");
        }
        else{
            $scope.reservations.push({user_id:$scope.user.id, resource_id:$scope.resource.id, startTime: $scope.startTime, endTime:$scope.endTime});
        }
    }

    var today = new Date(kendo.format('{0:MM-dd-yyyy}', new Date()));

    var dataPickerOptions = {
        culture: "pl-PL",
        value: today,
        start: "month",
        depth: "year",
        interval: 15,
        timeFormat: "HH:mm",
        format: "dd/MM/yyyy HH:mm"
    }

    $scope.endDataPickerOptions = dataPickerOptions;

    $scope.startDataPickerOptions = dataPickerOptions;


}