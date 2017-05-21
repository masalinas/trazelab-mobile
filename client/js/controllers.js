angular.module('app.controllers', ['lbServices'])
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

    .controller('stockCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', '$window', '$timeout', 'Stock',
        function ($scope, $state, $stateParams, $ionicPopup, $window, $timeout, Stock) {
            var vm = this;

            function getStocks() {
                Stock.find()
                    .$promise
                    .then(function(stocks, responseHeaders) {
                            if (stocks.length > 0)
                                vm.stocks = JSON.parse(angular.toJson(stocks));
                            else
                                vm.stocks = [];
                        },
                        function(httpResponse) {
                            var error = httpResponse.data.error;
                            console.log('Error querying stocks - ' + error.status + ": " + error.message);
                        });
            }

            // recover stock
            getStocks();

            vm.goHome = function() {
                $state.go('menu.home');
            };

            // scan label listener with focus
            vm.getLabel = function() {
                // show message toast
                var alertPopup = $ionicPopup.alert({
                    title: 'Label Code',
                    template: vm.label
                });

                alertPopup.then(function(res) {
                    // initialize edit box
                    vm.label = undefined;

                    // set focus
                    $timeout(function() {
                        var element = $window.document.getElementById('stock-input');

                        $scope.$emit('focus', element);
                        element.focus();
                    });
                });
            };

            // people collection for fancy select list
            vm.people = [{"fname":"Ghaffar","lname":"Peterman","group":"Good"},
                             {"fname":"Arturo","lname":"Sessa","group":"Good"},
                             {"fname":"Bilal","lname":"Cox","group":"Best"},
                             {"fname":"Serena","lname":"Bradley","group":"Best"},
                             {"fname":"Mario","lname":"Delaura","group":"Best"},
                             {"fname":"Bruce","lname":"Hackman","group":"Good"},
                             {"fname":"Hope","lname":"Barowsky","group":"Best"},
                             {"fname":"Lauris","lname":"Kaa","group":"Better"},
                             {"fname":"Bola","lname":"Obara","group":"Best"},
                             {"fname":"Jamie","lname":"Betts","group":"Good"},
                             {"fname":"Bartley","lname":"Cole","group":"Best"},
                             {"fname":"Wichaya","lname":"Mullins","group":"Good"},
                             {"fname":"Rich","lname":"Seymour","group":"Better"},
                             {"fname":"Denys","lname":"Gallant","group":"Good"},
                             {"fname":"Maurice","lname":"Barrientos","group":"Best"},
                             {"fname":"Jawdat","lname":"Ward","group":"Better"},
                             {"fname":"Sherrie","lname":"Whalley","group":"Better"},
                             {"fname":"Rob","lname":"Gould","group":"Better"},
                             {"fname":"Saowalak","lname":"Hadley","group":"Good"},
                             {"fname":"Marqueal","lname":"Wright","group":"Better"}];
        }])

    .controller('chatCtrl', ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams) {
            var vm = this;

            vm.goHome = function() {
                $state.go('menu.home');
            }
        }]);
