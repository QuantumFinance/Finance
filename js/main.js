var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "partials/myHome.html"
    })
    .when("/binomial", {
        templateUrl : "partials/binomial.html"
    })
    .when("/leastSquares", {
        templateUrl : "partials/leastSquares.html"
    })
    .when("/finiteDifference", {
        templateUrl : "partials/finiteDifference.html"
    })
    .otherwise({
        templateUrl : "partials/myHome.html"
    })
});
app.controller('binomialCtrl', function($scope,$http) {
    $scope.bmaster = {stock:4, strike:5, depth:2,rate:0.25,u:2,d:0.5};
    $scope.resetb = function() {
        $scope.buser = angular.copy($scope.bmaster);
        $scope.myValuesb = null
    };
    $scope.resetb();
    $scope.submitBinomial = function() {
        $scope.myValuesb='';
        $http({
            //url : "http://ec2-34-196-11-253.compute-1.amazonaws.com:8080/compute/binomial/?d=0.5&depth=2&rate=0.25&stock=4&strike=5&u=2.0",
            url: "http://ec2-34-196-11-253.compute-1.amazonaws.com:8000/compute/binomial/",
            //url: "http://127.0.0.1:8000/compute/binomial/",
            method: "GET",
            //params:$scope.user
            //params: {'stock':4,'strike':5,'depth':2,'rate':0.25,'u':2,'d':0.5}
            params: {'stock':$scope.buser.stock,'strike':$scope.buser.strike,'depth':$scope.buser.depth,'rate':$scope.buser.rate,'u':$scope.buser.u,'d':$scope.buser.d}
        })
        .then(function(response) {
            $scope.myValuesb = response.data.complex_result;
        })
        .catch(function(response){
            $scope.myValuesb = response.statusText;
        });
        console.log('Submit Binomial');  
        
    };
    console.log($scope.buser);
});
app.controller('leastSquareCtrl', function($scope,$http) {
    $scope.lmaster = {method:"normal", paths:8, length:4, stock:10, strike:12, rate:0.1, volatility:0.3};
    $scope.resetl = function() {
        $scope.luser = angular.copy($scope.lmaster);
        $scope.myValuesl = null
    };
    $scope.resetl();
    $scope.submitLeastSquare = function() {
        $scope.myValuesl='';
        $http({
            //url : "127.0.0.1:8000/compute/leastsquare/?method=neural&paths=8&length=4&stock=10&strike=12&rate=0.1&volatility=0.3",
            url: "http://ec2-34-196-11-253.compute-1.amazonaws.com:8000/compute/leastsquare/",
            //url: "http://127.0.0.1:8000/compute/leastsquare/",
            method: "GET",
            //params:$scope.user
            //params: {'stock':4,'strike':5,'depth':2,'rate':0.25,'u':2,'d':0.5}
            params: {'method':$scope.luser.method, 'paths':$scope.luser.paths, 'length':$scope.luser.length, 'stock':$scope.luser.stock,'strike':$scope.luser.strike,'rate':$scope.luser.rate,'volatility':$scope.luser.volatility}
        })
        .then(function(response) {
            $scope.myValuesl = response.data.complex_result;
        })
        .catch(function(response){
            $scope.myValuesl = response.statusText;
        });
        console.log('Submit Least');
    };
    console.log($scope.luser);
});
app.controller('finiteDifferenceCtrl', function($scope,$http) {
    $scope.fmaster = {stock:50, strike:50, time:5/12.0,rate:0.1,volatility:0.4,M:20,N:10,delS:5};
    $scope.resetf = function() {
        $scope.fuser = angular.copy($scope.fmaster);
        $scope.myValuesf = null
    };
    $scope.resetf();
    $scope.submitFiniteDifference = function() {
        $scope.myValuesf='';
        $http({
            //url : "http://www.hulkbuster.tech:8000/compute/finitedifference/?stock=50&strike=50&rate=0.1&volatility=0.4&time=0.41666&M=20&N=10&delS=5",
            url: "http://ec2-34-196-11-253.compute-1.amazonaws.com:8000/compute/finitedifference/",
            method: "GET",
            params: {'stock':$scope.fuser.stock,'strike':$scope.fuser.strike,'time':$scope.fuser.time,'rate':$scope.fuser.rate,'volatility':$scope.fuser.volatility,'M':$scope.fuser.M,'N':$scope.fuser.N,'delS':$scope.fuser.delS}
        })
        .then(function(response) {
            if (response.status==200)
            $scope.myValuesf = response.data.complex_result;
            else{
                $scope.myValuesf = response;
            }
        })
        .catch(function(response){
            $scope.myValuesf = response.statusText;
        });
        console.log('Submit FiniteDifference');
    };
    console.log($scope.fuser);
});