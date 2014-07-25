window.remoteStorage.factory('File', function($resource){
	//si deve indicare la url di accesso alla risorsa per il suo id
	//le altre le deduce la librerie
	return $resource('http://localhost:3000/api/files/:id')
});