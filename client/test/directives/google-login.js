describe('googleLogin', function(){

	beforeEach(module('remoteStorageApp'));

	it('exist', function(){
		inject(function($injector){
			expect($injector.has('rsGoogleLoginDirective')).to.be.true;
		});
	});

	describe('the boot phase', function(){
		var $compile;
		var clientId = '964626608963-elde8h4alm10o3kh4t9c1d7o0ehiagfv.apps.googleusercontent.com';
		var markup = '<rs-google-login current-user="username" client-id="' + clientId +'">';

		beforeEach(function(){
			inject(function(_$compile_){ //gli _ sono invarianti
				$compile = _$compile_;
			});
		});

		//se passo l'argomento done, mocha capisce che il test è asincrono
		it('calls the window.render function', function(done){
			window.render = function(){ done(); };
			$compile(markup);
		});

		it('attach the required meta tags', function(done){
			window.render = function(){
				var meta = document.querySelector('meta[name="google-signin-clientid"]');
				expect(meta.content).to.be.equal(clientId);
				done();
			};
			$compile(markup);
		});
	});

});