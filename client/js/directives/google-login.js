//<rs-google-login 
// 		current-user="currentUser" 
//		client-id="..."
//>

angular.module('remoteStorageApp')
	.directive('rsGoogleLogin', ['$rootScope', function($rootScope){
		
		//stampo nel dom il file js di google
		function printJs(){
			var po = document.createElement('script'); 
			po.type = 'text/javascript'; 
			po.async = true;
    		po.src = 'https://apis.google.com/js/client:plusone.js?onload=render';
    		var s = document.getElementsByTagName('script')[0]; 
    		s.parentNode.insertBefore(po, s);
		};

		function addMeta(name, content){								
			var meta = document.createElement('meta');
			meta.name = name;
			meta.content = content;
			document.getElementsByTagName('head')[0].appendChild(meta);
		};

		return {
			restrict: "E", //sta per element -> tag
			//qui dichiaro tutto quello che espongo all'esterno
			scope: {
				//nome proprieta scope interno della direttiva
				//tipo di relazione tra variabile scope interno e scope esterno (ad esempio '=' vuol dire per referenza)
				//seguito dal nome della proprieta dello scope esterno (non e necessario se hanno lo stesso nome)
				//currentUser: '=currentUser'  
				currentUser: '='  
			},
			compile: function(element, attributes){
				window.render = window.render || function(){
					//emette evento per dire che la directtiva è pronta
					$rootScope.$emit('init-current-user');
				};

				//controllo se lo script era già stato inserito
				if(!window.gapi){
					addMeta('google-signin-clientid', attributes.clientId);
        			addMeta('google-signin-scope', 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email');
        			addMeta('google-signin-requestvisibleactions', 'http://schema.org/AddAction');
        			addMeta('google-signin-cookiepolicy', 'single_host_origin');
					printJs();
				}else {
					setTimeout(window.render, 0);
				}
			},
			controller: function($scope){
				$scope.currentUser = {};

				//questa funzione non risulta essere esposta perche lo scope di una direttiva e isolato
				$scope.signInCallback= function(data){		
					if(data.status && !data.status.signed_id)
					{
						$scope.$apply(function(){
							$scope.currentUser.errorMessage = data.error;
						});
					}					
				};

				$rootScope.$on('init-current-user', function(){
					$scope.$apply(function(){
						$scope.currentUser.readyToSignIn = true;
						$scope.currentUser.doSignIn = function(){
								gapi.auth.singIn({
									callback: $scope.signInCallback
								});
							};

					});
				});				
				
			}

		};
}]);