window.remoteStorage.factory('File', function($resource, baseRoot){
	//si deve indicare la url di accesso alla risorsa per il suo id
	//le altre le deduce la libreria
	return $resource(baseRoot + '/files/:id');
});