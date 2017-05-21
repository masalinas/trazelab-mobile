angular.module('app.controllers', [])
    .controller('loginCtrl', ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = this;

            vm.login = function() {
                $state.go('menu.home');
            };
        }])

    .controller('menuCtrl', ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = this;
        }])

    .controller('homeCtrl', ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = this;
        }])

    .controller('stockCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', '$window', '$timeout',
        function ($scope, $state, $stateParams, $ionicPopup, $window, $timeout) {
            var vm = this;

            vm.goHome = function() {
                $state.go('menu.home');
            };

            vm.getLabel = function() {
                var alertPopup = $ionicPopup.alert({
                    title: 'Label Code',
                    template: vm.label
                });

                alertPopup.then(function(res) {
                    // initialize edit box
                    vm.label = undefined;

                    // set edit box focus
                    $timeout(function() {
                        var element = $window.document.getElementById('stock-input');

                        $scope.$emit('focus', element);
                        element.focus();
                    });
                });
            };

            vm.products = ['Banana', 'Orange', 'Apple'];
        }])

    .controller('chatCtrl', ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = this;

            vm.goHome = function() {
                $state.go('menu.home');
            }
        }]);
