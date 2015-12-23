/*routerApp.factory('name', ['', function(){
 return function name(){

 };
 }])
 */
routerApp.factory( 'DataService', function($http, $q, $log){

    var obj = {};
    obj.data = "abcd";
    obj.getResponse = function(token){
        var temp = {};
        var defer = $q.defer();
        $http.get('http://localhost:3000/Profile/?token='+token).success(function(data){
            $log.info(data);
            temp =data;
            defer.resolve(data);

        })
            .error(function(){  alert("error");});
        return defer.promise;
    };



    obj.addData = function(a,b,c,token){
       // var sometoken='abc';
        console.log({task:a,done:0,pass:b,email:c});
        var defer = $q.defer();
        $http({
            url: 'http://localhost:3000/Profile',
          //  url: 'http://localhost:3000/Profile/?done='+0+'&pass='+b+'&email='+c+'&task='+a+'&token='+token,
            method: "POST",
            params: {task:a,done:0,pass:b,email:c,token:token}
           // tokenheader:{token:sometoken}

        })
            .error(function(){  alert("error");});
        return defer.promise;
    };





    obj.login = function(uemail,upass){
        //http://localhost:3000/Profile?email=uemail&
        var temp = {};
        var defer = $q.defer();
       // $http.get('http://localhost:3000/Profile/',{email:uemail,pass:upass})
         $http({
            url: 'http://localhost:3000/Profile/',
            method: "GET",
            withCredentials:true,
            params: {email:uemail,pass:upass}
        })
           /*  .then(function(data){
                 console.log('logging via dataservice');
                 console.log(data);
                 temp =data;
                 defer.resolve(data.data); // data.data when using then

             })*/

          .success(function(data){
            $log.info(data);
            temp =data;
            defer.resolve(data);

        })
            .error(function(){  alert("error");});


        return defer.promise;
    };


    obj.delData = function(a,b,c,d,token){
       // var temp = {task:c,done:0,pass:b,email:a};
       // var sometoken='abc';
        var defer = $q.defer();
        console.log('deleting');
        console.log({task:a,done:b,pass:c,email:d});
        $http({
            url: 'http://localhost:3000/Profile/?token='+token,
            method: "DELETE",
            params: {task:a,done:b,pass:c,email:d},
         //   tokenheader:{token:sometoken}
        })
            .success(function(data){
            console.log(data);
        })
            .error(function(){ console.log('not deleted');});
        return defer.promise;
    };

   // $http.delete('http://localhost:3000/Profile/',{prams:{task:a,done:b,pass:c,email:d})
   // $http.delete(' http://localhost:3000/Profile/?task='+a+'&pass='+c+'&email='+d+'&done='+b)
   obj.user=-1;
    return obj;

/*
    delete $http.defaults.headers.common['X-Requested-With'         ];
    var getData = function(callbackFunc) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/Profile'
        }).success(function(dataa){
            // With the data succesfully returned, call our callback
            console.log(dataa);
            var data ={ data :{ list :dataa},user:-1};

            callbackFunc(data);
        }).error(function(){

        });
    }
    var data=getData();

    return data;
*/

});


