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
			//posso ignorare di passare una dipendenza, quando non passo il mock
			inject(function($controller, $rootScope, $injector, baseRoot, File){
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend
					.when('GET', baseRoot + '/files') //setup mock (verbo, url)
					.respond([
						{
							name: 'la-gioconda.pdf'
						}
					]); //oggetto di ritorno JSON

				scope = $rootScope.$new();
				controller = $controller('fileListCtrl', 
					{
					 	$scope: scope, 
					 	File:  File
					});
			});
		});

		it('loads the file list on user sign-in', function(){
			scope.$emit('signed-in');
			$httpBackend.flush();
			expect(scope.fileList[0].name).to.be.equal('la-gioconda.pdf');

		});

	});

});