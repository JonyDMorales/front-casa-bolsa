

	var token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQaGlJbnZlc3RtZW50Q2FwaXRhbCIsImlhdCI6MTU4NDY2OTI4NiwiZXhwIjoxNTg0NzQ4ODAwLCJuYmYiOjE1ODQ2NjkyODYsImp0aSI6IjVlNzQyMjY2NjhhZjgiLCJzdWIiOjEsInVzciI6eyJpZF91c3VhcmlvcyI6MSwiaWRfem9uYXNfaG9yYXJpYXMiOjQ5LCJub21icmUiOiJNYW5saW8iLCJhcGVsbGlkbyI6IlRlcmFuIiwiY29ycmVvIjoibWFubGlvZWxudW0xQGhvdG1haWwuY29tIiwiY2FyZ28iOiJNYW5hZ2VyIiwidGVsZWZvbm9fZmlqbyI6IjU2NzEzMTc0NSIsImNlbHVsYXIiOiI1NTEwODAwMjkxIiwiY3JlYXRlZF9hdCI6IjIwMTktMTAtMTYgMjA6NDg6MzAiLCJ1cGRhdGVkX2F0IjoiMjAxOS0xMC0xMSAwODozODozOSIsImRuaV9udW0iOiIyMzQzMjQzMjQiLCJzZWd1cm9fc29jaWFsIjoiMzQ1NDM1NDM1IiwiZm90b19iYXNlNjQiOiIiLCJwYXNzIjoiOGU5NmJkMDJmYmNiMDU0Y2NhMTFjZjhkZWIwMzE1NjJiOWFhZWRkODNmODNmZjdhYmY3YzNmYTc4N2FkOWJiZCJ9LCJwZXJtaXNvcyI6WzFdfQ.HwXLsjz7oPJKHEHLeUR0Trr86N1a2qwTyi-gVWZdBAk';
	var urlGlobal = 'http://localhost:8081';





function getProductoLimitesmd() {

  var selectPorcentajePre=$("#porcentajeSelect").val();
  var selectPorcentajeSplit=selectPorcentajePre.split("&");
  var selectPorcentaje=selectPorcentajeSplit[0];
  var selectPorcentajeValor=selectPorcentajeSplit[1];
  console.log(selectPorcentaje)

		$.ajax({
		async : true,
		url : urlGlobal+'/logaritmo/mesaDinero/',
		type : 'GET',// POST,PUT,DELETE,GET,PATCH
		dataType: 'json',
		headers: {'Authorization':token},
		processData:false,
		contentType:"application/json",
		success : function(da) { // true
			console.log(da);

			if(da.length>0){

				var html="";
				var html2="";


				html+='<table class="table">'
				  html+='<thead class="thead-light">'
				    html+='<tr>'
				      html+='<th scope="col">#</th>'
				      html+='<th scope="col">Producto</th>'
				      html+='<th scope="col">Valor libros</th>'
				      html+='<th scope="col">'+selectPorcentaje+'%</th>'
				      html+='<th scope="col">limite</th>'
				      html+='<th scope="col">var-limite</th>'
				    html+='</tr>'
				  html+='</thead>'
				  html+='<tbody>'

				  var porcentajeValues = ["2", "1", "3"];
				  var sumaLimites=0;
				  var sumaLibros=0;

				for (var i = 0; i < da.length; i++) {

					var calculoTempoLimite=(da[i]['limite']) - (porcentajeValues[i])

					     html+='<tr>'
					      html+=' <th scope="row">'+(i+1)+'</th>'
					       html+='<td>'+da[i]['issue']+'</td>'
					       html+='<td>'+da[i]['multi']+'</td>'
					       html+='<td>'+porcentajeValues[i]+'</td>'
					       html+='<td>'+da[i]['limite']+'</td>'

					       if(calculoTempoLimite<0){
					       	html+='<td style="color:red;">'+calculoTempoLimite+'</td>'
					       }else{
					       	html+='<td style="color:green;">'+calculoTempoLimite+'</td>'
					       }

					     html+='</tr>'

					     sumaLimites += da[i]['limite'];
					     sumaLibros += da[i]['multi'];
					
				}

				html+='</tbody>'
				 html+='</table>'





				html2+='<table class="table">'
				  html2+='<thead class="thead-light">'
				    html2+='<tr>'
				      html2+='<th scope="col">Valor libros</th>'
				      html2+='<th scope="col">Var MD</th>'
				      html2+='<th scope="col">limite Var</th>'
				      html2+='<th scope="col">Var-lm</th>'
				    html2+='</tr>'
				  html2+='</thead>'
				  html2+='<tbody>'

				  var sumaVarLm=(sumaLimites)-(selectPorcentajeValor);
				  	    html2+='<tr>'
					       html2+='<td>'+sumaLibros+'</td>'
					       html2+='<td>'+selectPorcentajeValor+'</td>'
					       html2+='<td>'+sumaLimites+'</td>'

					       if(sumaVarLm<0){
							html2+='<td style="color:red;">'+sumaVarLm+'</td>'
					       }else{
							html2+='<td style="color:green;">'+sumaVarLm+'</td>'
					       }
					       
					     html2+='</tr>'

				 html2+='</tbody>'
				 html2+='</table>'
	     


				 document.getElementById("tableFirst").innerHTML = html;
				 document.getElementById("tableSecond").innerHTML = html2;

				 	$("#spinner").fadeOut();
			}


		},
		error : function(d) {
			console.log(d);
		}
	});
}