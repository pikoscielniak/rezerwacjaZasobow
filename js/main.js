function ResourcesCtrl($scope, $http) {
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
        ret = true;
        if($scope.resource)
            ret &= reservation.resource_id == $scope.resource.id;

        if($scope.user)
            ret &= reservation.user_id == $scope.user.id;

        return ret;
    }
}