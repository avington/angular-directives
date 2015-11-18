/**
 * Created by smoseley on 11/18/2015.
 */
(function(module){

'use strict';

    var login = function(){
        console.log(service.user);
    }


    var getUserSchema = function(){
        return {
            userName: {
                controlId: 'user-name',
                controlName: 'userName',
                label: 'User Name',
                placeholder: 'User Name',
                controlType: 'email',
                validations: [
                    'required',
                    'email'
                ]
            },
            password: {
                controlId: 'user-password',
                controlName: 'userPassword',
                label: 'Password',
                placeholder: 'Enter Password',
                controlType: 'password',
                validations: [
                    'required'
                ]
            }
        }
    }


    var service = {};
    service.user = {};
    service.userSchema = getUserSchema();
    service.login = login;


    var authService = function(){
        return service;
    };


    module
        .factory('authService', authService)

})(angular.module('auth'));
