function caricaSettori() {

	doCall('GET', 'http://212.237.32.76:3000/settore', {}, function(json) {
		codiceSettori(json);
	}, function(){
		window.alert("Chiamata Fallita, Riprovare");
	});
}

function codiceSettori(resultJson) {
	var tendina = $("#codiceSettore");
	var settori = '';
	
		settori += '<option value= > Seleziona Codice </option>';
	$.each(resultJson, function(i, item) {
		settori += '<option value=' + item.codice + '>' + item.codice + ' ('
				+ item.descrizione + ')</option>';
	});
	tendina.append(settori);
}

function executeFindWithFilter(){
	nome = $("#nomeInputId").val();
	cognome = $("#cognomeInputId").val();
	codiceSettore = $("#codiceSettore").val();
	
	var parametri = "nome="+nome+"&cognome="+cognome+"&codiceSettore="+codiceSettore;
	var url = 'http://212.237.32.76:3000/risorsa/'
		showSpinner();

	doCall('GET', url ,parametri, function(result){
		buildResultTable(result);
		mostra(true);
		stopSpinner();
	}, function(){
		stopSpinner();
		window.alert("Chiamata Fallita, Riprovare");
	});
}

function buildResultTable(json){
	var table = $('#dipendenti');
	var dipendenti = '';
	table.empty();
	
	var tableHead = "<tr><td><b>Nome</b></td><td><b>Cognome</b></td><td><b>Settore</b></td><td><b>Stipendio</b></td></td>";
	table.append(tableHead);
	
	$.each(json, function(i,item){
		dipendenti += '<tr><td>'+item.nome+'</td><td>'+item.cognome+'</td><td>'+item.settore.descrizione+'</td><td>'+item.stipendioRAL+'</td></tr>';
	});
	table.append(dipendenti);

}

function doCall(typeRequest, urlPath, parametri, callbackOnSuccess, callbackOnError) {

	$.ajax({
		type : typeRequest, // Metodo di chiamata da effettuare
		url : urlPath, // Url da chiamare
		data : parametri, // Eventuali parametri da passare NB: si posso
		// scrivere anche in questo {idFromHtml: valore}
		success : callbackOnSuccess,
		error: callbackOnError
	});
}

function mostra(show){
	if(show){
		$("form#ricerca").hide();
		$("#dipendenti").show();
		$("#indietro").show();
	}
	else{
		$("#dipendenti").hide();
		$("form#ricerca").show();
		$("#indietro").hide();
	}
}

function indietro(){
	mostra(false);
}
