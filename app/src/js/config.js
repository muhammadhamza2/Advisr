/**
 * Created by hamza on 7/8/15.
 */
routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/root/home');

    // .when('/c?id', '/contacts/:id')
    //.when('/user/:id', '/contacts/:id')

    $stateProvider

        .state('root', {
            url: '/root',
            templateUrl: 'src/Partials/root.html',
            controller:'NavController'

        })


        .state('home', {
            url: '/home',
            templateUrl: 'src/Partials/HomePartial.html',
            parent: 'root',
            controller:'HomeController'
        })
/*
        .state('LogOut', {
            url: '/LogIn',
            templateUrl: 'src/Partials/LoginPartial.html',
            parent: 'root',
            controller:'LoginController'
        })

        .state('AddEmp', {
            url: '/AddEmp',
            templateUrl: 'src/Partials/empAddPartial.html',
            controller:'routerAppController',
            parent: 'root'

        })*/


        .state('report', {
            url: '/report',
            templateUrl: 'src/Partials/report.html',
            parent: 'root'
           // controller:'LoginController'
        })


        .state('Category', {
            url: '/Cat',
            templateUrl: 'src/Partials/category.html',
            //controller:'routerAppController',
            parent: 'root'

        })
        .state('specificCategory', {
            url: '/specificCategory',
            templateUrl: 'src/Partials/specific.html',
            //controller:'routerAppController',
            parent: 'Category'

        })
        .state('gold', {
            url: '/g',
            templateUrl: 'src/Partials/g.html',
            //controller:'routerAppController',
            parent: 'root'
        })

        .state('specific', {
            url: '/specific',
            templateUrl: 'src/Partials/report.html',
            //controller:'routerAppController',
            parent: 'specificCategory'

        })



        .state('test', {
            url: '/test',
            templateUrl: 'src/Partials/partials/graphpartial.html',
            //controller:'routerAppController',
            parent: 'root'
        })

        .state('rick', {
            url: '/rick',
            templateUrl: 'src/Partials/partials/rckshaw_partial.html',
            //controller:'routerAppController',
            parent: 'root'

        })

/*

        .state('AddEmp.details', {
            url: '/details/:eID',
            templateUrl: 'src/Partials/detials.html',
                controller:'routerAppController',
            parent: 'root' // default was root

        });
*/
});