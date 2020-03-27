function executeDelete(){
	
	id = $("#idInputId").val();
	doCall('DELETE', 'http://212.237.32.76:3000/risorsa/'+id, {}, function(){
		window.alert("Dipendente eliminato con successo ");
	}, function(){
		window.alert("Chiamata Fallita, Riprovare");
	});
}

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess,callbackOnError ) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess,
		error:  callbackOnError
	});
}
