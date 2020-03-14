
var myTable2;

	var token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQaGlJbnZlc3RtZW50Q2FwaXRhbCIsImlhdCI6MTU4NDIxODYwOCwiZXhwIjoxNTg0MjMwNDAwLCJuYmYiOjE1ODQyMTg2MDgsImp0aSI6IjVlNmQ0MWYwNzI2NTkiLCJzdWIiOjEsInVzciI6eyJpZF91c3VhcmlvcyI6MSwiaWRfem9uYXNfaG9yYXJpYXMiOjQ5LCJub21icmUiOiJNYW5saW8iLCJhcGVsbGlkbyI6IlRlcmFuIiwiY29ycmVvIjoibWFubGlvZWxudW0xQGhvdG1haWwuY29tIiwiY2FyZ28iOiJNYW5hZ2VyIiwidGVsZWZvbm9fZmlqbyI6IjU2NzEzMTc0NSIsImNlbHVsYXIiOiI1NTEwODAwMjkxIiwiY3JlYXRlZF9hdCI6IjIwMTktMTAtMTYgMjA6NDg6MzAiLCJ1cGRhdGVkX2F0IjoiMjAxOS0xMC0xMSAwODozODozOSIsImRuaV9udW0iOiIyMzQzMjQzMjQiLCJzZWd1cm9fc29jaWFsIjoiMzQ1NDM1NDM1IiwiZm90b19iYXNlNjQiOiIiLCJwYXNzIjoiOGU5NmJkMDJmYmNiMDU0Y2NhMTFjZjhkZWIwMzE1NjJiOWFhZWRkODNmODNmZjdhYmY3YzNmYTc4N2FkOWJiZCJ9LCJwZXJtaXNvcyI6WzFdfQ.HjW-EXAHcqY6l-cDE2MGEgGt6653RxqSWJKM2EZEJDo';
	var urlGlobal = 'http://localhost:8081';

$(document)
		.ready(
				function() {

					
				});

function myCallbackFunction2(updatedCell, updatedRow, oldValue) {
	
	/*
	 * console.log(updatedRow.id)
	 * 
	 * updatedRow.data().forEach(function(element, i) {
	 * 
	 * 
	 * console.log(element) })
	 */
	
	var datos = [];

	console.log(updatedRow.data())
	
    datos.push(updatedRow.data());
	console.log(datos);
	
	
	
	
	var validacionLimiteGlobal=(parseInt(datos[0][2]))+(parseInt(datos[0][3]))+(parseInt(datos[0][5]));
	//console.log(validacionLimiteGlobal)
	var validacionOperacionMercadoMoney=(parseInt(datos[0][2]))+(parseInt(datos[0][3]));
	//console.log(validacionOperacionMercadoMoney)
	var validacionOperacionMercadoCambios=(parseInt(datos[0][5]));
	//console.log(validacionOperacionMercadoCambios)
	
	
	
	 if(datos[0][1]<validacionLimiteGlobal){
			alertify.set('notifier', 'position', 'bottom-left');
			alertify.error('El campo limite global debe ser mayor');
			  updatedCell.data(oldValue);
			
			
	 }else if (datos[0][4]>validacionOperacionMercadoMoney){
		  updatedCell.data(oldValue);

			alertify.set('notifier', 'position', 'bottom-left');
			alertify.error('El campo limite por operación debe ser menor');
	 }else if(datos[0][6]>validacionOperacionMercadoCambios){
		  updatedCell.data(oldValue);

		 	alertify.set('notifier', 'position', 'bottom-left');
			alertify.error('El campo limite por operación mercado de cambios debe ser menor');
	 }else{

	var id = datos[0]['DT_RowId'];

	$.ajax({
		async : true,
		url : urlGlobal+'/limiteslineas/'+ id,
		type : 'put',// POST,PUT,DELETE,GET,PATCH
		dataType: 'json',
		headers: {'Autorization':token},
		data : JSON.stringify({
			contraparte : datos[0][0],
			globalLimit : datos[0][1],
			directOperationLimit : datos[0][2],
			reportoOperationLimit : datos[0][3],
			operationLimitMoneyMarket : datos[0][4],
			exchangeMarketLimit : datos[0][5],
			limitOperationExchangeMarket : datos[0][6],
			mercado : "mexicano",
			//usuario : "Roberto"
		}),
		processData:false,
		contentType:"application/json",
		success : function(da) { // true
			console.log(da);

		},
		error : function(d) {
			console.log(d);
			  updatedCell.data(oldValue);

		}
	});
	
	 }
	
	
}


function addRow() {
	$("#btnAgregar").slideUp( "slow" )
	myTable2.row.add( [
'<input type="text" id="contraparte" class="form-control"/>',
'<input type="number" id="globalLimit" class="form-control"/>',
'<input type="number" id="directOperationLimit" class="form-control"/>',
'<input type="number" id="reportoOperationLimit" class="form-control"/>',
'<input type="number" id="operationLimitMoneyMarket" class="form-control"/>',
'<input type="number" id="exchangeMarketLimit" class="form-control"/>',
'<input type="number" id="limitOperationExchangeMarket" class="form-control"/>',
'<a class="btn btn-danger btn-xs" style="color: white" onclick="cancel(this)">X</a><a class="btn btn-success btn-xs" style="color: white" onclick="guardar(this)">&#10003;</a>'] ).draw( false );
}

function cancel(row){
	$("#btnAgregar").slideDown( "slow" )
	myTable2.row( $(row).parents('tr') ).remove();
	myTable2.draw();
}

function guardar(row) {
	var validacionLimiteGlobal=(parseInt($("#directOperationLimit").val()))+(parseInt($("#reportoOperationLimit").val()))+(parseInt($("#exchangeMarketLimit").val()));
	//console.log(validacionLimiteGlobal)
	var validacionOperacionMercadoMoney=(parseInt($("#directOperationLimit").val()))+(parseInt($("#reportoOperationLimit").val()));
	//console.log(validacionOperacionMercadoMoney)
	var validacionOperacionMercadoCambios=(parseInt($("#exchangeMarketLimit").val()));
	//console.log(validacionOperacionMercadoCambios)
	
	
	if($("#contraparte").val()==""){
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('Campo contraparte es necesario');
	}else if($("#globalLimit").val()==""){
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('Campo limite global es necesario');
		
	}else if($("#directOperationLimit").val()==""){
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('Campo limite operaciones directo es necesario');

	}else if($("#reportoOperationLimit").val()==""){
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('Campo limite operaciones reporto es necesario');

	}else if($("#operationLimitMoneyMarket").val()==""){
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('Campo limite por operacion es necesario');

	}else if($("#exchangeMarketLimit").val()==""){
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('Campo limite mercado es necesario');

	}else if($("#limitOperationExchangeMarket").val()==""){
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('Campo limite por operacion mercado es necesario');

	}else if($("#globalLimit").val()<validacionLimiteGlobal){
		
		$("#globalLimit").focus();
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('El campo limite global debe ser mayor');
	}else if($("#operationLimitMoneyMarket").val()>validacionOperacionMercadoMoney){
		
		$("#operationLimitMoneyMarket").focus();
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('El campo limite por operación debe ser menor');
	}else if($("#limitOperationExchangeMarket").val()>validacionOperacionMercadoCambios){
		
		$("#limitOperationExchangeMarket").focus();
		alertify.set('notifier', 'position', 'bottom-left');
		alertify.error('El campo limite por operación mercado de cambios debe ser menor');
	}else{
		var contraparte = $("#contraparte").val();
		contraparte = contraparte.toUpperCase();
		var globalLimit = "";
		var directOperationLimit = "";
		var reportoOperationLimit = "";
		var operationLimitMoneyMarket = "";
		var exchangeMarketLimit = "";
		var limitOperationExchangeMarket = "";
		var estatus = "";
		
		const swalWithBootstrapButtons = Swal.mixin({
			  customClass: {
			    confirmButton: 'btn btn-success',
			    cancelButton: 'btn btn-danger'
			  },
			  buttonsStyling: false
			})

			Swal.fire({
			  title: '¿Desea registrar el limite como contraparte o como operador?',
			  text: "",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#47FFAB',
			  cancelButtonColor: '#47C2FF',
			  confirmButtonText: 'Contraparte',
			  cancelButtonText: 'Operador',
			  reverseButtons: true
			}).then((result) => {
			  if (result.value) {
				  //contraparte
				  estatus = 0;
				  
					if( $("#selectDivisas").val() != "MXN"){
						
						 //divisaGlobal
						
						Swal.fire({
							  title: 'El valor serà convertido a pesos mexicanos!',
							  text: "",
							  icon: 'warning',
							  showCancelButton: true,
							  confirmButtonColor: '#3085d6',
							  cancelButtonColor: '#d33',
							  confirmButtonText: 'Aceptar'
							}).then((result) => {
							  if (result.value) {
									globalLimit = ((parseFloat($("#globalLimit").val()))* (1))/parseFloat(divisaGlobal);
									directOperationLimit = ((parseFloat($("#directOperationLimit").val()))* (1))/parseFloat(divisaGlobal);
									reportoOperationLimit = ((parseFloat($("#reportoOperationLimit").val()))* (1))/parseFloat(divisaGlobal);
									operationLimitMoneyMarket = ((parseFloat($("#operationLimitMoneyMarket").val()))* (1))/parseFloat(divisaGlobal);
									exchangeMarketLimit = ((parseFloat($("#exchangeMarketLimit").val()))* (1))/parseFloat(divisaGlobal);
									limitOperationExchangeMarket = ((parseFloat($("#limitOperationExchangeMarket").val()))* (1))/parseFloat(divisaGlobal);
							  
									$.ajax({
										async : true,
										url : urlGlobal+'/limiteslineas',
										type : 'post',// POST,PUT,DELETE,GET,PATCH
										dataType: 'json',
										headers: {'Authorization':token},
										data : JSON.stringify({
											contraparte : contraparte,
											globalLimit : globalLimit,
											directOperationLimit : directOperationLimit,
											reportoOperationLimit : reportoOperationLimit,
											operationLimitMoneyMarket : operationLimitMoneyMarket,
											exchangeMarketLimit : exchangeMarketLimit,
											limitOperationExchangeMarket : limitOperationExchangeMarket,
											mercado : "mexicano",
											//usuario : "Roberto",
											estatus:estatus
										}),
										processData:false,
										contentType:"application/json",
										success : function(response) { // true
											console.log(response);
											$("#rowNewInfo").remove();
											
											myTable2.row.add([
												 response.contraparte,
												 response.globalLimit,
												 response.directOperationLimit,
												 response.reportoOperationLimit,
												 response.operationLimitMoneyMarket,
												 response.exchangeMarketLimit,
												 response.limitOperationExchangeMarket,
												 "<a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteq('"+response.contraparte+"')\">Eliminar</a>"
										        ]).node().id = response.id;
											myTable2.row( $(row).parents('tr') ).remove();
											myTable2.draw();
											Swal.fire('La contraparte se registro correctamente','','success')	
											
											
										},
										error : function(d) {
											console.log(d.statusText);

										}
									});
							  
							  }
							})
					}else{
						globalLimit = $("#globalLimit").val();
						directOperationLimit = $("#directOperationLimit").val();
						reportoOperationLimit = $("#reportoOperationLimit").val();
						operationLimitMoneyMarket = $("#operationLimitMoneyMarket").val();
						exchangeMarketLimit = $("#exchangeMarketLimit").val();
						limitOperationExchangeMarket = $("#limitOperationExchangeMarket").val();
						
						$.ajax({
							async : true,
							url : urlGlobal+'/limiteslineas',
							type : 'post',// POST,PUT,DELETE,GET,PATCH
							dataType: 'json',
							headers: {'Authorization':token},
							data : JSON.stringify({
								contraparte : contraparte,
								globalLimit : globalLimit,
								directOperationLimit : directOperationLimit,
								reportoOperationLimit : reportoOperationLimit,
								operationLimitMoneyMarket : operationLimitMoneyMarket,
								exchangeMarketLimit : exchangeMarketLimit,
								limitOperationExchangeMarket : limitOperationExchangeMarket,
								mercado : "mexicano",
								//usuario : "Roberto",
								estatus:estatus
							}),
							processData:false,
							contentType:"application/json",
							success : function(response) { // true
								console.log(response);
								$("#rowNewInfo").remove();
								
								myTable2.row.add([
									 response.contraparte,
									 response.globalLimit,
									 response.directOperationLimit,
									 response.reportoOperationLimit,
									 response.operationLimitMoneyMarket,
									 response.exchangeMarketLimit,
									 response.limitOperationExchangeMarket,
									 "<a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteq('"+response.contraparte+"',this)\">Eliminar</a>"
							        ]).node().id = response.id;
								myTable2.row( $(row).parents('tr') ).remove();
								myTable2.draw();
								Swal.fire('La contraparte se registro correctamente','','success')	
								
								
							},
							error : function(d) {
								console.log(d.statusText);

							}
						});
					}
				  
			  } else if (
			    /* Read more about handling dismissals below */
			    result.dismiss === Swal.DismissReason.cancel
			  ) {
				  //operador
				  estatus = 1;
				  
					if( $("#selectDivisas").val() != "MXN"){
						
						 //divisaGlobal
						
						Swal.fire({
							  title: 'El valor serà convertido a pesos mexicanos!',
							  text: "",
							  icon: 'warning',
							  showCancelButton: true,
							  confirmButtonColor: '#3085d6',
							  cancelButtonColor: '#d33',
							  confirmButtonText: 'Aceptar'
							}).then((result) => {
							  if (result.value) {
									globalLimit = ((parseFloat($("#globalLimit").val()))* (1))/parseFloat(divisaGlobal);
									directOperationLimit = ((parseFloat($("#directOperationLimit").val()))* (1))/parseFloat(divisaGlobal);
									reportoOperationLimit = ((parseFloat($("#reportoOperationLimit").val()))* (1))/parseFloat(divisaGlobal);
									operationLimitMoneyMarket = ((parseFloat($("#operationLimitMoneyMarket").val()))* (1))/parseFloat(divisaGlobal);
									exchangeMarketLimit = ((parseFloat($("#exchangeMarketLimit").val()))* (1))/parseFloat(divisaGlobal);
									limitOperationExchangeMarket = ((parseFloat($("#limitOperationExchangeMarket").val()))* (1))/parseFloat(divisaGlobal);
							  
									$.ajax({
										async : true,
										url : urlGlobal+'/limiteslineas',
										type : 'post',// POST,PUT,DELETE,GET,PATCH
										dataType: 'json',
										headers: {'Authorization':token},
										data : JSON.stringify({
											contraparte : contraparte,
											globalLimit : globalLimit,
											directOperationLimit : directOperationLimit,
											reportoOperationLimit : reportoOperationLimit,
											operationLimitMoneyMarket : operationLimitMoneyMarket,
											exchangeMarketLimit : exchangeMarketLimit,
											limitOperationExchangeMarket : limitOperationExchangeMarket,
											mercado : "mexicano",
											//usuario : "Roberto",
											estatus:estatus
										}),
										processData:false,
										contentType:"application/json",
										success : function(response) { // true
											console.log(response);
											$("#rowNewInfo").remove();
											
											myTable2.row.add([
												 response.contraparte,
												 response.globalLimit,
												 response.directOperationLimit,
												 response.reportoOperationLimit,
												 response.operationLimitMoneyMarket,
												 response.exchangeMarketLimit,
												 response.limitOperationExchangeMarket,
												 "<a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteq('"+response.contraparte+"')\">Eliminar</a>"
										        ]).node().id = response.id;
											myTable2.row( $(row).parents('tr') ).remove();
											myTable2.draw();
											Swal.fire('La contraparte se registro correctamente','','success')	
											
											
										},
										error : function(d) {
											console.log(d.statusText);

										}
									});
							  
							  }
							})
					}else{
						globalLimit = $("#globalLimit").val();
						directOperationLimit = $("#directOperationLimit").val();
						reportoOperationLimit = $("#reportoOperationLimit").val();
						operationLimitMoneyMarket = $("#operationLimitMoneyMarket").val();
						exchangeMarketLimit = $("#exchangeMarketLimit").val();
						limitOperationExchangeMarket = $("#limitOperationExchangeMarket").val();
						
						$.ajax({
							async : true,
							url : urlGlobal+'/limiteslineas',
							type : 'post',// POST,PUT,DELETE,GET,PATCH
							dataType: 'json',
							headers: {'Authorization':token},
							data : JSON.stringify({
								contraparte : contraparte,
								globalLimit : globalLimit,
								directOperationLimit : directOperationLimit,
								reportoOperationLimit : reportoOperationLimit,
								operationLimitMoneyMarket : operationLimitMoneyMarket,
								exchangeMarketLimit : exchangeMarketLimit,
								limitOperationExchangeMarket : limitOperationExchangeMarket,
								mercado : "mexicano",
								//usuario : "Roberto",
								estatus:estatus
							}),
							processData:false,
							contentType:"application/json",
							success : function(response) { // true
								console.log(response);
								$("#rowNewInfo").remove();
								
								myTable2.row.add([
									 response.contraparte,
									 response.globalLimit,
									 response.directOperationLimit,
									 response.reportoOperationLimit,
									 response.operationLimitMoneyMarket,
									 response.exchangeMarketLimit,
									 response.limitOperationExchangeMarket,
									 "<a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteq('"+response.contraparte+"',this)\">Eliminar</a>"
							        ]).node().id = response.id;
								myTable2.row( $(row).parents('tr') ).remove();
								myTable2.draw();
								Swal.fire('La contraparte se registro correctamente','','success')	
								
								
							},
							error : function(d) {
								console.log(d.statusText);

							}
						});
					}
			  }
			})
	
		 
		/*if($("#selectTipo").val() == "contraparte"){
			estatus = 0;
		}else{
			estatus = 1;
		}*/
		
		
	}
	$("#btnAgregar").slideDown( "slow" )

}


function update() {
	$.ajax({
		async : true,
		url : urlGlobal+'/limiteslineas/2',
		type : 'put',// POST,PUT,DELETE,GET,PATCH
		dataType: 'json',
		headers: {'Authorization':token},
		data : JSON.stringify({
			contraparte : "Bancomer2",
			globalLimit : 20001,
			directOperationLimit : 2000,
			reportoOperationLimit : 38208,
			operationLimitMoneyMarket : 90880,
			exchangeMarketLimit : 84783,
			limitOperationExchangeMarket : 8748,
			mercado : "mexicano",
			usuario : "Roberto"
		}),
		processData:false,
		contentType:"application/json",
		success : function(da) { // true
			console.log(da);

		},
		error : function(d) {
			console.log(d);

		}
	});
}


function deleteq(id,data) {
	
	Swal.fire({
		  title: '¿Esta seguro de querer eliminar la contraparte?',
		  text: "",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Aceptar'
		}).then((result) => {
		  if (result.value) {
				$.ajax({
					async : true,
					url : urlGlobal+'/limiteslineas/'+id,
					type : 'delete',// POST,PUT,DELETE,GET,PATCH
					dataType: 'json',
					headers: {'Authorization':token},
					processData:false,
					contentType:"application/json",
					success : function(da) { // true
						console.log(da);
						
					},
					error : function(d) {
						console.log(d);
						
						myTable2.row( $(data).parents('tr') ).remove().draw();
						Swal.fire('La contraparte se elimino correctamente','','success')
					}
				});
		  }
		})

}




function getLista(tipo,divisaValor) {
	
	

	if(tipo=="contraparte"){
		tipoEnvio=0;
	}else{
		tipoEnvio=1;
	}
	
	$.ajax({
		async : true,
		url : urlGlobal+'/limiteslineas/lista/'+tipoEnvio,
		type : 'get',// POST,PUT,DELETE,GET,PATCH
		dataType: 'json',
		headers: {'Authorization':token},
		processData:false,
		contentType:"application/json",
		success : function(da) { // true
			//console.log(da);
			
			//console.log(divisaValor);
			
			$("#conteTable").empty()
			
			if(tipo == "contraparte"){
				
				$("#conteTable").append('<table class="table table-striped" id="limites" >'+
						'<thead>'+ 
							'<tr>'+
								'<th>contraparte</th>'+
								'<th>Limite Global</th>'+
								'<th>Límite Operaciones Directo</th>'+
								'<th>Límite Operaciones en Reporto</th>'+
								'<th>Límite por Operción</th>'+
								'<th>Límite Mercado de Cambios</th>'+
								'<th>Límite por Operción Mercado de Cambios</th>'+
								'<th></th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="tableLimites">'+
							
						'</tbody>'+
					'</table>');
				for (var i = 0; i < da.length; i++) {
					
					var globalLimitConverted=((parseFloat(da[i]['globalLimit']))* (parseFloat(divisaValor)))/1;
					
					var directOperationLimit=((parseFloat(da[i]['directOperationLimit']))* (parseFloat(divisaValor)))/1;
					var reportoOperationLimit=((parseFloat(da[i]['reportoOperationLimit']))* (parseFloat(divisaValor)))/1;
					var operationLimitMoneyMarket=((parseFloat(da[i]['operationLimitMoneyMarket']))* (parseFloat(divisaValor)))/1;
					var exchangeMarketLimit=((parseFloat(da[i]['exchangeMarketLimit']))* (parseFloat(divisaValor)))/1;
					var limitOperationExchangeMarket=((parseFloat(da[i]['limitOperationExchangeMarket']))* (parseFloat(divisaValor)))/1;

					
					$("#tableLimites").append('<tr  id="'+da[i]['contraparte']+'">'+
						'<td>'+da[i]['contraparte']+'</td>'+
						
						'<td>'+globalLimitConverted.toFixed(2)+'</td>'+
						'<td>'+directOperationLimit.toFixed(2)+'</td>'+
						'<td>'+reportoOperationLimit.toFixed(2)+'</td>'+
						'<td>'+operationLimitMoneyMarket.toFixed(2)+'</td>'+
						'<td>'+exchangeMarketLimit.toFixed(2)+'</td>'+
						'<td>'+limitOperationExchangeMarket.toFixed(2)+'</td>'+
						
						
						 "<td><a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteq('"+da[i]['contraparte']+"',this)\">Eliminar</a></td>"+

					'</tr>');
					
					
					
				}
				
				
				
				
			}else{
				
				$("#conteTable").append('<table class="table table-striped" id="limites" >'+
						'<thead>'+ 
							'<tr>'+
								'<th>operador</th>'+
								'<th>Limite Global</th>'+
								'<th>Límite Operaciones Directo</th>'+
								'<th>Límite Operaciones en Reporto</th>'+
								'<th>Límite por Operción</th>'+
								'<th>Límite Mercado de Cambios</th>'+
								'<th>Límite por Operción Mercado de Cambios</th>'+
								'<th></th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="tableLimites">'+
							
						'</tbody>'+
					'</table>');
				for (var i = 0; i < da.length; i++) {
					
					var globalLimitConverted=((parseFloat(da[i]['globalLimit']))* (parseFloat(divisaValor)))/1;
					
					var directOperationLimit=((parseFloat(da[i]['directOperationLimit']))* (parseFloat(divisaValor)))/1;
					var reportoOperationLimit=((parseFloat(da[i]['reportoOperationLimit']))* (parseFloat(divisaValor)))/1;
					var operationLimitMoneyMarket=((parseFloat(da[i]['operationLimitMoneyMarket']))* (parseFloat(divisaValor)))/1;
					var exchangeMarketLimit=((parseFloat(da[i]['exchangeMarketLimit']))* (parseFloat(divisaValor)))/1;
					var limitOperationExchangeMarket=((parseFloat(da[i]['limitOperationExchangeMarket']))* (parseFloat(divisaValor)))/1;

					
					$("#tableLimites").append('<tr  id="'+da[i]['contraparte']+'">'+
						'<td>'+da[i]['contraparte']+'</td>'+
						
						'<td>'+globalLimitConverted.toFixed(2)+'</td>'+
						'<td>'+directOperationLimit.toFixed(2)+'</td>'+
						'<td>'+reportoOperationLimit.toFixed(2)+'</td>'+
						'<td>'+operationLimitMoneyMarket.toFixed(2)+'</td>'+
						'<td>'+exchangeMarketLimit.toFixed(2)+'</td>'+
						'<td>'+limitOperationExchangeMarket.toFixed(2)+'</td>'+
						
						
						 "<td><a class=\"btn btn-danger btn-xs\" style=\"color: white\" onclick=\"deleteq('"+da[i]['contraparte']+"',this)\">Eliminar</a></td>"+

					'</tr>');
					
					
					
				}
				
				
				
				
			}
			
			
			
			myTable2 = $('#limites')
			.DataTable(
					{
						responsive : true,
						"ordering" : true,
						"info" : false,
						"displayLength" : 50,
						"lengthMenu" : [ 50, 100, 150, 200,
								250, 300 ],
						"order" : [ [ 7, "desc" ] ],

						"language" : {
							"sProcessing" : "Procesando...",
							"sLengthMenu" : "Mostrar MENU registros",
							"sZeroRecords" : "No se encontraron resultados",
							"sEmptyTable" : "Ningún dato disponible en esta tabla",
							"sInfo" : "Mostrando registros del START al END de un total de TOTAL registros",
							"sInfoEmpty" : "Mostrando registros del 0 al 0 de un total de 0 registros",
							"sInfoFiltered" : "(filtrado de un total de MAX registros)",
							"sInfoPostFix" : "",
							"sSearch" : "Buscar:",
							"sUrl" : "",
							"sInfoThousands" : ",",
							"sLoadingRecords" : "Cargando...",
							"oPaginate" : {
								"sFirst" : "Primero",
								"sLast" : "Último",
								"sNext" : "Siguiente",
								"sPrevious" : "Anterior"

							},
							"oAria" : {
								"sSortAscending" : ": Activar para ordenar la columna de manera ascendente",
								"sSortDescending" : ": Activar para ordenar la columna de manera descendente"
							}
						}
					});

	myTable2.MakeCellsEditable({
		"onUpdate" : myCallbackFunction2,
		"inputCss" : 'form-control',
		"columns" : [1,2,3,4,5,6],
		"allowNulls" : {
			"columns" : [ 3 ],
			"errorClass" : 'error'
		},
		"confirmationButton" : { // could also be true
			"confirmCss" : 'my-confirm-class',
			"cancelCss" : 'my-cancel-class'
		},
		"inputTypes" : [ {
			"column" : 4,
			"type" : "number",
			"options" : null
		},

		// Nothing specified for column 3 so it will default to
		// text

		]
	});

	
	$("#spinner").fadeOut();
			
		},
		error : function(d) {
			console.log(d);
			
				}
	});
}




function cambio() {
	$("#spinner").fadeIn();

	var tipo = $("#selectTipo").val()	
	cambioDivisasMethod(tipo)
	

	
	
}

function cambioDivisa() {
	$("#spinner").fadeIn();
	var tipo = $("#selectTipo").val()
	cambioDivisasMethod(tipo)
	
	
}


var divisaGlobal="";

function cambioDivisasMethod(tipo){
	var tipoDivisas = $("#selectDivisas").val()
	var divisaValor = "";
	console.log("metodo onload")

	$.ajax({
		async : true,
		url : urlGlobal+'/divisas/listadv/'+tipoDivisas,
		type : 'get',// POST,PUT,DELETE,GET,PATCH
		dataType: 'json',
		headers: {'Authorization':token},
		processData:false,
		contentType:"application/json",
		success : function(da) { // true
			console.log(da);
			
			if(tipoDivisas=="MXN"){
				divisaValor="1"
			}else if(tipoDivisas=="US"){
				divisaValor="0.053"
			}
			
			divisaGlobal=divisaValor;
			getLista(tipo,divisaValor)
			
		},
		error : function(d) {
			console.log(d);
			
				}
	});
	
	
			
}


