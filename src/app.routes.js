(function (module) {

    'use strict';

    var getStates = function () {
        var states = [
            {
                state: 'basic',
                config: {
                    abstract: true,
                    templateUrl: '/src/common/templates/main.html'
                }
            },
            {
                state: 'basic.landing',
                config: {
                    url: '/',
                    views: {
                        'nav@basic': {
                            templateUrl: '/src/common/templates/nav.html'
                        },
                        'body@basic': {
                            templateUrl: '/src/auth/templates/login.html',
                            controller: 'loginController as vm'
                        }
                    }
                }
            }
        ];
        return states;
    };

    var setRoutes = function($stateProvider, $urlRouterProvider){
        var states = getStates()
        states.forEach(function(state){
            $stateProvider.state(state.state, state.config);
        });
        $urlRouterProvider.otherwise('/');
    };

    module
        .config(setRoutes);

})(angular.module('app'));