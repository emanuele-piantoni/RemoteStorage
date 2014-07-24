//<rs-google-login 
// 		current-user="currentUser" 
//		client-id="..."
//>

angular.module('remoteStorageApp')
	.directive('rsGoogleLogin', [function(){
		
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
			compile: function(element, attributes){
				window.render = window.render || function(){};

				//controllo se lo script era già stato inserito
				if(!window.gapi){
					addMeta('google-signin-clientid', attributes.clientId);
        			addMeta('google-signin-scope', 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email');
        			addMeta('google-signin-requestvisibleactions', 'http://schema.org/AddAction');
        			addMeta('google-signin-cookiepolicy', 'single_host_origin');
					printJs();
				}else {
					window.render();
				}
			}
		};
}]);