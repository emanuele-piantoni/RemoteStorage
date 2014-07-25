describe('File resource', function(){

	beforeEach(module('remoteStorageApp'));

	it('exist', function(){
		inject(function(File){
			expect(File).to.exist;
		});
	});
});