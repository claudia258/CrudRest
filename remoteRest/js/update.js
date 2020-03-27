function executeDettaglio(){
	id = $("#idInputId").val();
	doCall('GET', 'http://212.237.32.76:3000/risorsa/'+id, {}, function(resultJson){
		buildModificaFromJson(resultJson);
		mostra(true);
	});
}

function executeModifica(){
	var nome = $("#nomeInputId").val();
	var cognome = $("#cognomeInputId").val();
	var data = $("#dataNascitaInputId").val();
	var stipendio = $("#stipendioInputId").val();
	var settoreSelezionato = $("#settore").find(":selected");
	var regioneSelezionata = $("#regione").find(":selected");
	var provinciaSelezionata = $("#provincia").find(":selected");
	var comuneSelezionato = $("#comune").find(":selected");
	
	var settore = {
		codice : settoreSelezionato.val(),
		descrizione : settoreSelezionato.text()
	};
	
	var regione = {
			codice : regioneSelezionata.val(),
			descrizione : regioneSelezionata.text()
	};
	
	var provincia = {
			codice : provinciaSelezionata.val(),
			descrizione : provinciaSelezionata.text()
	};
	
	var comune = {
			codice : comuneSelezionato.val(),
			descrizione : comuneSelezionato.text()
	};
	
	var residenza = {
			regione,
			provincia,
			comune
	};

	var url = 'http://212.237.32.76:3000/risorsa/';
	var parametri = {
			_id : id,
			nome : nome,
			cognome: cognome,
			dataNascita: data,
			settore: settore,
			stipendioRAL: parseFloat(stipendio),
			residenza: residenza
	};
	
	doCall('PUT', url, parametri , function(){
		window.alert("Dipendente Modificato con Successo");
		mostra(false);
	}, function(){
		window.alert("Chiamata Fallita, Riprovare");
	});

}

function selectSettoreByCodice(codice){
	$("#settore option[value='"+codice+"']").prop('selected', true);
}

function selectRegioneByCodice(codice, codiceProvincia, codiceComune){
	$("#regione option[value='"+codice+"']").prop('selected', true);
	caricaProvince(codice, codiceProvincia, codiceComune);
}	

function selectProvinciaByCodice(codice, codiceComune){
	$("#provincia option[value='"+codice+"']").prop('selected', true);
	caricaComuni(codice, codiceComune);
}

function selectComuneByCodice(codice){
	$("#comune option[value='"+codice+"']").prop('selected', true);
}

function buildModificaFromJson(json){
	
	$("#nomeInputId").val(json["nome"]);
	$("#cognomeInputId").val(json["cognome"]);
	$("#dataNascitaInputId").val(json["dataNascita"]);
	$("#stipendioInputId").val(json["stipendioRAL"]);
	selectSettoreByCodice(json["settore"]["codice"]);
	selectRegioneByCodice(json["residenza"]["regione"]["codice"], json["residenza"]["provincia"]["codice"], json["residenza"]["comune"]["codice"]);
//	selectProvinciaByCodice(json["residenza"]["provincia"]["codice"], json["residenza"]["comune"]["codice"]);
}

function caricaSettori() {
	doCall('GET', 'http://212.237.32.76:3000/settore', {} , function(json) {
		codiceSettori(json);
	});
}

function codiceSettori(resultJson) {
	var tendina = $("#settore");
	var settori = '';
	
		settori += '<option value= > Seleziona Codice </option>';
	$.each(resultJson, function(i, item) {
		settori += '<option value=' + item.codice + '>' + item.descrizione + '</option>';
	});
	tendina.append(settori);
}


//Geo 
function caricaRegioni(){
	doCall('GET', 'http://212.237.32.76:3000/geo/regioni', {} , function(json) {
		codiceRegioni(json);
	});
}

function codiceRegioni(json) {
	var tendina = $("#regione");
	var regioni = '';
	
	regioni += '<option value= > Seleziona Regione </option>';
	$.each(json, function(i, item) {
		regioni += '<option value=' + item.codice + '>' + item.descrizione + '</option>';
	});
	tendina.append(regioni);
}

function caricaProvince(codiceRegione, codiceProvincia, codiceComune){
	
	var url = 'http://212.237.32.76:3000/geo/province/'+codiceRegione;
	
	doCall('GET', url, {} , function(json) {
		codiceProvince(json, codiceProvincia, codiceComune);
	},function(){
		window.alert("Chiamata Fallita, Riprovare");
	});
}

function codiceProvince(json, codiceProvincia, codiceComune){
	var tendina =$("#provincia");
	tendina.empty();
	$("#comune").empty();
	var province ='';
	
	province += '<option value= > Seleziona Provincia </option>';
	$.each(json, function(i, item) {
		province += '<option value=' + item.codice + '>' + item.descrizione + '</option>';
	});
	tendina.append(province);
	
	if(codiceProvincia){
	selectProvinciaByCodice(codiceProvincia, codiceComune);
	}

}

function caricaComuni(codiceProvincia, codiceComune){
	
	var url = 'http://212.237.32.76:3000/geo/comuni/'+codiceProvincia;
	
	doCall('GET', url, {} ,function(json) {
		codiceComuni(json,codiceComune);
	},function(){
		window.alert("Chiamata Fallita, Riprovare");
	});
}

function codiceComuni(json, codiceComune){
	var tendina=$("#comune");
	tendina.empty();
	var comuni = '';
	
	comuni += '<option value= > Seleziona Comune </option>';
	$.each(json, function(i, item) {
		comuni += '<option value=' + item.codice + '>' + item.descrizione + '</option>';
	});
	tendina.append(comuni);
	
	if(codiceComune){
		console.log(codiceComune);
		selectComuneByCodice(codiceComune);
	}
}



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

function mostra(show){
	if(show){
		$("form#ricerca").hide();
		$("form#modifica").show();
	}
	else{
		$("form#modifica").hide();
		$("form#ricerca").show();
	}
}

function indietro(){
	mostra(false);
}


