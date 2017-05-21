angular.module('fancy-select', ['ionic'])
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
    .directive('fancySelect', ['$rootScope', '$parse', '$timeout', 'genericModalService', function ($rootScope, $parse, $timeout, genericModalService) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            scope: {
                'items': '='
            },

            link: function(scope, element, attrs, ngModelCtrl) {
                element.addClass('fancy-select');

                // Validate directive attributes.
                if (!attrs.items) {
                    throw(new Error('items requires list over which to iterate.'));
                }
                if (!attrs.itemLabel ) {
                    throw(new Error('fancySelect requires a itemLabel expression.'));
                }

                var multiSelect 		= scope.$eval(attrs.multiSelect) || false,
                    closeOnSelection 	= scope.$eval(attrs.closeOnSelection) || multiSelect ? false : true,
                    headerText 			= attrs.headerText || (multiSelect ? 'Select items' : 'Select item'),
                    templateUrl 		= attrs.itemsTemplateUrl || 'lib/fancy-select/fancy-select-template.html',
                    groupBy				= attrs.groupBy || '',
                    groupLabelParser 	= attrs.groupLabel ? $parse(attrs.groupLabel) : false,
                    itemLabelParser 	= $parse(attrs.itemLabel),
                    modalScope;

                function select(){
                    var viewValue;
                    if(multiSelect){
                        viewValue = modalScope.selection.selectable.filter(function (item){return item.selected;});
                    }else{
                        viewValue = modalScope.selection.selected;
                    }
                    ngModelCtrl.$setViewValue(viewValue);
                    ngModelCtrl.$render();
                }

                function showItems(){
                    modalScope = $rootScope.$new();
                    modalScope.multiSelect = multiSelect;
                    modalScope.headerText = headerText;
                    modalScope.itemLabel = itemLabelParser;
                    modalScope.closeOnSelection = closeOnSelection;
                    modalScope.group = groupBy;
                    modalScope.groupLabel = groupLabelParser;
                    modalScope.select = select;
                    modalScope.selection = {
                        selectable: scope.items,
                        selected: scope.selected
                    };

                    if(multiSelect && typeof modalScope.selection.selected !== 'undefined' && Array.isArray(modalScope.selection.selected)){
                        modalScope.selection.selectable.forEach(function (item){
                            delete item.selected;
                        });
                        modalScope.selection.selected.forEach(function (item){
                            var itemIndex = modalScope.selection.selectable.indexOf(item);
                            if(itemIndex >= 0){
                                modalScope.selection.selectable[itemIndex].selected = true;
                            }
                        });
                    }

                    if(closeOnSelection){
                        var watchable = multiSelect ? 'selection.selectable' : 'selection.selected';
                        modalScope.$watch(watchable, function (nv, ov){
                            if(nv !== ov){
                                select();
                                $timeout(modalScope.closeModal, 0);
                            }
                        }, true);
                    }

                    genericModalService.show(templateUrl, modalScope, 'slide-in-right');
                }

                ngModelCtrl.$render = function() {
                    scope.selected = ngModelCtrl.$viewValue;
                };

                element.on('click', showItems);
            }
        };
    }]);
