function executeDelete(){
	
	id = $("#idInputId").val();
	showSpinner();
	doCall('DELETE', 'http://212.237.32.76:3000/risorsa/'+id, {}, function(){
		stopSpinner();
		window.alert("Dipendente eliminato con successo ");
	}, function(){
		stopSpinner();
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
