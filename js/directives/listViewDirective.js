/* global angular */

angular.module('project.directives')
    .directive('listView', function () {
        "use strict";

        return {
            restrict: 'A',
            templateUrl: 'view/listView/template.html',

            scope: {
                data: "=",
                infoTemplateUrl: "@",
                detailsTemplateUrl: "@",
                loadNext: '&',
                loadingBuffer: "@"
            },
            controller : ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude){

                $scope.loading = false;

                $scope.showDetails = function(index){
                    $element.children().find(".list-item:eq("+index+")").children(".details").slideToggle();
                };

                $scope.loadNextItem = function(loadNext, again){
                    if($scope.loading){
                        return;
                    } else {
                        $scope.loading = true;
                        var promise = loadNext();
                        promise.then(function(obj) {
//                            $scope.data.push(obj);
                            $scope.loading = false;
                        }, function(error) {
                            again = again || 1;
                            setTimeout(function(){
                                $scope.loading = false;
                                $scope.loadNextItem(loadNext, again*2);
                            }, again*1000);
                            console.error('Failed to load data: ' + error + '\nTrying again in ' + again + ' seconds.');
                        });
                    }
                };
            }],
            link: function (scope, elem, attrs) {
                var raw = elem[0].children[0];
                var c = elem.children();

                c.bind('scroll', function() {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight - parseInt(attrs.loadingBuffer,10)) {
                        scope.$apply(scope.loadNextItem(scope.loadNext));
                    }
                });
            }
        };
    });