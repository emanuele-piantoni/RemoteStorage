describe('googleLogin', function(){

	beforeEach(module('remoteStorageApp'));

	it('exist', function(){
		inject(function($injector){
			expect($injector.has('rsGoogleLoginDirective')).to.be.true;
		});
	});

});