/**
 * Created by smoseley on 11/18/2015.
 */
(function (module) {

    'use strict';

    var directiveContainer = function ($compile) {

        var loadSchemaInfo = function(scope){
            if (!scope.cmcLabel){
                if (scope.cmcSchema.label){
                    scope.cmcLabel = scope.cmcSchema.label
                }
            }
            if (!scope.cmcControlType){
                if (scope.cmcSchema.controlType){
                    scope.controlType = scope.cmcSchema.controlType
                }
            }
            if (!scope.cmcName){
                if (scope.cmcSchema.controlName){
                    scope.cmcName = scope.cmcSchema.controlName
                }
            }
        };

        var loadValidationDirectives = function(scope, input, validations){
            validations.forEach(function(validation){
                input[0][validation] = true
                $compile(input[0])(scope)
            });
        } ;

        var addMessages = function(form, element, name, $compile, scope) {
            var messages = "<div class='help-block' ng-messages='" +
                form.$name + "." + name + ".$error" +
                "' ><div ng-messages-include='/src/auth/templates/errors.html'></div></div><div>";
            element.append($compile(messages)(scope));
        };

        var watcherFor = function(form, name){
            return function(){
                if (name && form[name]) {
                    console.log(name, form[name]);
                    return form[name].$invalid && form[name].$touched;
                }
            }
        };

        var updaterFor = function (element) {
            return function (hasError) {
                if (hasError) {
                    element.removeClass("has-success")
                        .addClass("has-error");
                } else {
                    element.addClass("has-success")
                        .removeClass("has-error");
                }
            };
        };


        var runLink = function(scope, elem, attr, formController){
            scope.form = formController; //get the form
            var input = elem.find('input');
            loadSchemaInfo(scope);
            loadValidationDirectives(scope, input, scope.cmcSchema.validations)
            addMessages(scope.form, elem, scope.cmcName, $compile, scope);
            scope.$watch(watcherFor(scope.form, scope.cmcName), updaterFor(elem))
        };

        return {
            restrict: 'E',
            templateUrl: '/src/controls/templates/textbox.directive.html',
            scope: {
                cmcModel: '=',
                cmcName: '@',
                cmcLabel: '@',
                cmcSchema: '=',
                cmcControlType: '@'

            },
            link: runLink,
            require: '^form'
        }
    };

    module
        .directive('cmcTextbox', directiveContainer);

})(angular.module('controls'));
