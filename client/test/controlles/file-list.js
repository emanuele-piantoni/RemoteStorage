describe('fileList Controller', function(){

	beforeEach(module('remoteStorageApp'));

	it('exist', function(){
		inject(function($controller, $rootScope){
			expect(function(){
				$controller('fileListCtrl', 				{
					$scope: $rootScope.$new()
				});
			}).to.not.throw();
		});
	});

});