angular.module('app.services', [])
    .factory('genericModalService', ['$rootScope', '$q', '$ionicModal', function($rootScope, $q, $ionicModal){
        function show(templateUrl, scope, animation){
            var deferred = $q.defer();
            var modalScope = typeof scope !== 'undefined' ? scope : $rootScope.$new();

            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: modalScope,
                animation: animation || 'slide-in-up'
            }).then(function(modal) {
                modalScope.modal = modal;

                modalScope.openModal = function(){
                    modalScope.modal.show();
                };

                modalScope.closeModal = function(){
                    modalScope.modal.hide();
                };

                modalScope.$on('modal.hidden', function (thisModal){
                    thisModal.currentScope.$destroy();
                    thisModal.currentScope.modal.remove();
                });

                modalScope.modal.show();

                deferred.resolve(modalScope);
            });

            return deferred.promise;
        }

        return {
            show: show
        };
    }])

    .factory('BlankFactory', [function(){

    }])

    .service('BlankService', [function(){

    }]);
