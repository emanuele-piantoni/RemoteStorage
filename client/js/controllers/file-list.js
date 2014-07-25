//angular.module('remoteStorageApp')
	//.controller('fileListCtrl', ['$scope', function($scope){
window.remoteStorage
	.controller('fileListCtrl', function($scope, File){

	$scope.$on('signed-in', function(){
		$scope.fileList = File.query(); //funzione asincrona, quando sono in test diventa sincrona perche il server e un mock
	});
});