function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: JSON.stringify(parametri),
		contentType: "application/json",
		dataType: "json",
		success: callbackOnSuccess,
		error: callbackOnError
	});
}


function isBlank(str) {
	return (!str || /^\s*$/.test(str));
}
