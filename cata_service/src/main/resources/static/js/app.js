

var app=angular.module('MyApp',['ui.router']);
app.config(function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('home',{
		url:'/home',
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	});
	$stateProvider.state('newProduit',{
		url:'/newProduit',
		templateUrl: 'views/newProduct.html',
		controller: 'NewProduitController'
	});
	
	$stateProvider.state('chercher',{
		url:'/chercher',
		templateUrl: 'views/chercher.html',
		controller: 'MyController'
	});
	
	
	$stateProvider.state('delete',{
		url:'/delete',
		templateUrl: 'views/delete.html',
		controller: 'DeleteController'
	});
	
	
});  



app.controller('HomeController', function() {
	
});


app.controller('DeleteController', function($scope,$http) {
	
	$scope.idSupprime=null;
	$scope.messageSuppresion="";
	$scope.modeSupp=0;
	
	$scope.btnSupprime=function(){
		$http.delete("http://localhost:8080/produits/" +$scope.idSupprime)
		.then(function(response) {
			$scope.modeSupp=1;
			$scope.messageSuppresion="suppression de produit numéro "+$scope.idSupprime;
		}
		, function(response) {
			console.log(response.data);
		})
	};
	
	
});



app.controller('NewProduitController', function($scope,$http) {
	$scope.modeForm=function()
	{
		$scope.produit={};
		$scope.mode=0;
	};
	
	$scope.produit={};
	$scope.mode=0;
	$scope.saveProduit=function(){
		$http.post('http://localhost:8080/produits',$scope.produit)
		.then(function(response) {
			$scope.produit=response.data;
			$scope.mode=1;
		}
		,function(response){
			console.log(response.data);
		});
		
	};
	
});


app.controller("MyController",function($scope,$http)
  {
	$scope.pageProduits=null;
	$scope.motCle="";
	$scope.pageCourante=0;
	$scope.size=4;
	$scope.pages=[];
	$scope.chercherProduits=function(){
		$http.get("http://localhost:8080/chercherProduits?mc="
				+$scope.motCle+"&page="+$scope.pageCourante+"&size="+$scope.size)
		.then(function(response) {
			$scope.pageProduits=response.data;
			$scope.pages=new Array(response.data.totalPages);
		}
		,function(response){
			console.log(response.data);
		});
	};
	$scope.getProduits=function(){
		$scope.pageCourante=0;
		$scope.chercherProduits();
	}
	$scope.goToPage=function(p){
		$scope.pageCourante=p;
		$scope.chercherProduits();
	}
});