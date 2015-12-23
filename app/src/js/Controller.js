routerApp.controller('NavController',['$cookies','$scope','$state','DataService','$rootScope' ,function($cookies,$scope,$state,DataService,$rootScope){
         var selfDataService = DataService;


       // $rootScope.NavCookieStatus=selfDataService.data.user;

       // alert("nav"+selfDataService.user);
       
       if (angular.isUndefined($cookies.get('username')))
            {
                $rootScope.NavCookieStatus=-1;
                selfDataService.user=-1; // alert( $scope.CookieStatus);
                console.log($rootScope.NavCookieStatus);
            }
        else 
            {//$scope.CookieStatus.status=$cookies.get('username') ;//alert( $scope.CookieStatus);
                selfDataService.user=$cookies.get('username') ;
                $rootScope.NavCookieStatus=$cookies.get('username') ;
                console.log($rootScope.NavCookieStatus);
            }
            $rootScope.NavCookieStatus=selfDataService.user;

        $scope.LogoutFunc =function(){
           // alert("logging out");
            $cookies.remove('username');
             $cookies.remove('page');
            selfDataService.user=-1;
           $rootScope.NavCookieStatus=-1;
            $state.go('LogOut');
           // $location.path("root/LogIn");

        }
             
}]);


routerApp.controller('HomeController',['$scope','DataService' ,function($scope,DataService){

        var selfDataService = DataService;
        $scope.HomeCookieStatus= selfDataService.user;
        console.log($scope.HomeCookieStatus);
       // console.log(DataService.user+"home service status"+$scope.HomeCookieStatus);
      

}]);



routerApp.controller('LoginController',['$cookies','$scope','$state','DataService','$rootScope',function($cookies,$scope,$state,DataService,$rootScope){

    var selfDataService = DataService;
    $scope.LoginCookieStatus= selfDataService.user;
    //console.log("Login Controlelr Calleds"+$scope.LoginCookieStatus);

    $scope.Login =function(){
        $scope.LoginOutput="";
        if ($scope.uemail ==undefined ||$scope.upassword ==undefined ||$scope.uemail =="" ||$scope.upassword ==""){$scope.LoginOutput="insert User! or Password ";}
        else{
        selfDataService.login($scope.uemail,$scope.upassword).then(function(data) {

            if  (data.length<1){
                $scope.LoginOutput="Invalid User! or Password ";
                selfDataService.user=-1;
                $scope.LoginCookieStatus=selfDataService.user;
                $rootScope.NavCookieStatus = selfDataService.user;


            }
            else     {
              $scope.list = data;
      //          console.log( $scope.list +"USERLOGGERD IS "+ $scope.list["email"]);
              $cookies.put('username', $scope.list[0]["email"]);
                $cookies.put('token', $scope.list[0]["token"]);
              selfDataService.user=$scope.list[0]["email"];
              $scope.LoginCookieStatus=$scope.list[0]["email"];
              $rootScope.NavCookieStatus = $scope.list[0]["email"];
              $state.go('home');
          }


        });}
    }



/*

    selfDataService.getResponse().then(function(data) {
        $scope.list = data;
    });
        $scope.Login =function(){
            $scope.LoginOutput="";

            for (i = 0; i < $scope.list.length; i++) {  
                if ( $scope.list[i]["email"]==$scope.uemail&& $scope.list[i]["pass"]==$scope.upassword) {
                    $cookies.put('username',$scope.list[i]["email"]);
                    // alert($scope.uemail+"-"+$scope.upassword+"-cooooookie"+$cookies.get('username')); 
                    selfDataService.user=$scope.list[i]["email"];
                    DataService.user=$scope.list[i]["email"];
                    $scope.LoginCookieStatus=$scope.list[i]["email"];
                   // alert("login alert"+selfDataService.user);
                    $rootScope.NavCookieStatus = $scope.list[i]["email"];
                 //    console.log(DataService.user+"Login Controlelr Calleds"+$scope.LoginCookieStatus);
                    //alert("CookieStatus"+$scope.CookieStatus);
                    $state.go('home');
                
                    
                    return selfDataService.user;
                
                }// end fo if
             
 
            };// end for loop

            $scope.LoginOutput="Invalid User! or Password ";
            selfDataService.user=-1;
            $scope.LoginCookieStatus=selfDataService.user;
           // $state.go('home');
            
                
                       
        } // end function*/




}]);


routerApp.controller('routerAppController',['$cookies','$scope','$state','DataService' ,function($cookies,$scope,$state,DataService){
        //var that = this;
        //that.list = [];


        var selfDataService = DataService;

    selfDataService.getResponse($cookies.get('token')).then(function(data) {
        $scope.list = data;
    });
        $scope.empAddCookieStatus={status:selfDataService.user};
        $scope.list=selfDataService.data.list;
        $scope.whichemp=$state.params.eID;
        $scope.Limits={setLimit:6,start:0};
        $scope.setLimit = function(index) {
        $scope.Limits.start=index*$scope.Limits.setLimit;
        
        }


        if (angular.isUndefined($cookies.get('page')))
            { 
            }
        else{
            $scope.setLimit(Math.floor($cookies.get('page')));
         //   alert($cookies.get('page'));
        }


        $scope.addtodo=function(){
        $scope.list.push({email :$scope.nameText,done:0,pass:$scope.nameText+'0000pass'});
            console.log($scope.list);
            selfDataService.addData($scope.nameText,$scope.nameText+'0000pass',$scope.nameText+'task',$cookies.get('token'));

    };


    $scope.addtodo2=function(a,b,c){
        $scope.list.push({email :a,done:0,pass:b,task:c});
        console.log("Mohib ko batao");
        console.log($scope.list[$scope.list.length-1]);
        selfDataService.addData(c,b,a,$cookies.get('token'));

    };
        $scope.sum=0;

        $scope.count=function(index,check){
            $scope.list[index]["done"]=check;
            $scope.sum=0;
            for (i = 0; i < $scope.list.length; i++) {
             $scope.sum= $scope.sum + $scope.list[i]["done"];
             };
        };

        

        $scope.setDelete = function(index) {
        $scope.count(index,0);
            var obj= $scope.list[index];
            console.log("deleting   "+obj.task,obj.done,obj.pass,obj.email);
            selfDataService.delData(obj.task,obj.done,obj.pass,obj.email,$cookies.get('token'));

        $scope.list.splice(index, 1);
        
        }

         $scope.setView = function(index) {
        var abc={eID :index};
        $state.go('AddEmp.details',abc);

        }
        $scope.setBack = function(index) {
            var abc=index/$scope.Limits.setLimit;
             //alert(abc);
          //  $scope.setLimit(abc);
            $cookies.put('page',abc);
            $state.go('AddEmp');
        }

        
      
 //data-ng-href="AddEmp/details/{{$index+Limits.start}}" 

}]);

//http://plnkr.co/edit/S2vdNVFOT6BkFSEJuLQK?p=preview
//http://stackoverflow.com/questions/27534822/how-to-sharing-and-update-data-between-controller-with-service-in-angularjs
 //https://github.com/10pearls-nabeelkhan/angularjs-boilerplate-tp
 //novice to ninja angular js





 routerApp.controller('ModalInstanceCtrl',['$scope', '$modalInstance', 'items', 'DataService','$cookies',function ($scope, $modalInstance, items,DataService,$cookies) {
     var selfDataService = DataService;
  $scope.items = items;
//$scope.list=DataService.data.list;
    /* selfDataService.getResponse($cookies.get('token')).then(function(data) {
         $scope.list = data;
     });*/
  $scope.selected = {

    item: $scope.items[0]
  /*  email:$scope.Email,
    pass:$scope.Password,
    desig:$scope.Designation
*/
  };

  $scope.ok = function () {

    $scope.RData={a:$scope.Email,b:$scope.Password,c:$scope.Designation,d:$scope.list}
   
    $modalInstance.close($scope.RData);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);



 routerApp.controller('ModalDemoCtrl',['$scope', '$modal', '$log', 'DataService', function ($scope, $modal, $log,DataService) {
  $scope.items = ['item1', 'item2', 'item3'];
     var selfDataService = DataService;


  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'src/Partials/myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    //    $scope.selected.d = {};
    $scope.addtodo2($scope.selected.a,$scope.selected.b,$scope.selected.c);
   /* $log.info("I am here "+$scope.selected.c+" "+$scope.selected.b+" "+$scope.selected.a+" "+$scope.selected.d);
    //$log.info($scope.selected);
        $scope.selected.d.push({email :$scope.selected.a,pass:$scope.selected.b,task:$scope.selected.c});
       // alert('aa');
       selfDataService.addData($scope.selected.c,$scope.selected.b,$scope.selected.a);
*/
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);






