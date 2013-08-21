/* global angular,_ */

angular.module('project.directives')
    .directive('listView', function () {
        "use strict";

        return {
            restrict: 'A',
            templateUrl: 'view/listView/template.html',

            scope: {
                listView: "=",
                infoTemplateUrl: "@",
                detailsTemplateUrl: "@",
                loadNext: '&',
                loadingBuffer: "@"
            },
            controller : ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude){
                var page = 0;
                var raw = $element[0].children[0];

                $scope.data = [];
                $scope.loading = false;
                $scope.end = false;

                $scope.showDetails = function(index){
                    $element.children().find(".list-item:eq("+index+")").children(".details").slideToggle();
                };

                var loadNextSuccess = function (response) {
                    if (response.length <= 0) {
                        $scope.loading = false;
                        $scope.end = true;
                    } else {
                        page += 1;

                        _.each(response, function (obj) {
                            $scope.data.push(obj);
                        });

                        $scope.loading = false;

                        if (raw.offsetHeight >= raw.scrollHeight) {
                            loadNextItem($scope.loadNext);
                        }

                    }
                };

                var loadNextFailure = function (again, error) {
                    again = again || 1;
                    setTimeout(function () {
                        $scope.loading = false;
                        loadNextItem($scope.loadNext, again * 2);
                    }, again * 1000);
                    console.error('Failed to load data: ' + error + '\nTrying again in ' + again + ' seconds.');
                };

                var loadNextItem = function (again) {
                    $scope.loading = true;
                    $scope.loadNext({page: page}).then(function (response) {
                        loadNextSuccess(response);
                    }, function (error) {
                        loadNextFailure(again, error);
                    });
                };

                var load = function(again){
                    if($scope.loading || $scope.end){
                        return;
                    } else {
                        loadNextItem(again);
                    }
                };

                var reload = function(){
                    $scope.data = [];
                    page = 0;
                    $scope.end = false;
                    $scope.loading = false;
                    load();
                };

                $scope.load = load;

                $scope.listView = $scope.listView || {};
                $scope.listView.loadNextPage = load;
                $scope.listView.reload = reload;


                load();

            }],
            link: function (scope, elem, attrs) {
                var raw = elem[0].children[0];
                var c = elem.children();

                c.bind('scroll', function() {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight - parseInt(attrs.loadingBuffer,10)) {
                        scope.$apply(scope.load());
                    }
                });
            }
        };
    });