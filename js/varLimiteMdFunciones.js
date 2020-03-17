

	var token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQaGlJbnZlc3RtZW50Q2FwaXRhbCIsImlhdCI6MTU4NDQ4MTA1OSwiZXhwIjoxNTg0NDg5NjAwLCJuYmYiOjE1ODQ0ODEwNTksImp0aSI6IjVlNzE0MzIzMDg4YzEiLCJzdWIiOjEsInVzciI6eyJpZF91c3VhcmlvcyI6MSwiaWRfem9uYXNfaG9yYXJpYXMiOjQ5LCJub21icmUiOiJNYW5saW8iLCJhcGVsbGlkbyI6IlRlcmFuIiwiY29ycmVvIjoibWFubGlvZWxudW0xQGhvdG1haWwuY29tIiwiY2FyZ28iOiJNYW5hZ2VyIiwidGVsZWZvbm9fZmlqbyI6IjU2NzEzMTc0NSIsImNlbHVsYXIiOiI1NTEwODAwMjkxIiwiY3JlYXRlZF9hdCI6IjIwMTktMTAtMTYgMjA6NDg6MzAiLCJ1cGRhdGVkX2F0IjoiMjAxOS0xMC0xMSAwODozODozOSIsImRuaV9udW0iOiIyMzQzMjQzMjQiLCJzZWd1cm9fc29jaWFsIjoiMzQ1NDM1NDM1IiwiZm90b19iYXNlNjQiOiIiLCJwYXNzIjoiOGU5NmJkMDJmYmNiMDU0Y2NhMTFjZjhkZWIwMzE1NjJiOWFhZWRkODNmODNmZjdhYmY3YzNmYTc4N2FkOWJiZCJ9LCJwZXJtaXNvcyI6WzFdfQ.ULSigD0YaGXRriYixn4Egrc7Rj5BWuP3J_bZio7tz6k';
	var urlGlobal = 'http://localhost:8081';





function getProductoLimitesmd() {

  var selectPorcentaje=$("#porcentajeSelect").val();
  console.log(selectPorcentaje)

		$.ajax({
		async : true,
		url : urlGlobal+'/logaritmo/mesaDinero/',
		type : 'GET',// POST,PUT,DELETE,GET,PATCH
		dataType: 'json',
		headers: {'Autorization':token},
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