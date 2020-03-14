function getListaSemaforos() {
	$("#spinner").fadeIn();
	tipoEnvio=0;
	$("#conteTableSemaforo").append('<table class="table table-striped" id="semaforo" >'+
			'<thead>'+
				'<tr>'+
					'<th>Contraparte</th>'+
					'<th>Limite Global</th>'+
					'<th>Límite Utilizado</th>'+
					'<th>Límite Restante</th>'+
				'</tr>'+
			'</thead>'+
			'<tbody id="tableSemaforo">'+
			'</tbody>'+
		'</table>');
	

	$.ajax({
		async : true,
		url : '/semaforosalertas/lista/'+tipoEnvio,
		type : 'get',// POST,PUT,DELETE,GET,PATCH
		dataType: 'json',
		processData:false,
		contentType:"application/json",
		success : function(da) { // true
			//console.log(da);
			var arrayContraparte = [], arrayLimiteGlobal = [], arrayLimiteUtilizado = [], arrayLimiteRestante = [];//Pariente
			for (var i = 0; i < da.length; i++) {
				var resta = (parseFloat(da[i]['globalLimit']) - parseFloat(da[i]['suma']));
				var porcentaje = ((resta*100) / parseFloat(da[i]['globalLimit']));
				var clase = "";
				if(porcentaje > 50 ){
					clase = "alert alert-success";
				}else if(porcentaje > 25 && porcentaje < 50){
					clase = "alert alert-warning";
				}else{
					clase = "alert alert-danger";
				}				
				$("#tableSemaforo").append('<tr>'+
						'<td>'+da[i]['contraparte']+'</td>'+
						'<td>'+da[i]['globalLimit']+'</td>'+
						'<td>'+da[i]['suma']+'</td>'+
						'<td class="'+clase+'">'+resta+'</td>'+
					'</tr>');
				arrayContraparte.push(da[i]['contraparte']);//Pariente
				arrayLimiteGlobal.push(da[i]['globalLimit']);//Pariente
				arrayLimiteUtilizado.push(da[i]['suma']);//Pariente
				arrayLimiteRestante.push(resta);//Pariente
			}
			$("#btnShowGraficaSemaforo").slideDown();
			showGraficas(arrayContraparte, 'graficaSemaforo', arrayLimiteGlobal, arrayLimiteUtilizado, arrayLimiteRestante);//Pariente		
			getListaSemaforosOperador();
			//$("#spinner").fadeOut();
		},
		error : function(d) {
			console.log(d);
		}
	});
	
}

function getListaSemaforosOperador(){
	tipoEnvio=1;
	$("#conteTableSemaforoUsuario").append('<table class="table table-striped" id="semaforoUsuario" >'+
			'<thead>'+
				'<tr>'+
					'<th>Operador</th>'+
					'<th>Limite Global</th>'+
					'<th>Límite Utilizado</th>'+
					'<th>Límite Restante</th>'+
				'</tr>'+
			'</thead>'+
			'<tbody id="tableSemaforoUsuario">'+
			'</tbody>'+
		'</table>');
	
	$.ajax({
		async : true,
		url : '/semaforosalertas/lista/'+tipoEnvio,
		type : 'get',// POST,PUT,DELETE,GET,PATCH
		dataType: 'json',
		processData:false,
		contentType:"application/json",
		success : function(da) { // true
			//console.log(da);
			var arrayContraparte = [], arrayLimiteGlobal = [], arrayLimiteUtilizado = [], arrayLimiteRestante = [];//Pariente
			for (var i = 0; i < da.length; i++) {
				//console.log("....");
				var resta = (parseFloat(da[i]['globalLimit']) - parseFloat(da[i]['suma']));
				var porcentaje = ((resta*100) / parseFloat(da[i]['globalLimit']));
				var clase = "";
				if(porcentaje > 50 ){
					clase = "alert alert-success";
				}else if(porcentaje > 25 && porcentaje < 50){
					clase = "alert alert-warning";
				}else{
					clase = "alert alert-danger";
				}
				
				$("#tableSemaforoUsuario").append('<tr>'+
						'<td>'+da[i]['contraparte']+'</td>'+
						'<td>'+da[i]['globalLimit']+'</td>'+
						'<td>'+da[i]['suma']+'</td>'+
						'<td class="'+clase+'">'+resta+'</td>'+
					'</tr>');	
				arrayContraparte.push(da[i]['contraparte']);//Pariente
				arrayLimiteGlobal.push(da[i]['globalLimit']);//Pariente
				arrayLimiteUtilizado.push(da[i]['suma']);//Pariente
				arrayLimiteRestante.push(resta);//Pariente
			}
			$("#btnShowGraficaSemaforoUsuario").slideDown();
			//document.getElementById("btnShowGraficaSemaforoUsuario").style.display = "block";
			//$("#spinner").fadeOut();
			showGraficas(arrayContraparte, 'graficaSemaforoUsuario', arrayLimiteGlobal, arrayLimiteUtilizado, arrayLimiteRestante);//Pariente
			getListaSemaforosOperaciones();
		},
		error : function(d) {
			console.log(d);
		}
	});
	
}

function getListaSemaforosOperaciones(){
	$("#conteTableSemaforoOperaciones").append('<table class="table table-striped" id="semaforoOperacion" >'+
			'<thead>'+
				'<tr>'+
					'<th>Mercado</th>'+
					'<th>ID Operación</th>'+
					'<th>Contraparte</th>'+
					'<th>Operador</th>'+
					'<th>Reporto/Directo</th>'+
					'<th>Límite x Operación</th>'+
					'<th>Monto de la Operación</th>'+
					'<th>Límite Restante</th>'+
				'</tr>'+
			'</thead>'+
			'<tbody id="tableSemaforoOperacion">'+
			'</tbody>'+
		'</table>');
	
	
	
	$.ajax({
		async : true,
		url : '/semaforosalertas/listaSegundaTabla',
		type : 'get',// POST,PUT,DELETE,GET,PATCH
		dataType: 'json',
		processData:false,
		contentType:"application/json",
		success : function(da) { // true
			console.log(da);
			var arrayContraparte = [], arrayLimiteGlobal = [], arrayLimiteUtilizado = [], arrayLimiteRestante = [];//Pariente
			for (var i = 0; i < da.length; i++) {
				var resta = (parseFloat(da[i]['reportoDirecto']) - parseFloat(da[i]['multiplicacion']));
				/*	var porcentaje = ((resta*100) / parseFloat(da[i]['globalLimit']));
				var clase = "";
				if(porcentaje > 50 ){
					clase = "alert alert-success";
				}else if(porcentaje > 25 && porcentaje < 50){
					clase = "alert alert-warning";
				}else{
					clase = "alert alert-danger";
				}*/
				
				$("#tableSemaforoOperacion").append('<tr>'+
						'<td>M Dinero</td>'+
						'<td>'+da[i]['idOperacionesDirecto']+'</td>'+
						'<td>'+da[i]['contraparte']+'</td>'+
						'<td>'+da[i]['nombre']+' '+da[i]['apellido']+'</td>'+
						'<td>'+da[i]['directoReporto']+'</td>'+
						'<td>'+da[i]['reportoDirecto']+'</td>'+
						'<td>'+da[i]['multiplicacion']+'</td>'+
						'<td>'+resta+'</td>'+
					'</tr>');	
				arrayContraparte.push(da[i]['contraparte']);//Pariente
				arrayLimiteGlobal.push(da[i]['reportoDirecto']);//Pariente
				arrayLimiteUtilizado.push(da[i]['multiplicacion']);//Pariente
				arrayLimiteRestante.push(resta);//Pariente
			}
			$("#btnShowGraficaSemaforoOperaciones").slideDown();
			//document.getElementById("btnShowGraficaSemaforoOperaciones").style.display = "block";
			showGraficas(arrayContraparte, 'graficaSemaforoOperaciones', arrayLimiteGlobal, arrayLimiteUtilizado, arrayLimiteRestante);//Pariente
			$("#spinner").fadeOut();

		},
		error : function(d) {
			console.log(d);
		}
	});
	
	
	
}

function showGraficas(arrayContraparte, idGrafica, arrayLimiteGlobal, arrayLimiteUtilizado, arrayLimiteRestante) {
//	console.log("idGrafica "+arrayLimiteGlobal);
	//console.log("idGrafica "+arrayLimiteUtilizado);
	//console.log("idGrafica "+arrayLimiteRestante);
	var densityCanvas = document.getElementById(idGrafica);
	Chart.defaults.global.defaultFontFamily = "Lato";
	Chart.defaults.global.defaultFontSize = 18;
	var label1 = "Limite Global";
	var label2 = "Límite Utilizado";
	var label3 = "Límite Restante";
	
	if(idGrafica == "graficaSemaforoOperaciones"){
		label1 = "Límite x Operación";
		label2 = "Monto de la Operación";
		label3 = "Límite Restante";
	}
	
	
	var dataLimiteGlobal = {
			  label: label1,
			  data: arrayLimiteGlobal,
			  backgroundColor: 'rgba(0, 99, 132, 0.6)',
			  borderWidth: 0,
			  yAxisID: "y-axis-gobal"
			};

			var dataLimiteUtilizado = {
			  label: label2,
			  data: arrayLimiteUtilizado,
			  backgroundColor: 'rgba(99, 132, 0, 0.6)',
			  borderWidth: 0,
			  yAxisID: "y-axis-gobal"
			};
			
			var dataLimiteRestante = {
					  label: label3,
					  data: arrayLimiteRestante,
					  backgroundColor: 'rgba(99, 0, 0, 0.6)',
					  borderWidth: 0,
					  yAxisID: "y-axis-gobal"
					};
			
			var dataGrafica = {
					  labels: arrayContraparte,
					  datasets: [dataLimiteGlobal, dataLimiteUtilizado, dataLimiteRestante]
					};

					var chartOptions = {
					  scales: {
					    xAxes: [{
					      barPercentage: 1,
					      categoryPercentage: 0.6
					    }],
					    yAxes: [{
					      id: "y-axis-gobal"
					    }]
					  }
					};

					var barChart = new Chart(densityCanvas, {
					  type: 'bar',
					  data: dataGrafica,
					  options: chartOptions
					});
	
}

function showGrafica(idGrafica, idButton){
	if (document.getElementById(idGrafica).style.display == "none"){
		document.getElementById(idGrafica).style.display = "block";
		document.getElementById(idButton).text = "Ocultar Grafica";
	}else{
		document.getElementById(idGrafica).style.display = "none";
		document.getElementById(idButton).text = "Mostrar Grafica";
	}
	
}
