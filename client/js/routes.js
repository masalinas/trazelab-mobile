angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl as vm'
        })

        .state('menu.home', {
            url: '/home',
            views: {
                'side-menu': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeCtrl as vm'
                }
            }
        })

        .state('menu.stock', {
            url: '/stock',
            views: {
                'side-menu': {
                    templateUrl: 'templates/stock.html',
                    controller: 'stockCtrl as vm'
                }
            }
        })

        .state('menu.chat', {
            url: '/chat',
            views: {
                'side-menu': {
                    templateUrl: 'templates/chat.html',
                    controller: 'chatCtrl as vm'
                }
            }
        })

        .state('menu', {
            url: '/side-menu',
            templateUrl: 'templates/menu.html',
            controller: 'menuCtrl as vm'
        });

    $urlRouterProvider.otherwise('/login');
});
