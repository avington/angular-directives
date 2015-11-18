(function(module){

'use strict';

    var loginController = function(authService){
        var vm = this;
        function init(){
            vm.domain = authService;

        };


        init();


    };

    module
        .controller('loginController', loginController)

})(angular.module('app'));