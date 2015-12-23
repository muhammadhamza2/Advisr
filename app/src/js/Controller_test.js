/**
 * Created by hamza on 7/8/15.
 */
'use strict';

describe('LoginController',function(){
    var scope,$controllerContructor,mockEventData;

    beforeEach(module('EmpApp'));

    beforeEach(inject(function($controller,$rootScope){
        scope=$rootScope();
        mockEventData=sinon.stub({Login:function(){}});
        $controllerContructor=$controller;
    }));


    it('should verify username and password correctly',function(){

        var test_email="fsff";
        mockEventData.Login.returns(test_email);
        var ctrl=$controllerContructor("LoginController",{$cookies:{},$scope:scope,$state:{},DataService:{},$rootScope:{},eventData:mockEventData});
        expects(scope.LoginCookieStatus).toBe(test_email);
    })
})