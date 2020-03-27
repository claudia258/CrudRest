function buildDettaglioFromJson(json){
	var id = json["_id"];
	var nome = json["nome"];
	var cognome = json["cognome"];
	var dataNascita = json["dataNascita"];
	var settore = {codice: json["settore"]["codice"],descrizione: json["settore"]["descrizione"]};
	var regione = {codice: json["residenza"]["regione"]["codice"],descrizione: json["residenza"]["regione"]["descrizione"]};
	var provincia = {codice: json["residenza"]["provincia"]["codice"],descrizione: json["residenza"]["provincia"]["descrizione"]};
	var comune = {codice: json["residenza"]["comune"]["codice"],descrizione: json["residenza"]["comune"]["descrizione"]};
	var stipendio = json["stipendioRAL"];
	
	$("#id").html(id);
	$("#nomeId").html(nome);
	$("#cognomeId").html(cognome);
	$("#dataNascitaId").html(dataNascita);
	$("#settoreId").html(settore.descrizione +" ("+settore.codice+")");
	$("#regioneId").html(regione.descrizione +" ("+regione.codice+")");
	$("#provinciaId").html(provincia.descrizione +" ("+provincia.codice+")");
	$("#comuneId").html(comune.descrizione +" ("+comune.codice+")");
	$("#stipendioId").html(stipendio);
}

function executeDettaglio(){
	id = $("#idInputId").val();

	showSpinner();
	
	doCall('GET', 'http://212.237.32.76:3000/risorsa/'+id, {}, function(resultJson){	
		buildDettaglioFromJson(resultJson);
		mostra(true);
		stopSpinner();
	}, function (){
		stopSpinner();
	});
}


//Utility

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess,
		error: callbackOnError
	});
}

function mostra(show){
	if(show){
		$("form#dettaglio").hide();
		$("div#dettaglio").show();
	}
	else{
		$("div#dettaglio").hide();
		$("form#dettaglio").show();
	}
}

function indietro(){
	var id = document.getElementById("#idInputId");
	id = ""; 
	mostra(false);
}
