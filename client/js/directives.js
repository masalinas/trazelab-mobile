angular.module('app.directives', [])
    .directive('autoFocus', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',

            link: function ($scope, $element, $attributes) {
                if ($scope.$eval($attributes.autoFocus) !== false) {
                    var element = $element[0];

                    $timeout(function() {
                        $scope.$emit('focus', element);
                        element.focus();
                    });
                }
            }
        };
    }])
    .directive('onEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.onEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
