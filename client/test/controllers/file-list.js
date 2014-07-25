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

	describe('file list retrieval', function(){
		var scope, controller, $httpBackend;

		beforeEach(function(){
			inject(function($controller, $rootScope, $injector){
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend
					.when('GET', 'http://localhost:3000/api/files') //setup mock (verbo, url)
					.respond([
						{
							name: 'la-gioconda.pdf'
						}
					]); //oggetto di ritorno JSON

				scope = $rootScope.$new();
				controller = $controller('fileListCtrl', { $scope: scope });
			});
		});

		xit('loads the file list on user sign-in', function(){
			scope.$emit('signed-in');

			expect(scope.fileList[0].name).to.be.equal('la-gioconda.pdf');

		});

	});

});