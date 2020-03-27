function executeInsert() {
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
			nome : nome,
			cognome: cognome,
			dataNascita: data,
			settore: settore,
			stipendioRAL: parseFloat(stipendio),
			residenza: residenza
	};
	
	showSpinner();
	doCall('POST', url, parametri, function(){
		stopSpinner();
		window.alert("Dipendente Inserito con Successo");
		svuotaCampi();
	}, function(){
		stopSpinner();
		window.alert("Chiamata Fallita, Riprovare");
	});
}

function caricaSettori() {
	doCall('GET', 'http://212.237.32.76:3000/settore', {}, function(json) {
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

function svuotaCampi(){
	document.getElementById('nomeInputId').value = "";
	document.getElementById('cognomeInputId').value = "";
	document.getElementById('dataNascitaInputId').value = "";
	$("#regione").empty();
	$("#provincia").empty();
	$("#comune").empty();
	$("#settore").empty();
	caricaRegioni();
	caricaSettori();
	document.getElementById('stipendioInputId').value = "";
}

//Geo

function caricaRegioni(){
	doCall('GET', 'http://212.237.32.76:3000/geo/regioni', {}, function(json) {
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

function caricaProvince(codiceRegione){
	
	var url = 'http://212.237.32.76:3000/geo/province/'+codiceRegione;
	
	doCall('GET', url, {} , function(json) {
		codiceProvince(json);
	},function(){
		window.alert("Chiamata Fallita, Riprovare");
	});
}

function codiceProvince(json){
	var tendina =$("#provincia");
	tendina.empty();
	$("#comune").empty();
	var province ='';
	
	province += '<option value= > Seleziona Provincia </option>';
	$.each(json, function(i, item) {
		province += '<option value=' + item.codice + '>' + item.descrizione + '</option>';
	});
	tendina.append(province);
}

function caricaComuni(codiceProvincia){
	
	var url = 'http://212.237.32.76:3000/geo/comuni/'+codiceProvincia;
	
	doCall('GET', url, {} ,function(json) {
		codiceComuni(json);
	},function(){
		window.alert("Chiamata Fallita, Riprovare");
	});
}

function codiceComuni(json){
	var tendina=$("#comune");
	tendina.empty();
	var comuni = '';
	
	comuni += '<option value= > Seleziona Comune </option>';
	$.each(json, function(i, item) {
		comuni += '<option value=' + item.codice + '>' + item.descrizione + '</option>';
	});
	tendina.append(comuni);
}


//Utility

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess,callbackOnError ) {
	$.ajax({
		url: urlPath,
		type: typeRequest,
		data: parametri,
		success: callbackOnSuccess,
		error:  callbackOnError
	});
}

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError){

    console.log("Inizio chiamata: ", urlPath);

    $.ajax({
        type: typeRequest, 
        url: urlPath, 
        data: JSON.stringify(parametri),
		contentType: "application/json",
		dataType: "json",
        success: callbackOnSuccess,
        error: callbackOnError
    });
}
