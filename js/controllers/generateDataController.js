/*global _,$,angular */

angular.module('project.controllers')
    .controller('generateDataController', ['$scope', 'generateData',
        function ($scope, generateData) {
            "use strict";

            $scope.resourceNum = 0;
            $scope.userNum = 0;
            $scope.reservationNum = 0;

            $scope.addUsers = function(){
                if(confirm("Czy jesteś pewien że chcesz dodać "+$scope.userNum+" użytkowników?")){
                    generateData.users($scope.userNum);
                }
            };

            $scope.addResources = function(){
                if(confirm("Czy jesteś pewien że chcesz dodać "+$scope.resourceNum+" zasobów?")){
                    generateData.resources($scope.resourceNum);
                }
            };

            $scope.addReservations = function(){
                if(confirm("Czy jesteś pewien że chcesz dodać "+$scope.reservationNum+" rezerwacji?")){
                    generateData.reservations($scope.reservationNum);
                }
            };



        }]);