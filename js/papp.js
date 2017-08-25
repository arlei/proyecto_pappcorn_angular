
// CLIENTE

function consultar_clientes(){
	html = '<div class="col-lg-12 text-center"> <img src="imagenes/carga.gif"/> </div>'
	$("#contenido_principal").html(html);

	$.ajax({
		data: "",
		type: "POST",
		dataType: "json",
		url: "consultar_cliente.data.php",
		success: function(data){
			
			var html = '';
			
			if(data.length > 0){
				html = '<div class="col-lg-12 text-center titulo_listado_cte"><h4>listado de clientes</h4></div>'
				html = html + '	<table class="table table-striped">';
				html = html + '		<thead>';
				html = html + '			<tr>';
				html = html + '				<th width="5%">';
				html = html + '					Id';
				html = html + '				</th>';
				html = html + '				<th width="25%">';
				html = html + '					Nombre';
				html = html + '				</th>';
				html = html + '				<th width="10%">';
				html = html + '					Documento';
				html = html + '				</th>';
				html = html + '				<th width="15%">';
				html = html + '					Dirección';
				html = html + '				</th>';
				html = html + '				<th width="20%">';
				html = html + '					Fecha de nacimiento';
				html = html + '				</th>';
				html = html + '				<th width="5%">';
				html = html + '					Cuenta';
				html = html + '				</th>';
				html = html + '			</tr>';
				html = html + '		</thead>';
				
				html = html + '	<tbody>';

				$.each(data, function(i,item){

					html = html + '		<tr>';
					html = html + '			<td>';
					html = html + '				'+item.cte_id
					html = html + '			</td>';
					html = html + '			<td>';
					html = html + '				'+item.cte_nombre
					html = html + '			</td>';
					html = html + '			<td>';
					html = html + '				'+item.cte_documento
					html = html + '			</td>';
					html = html + '			<td>';
					html = html + '				'+item.cte_direccion
					html = html + '			</td>';
					html = html + '			<td>';
					html = html + '				'+item.cte_fecha_nacimiento
					html = html + '			</td>';
					html = html + '			<td>';

					if( item.cuenta != null )
						html = html + '			'+item.cuenta
					else
						html = html + '			<button class="btn_agregar_cta_cte" data-toggle="modal" data-target="#modal_cuenta" onClick="cargar_form_cta('+item.cte_id+',\''+item.cte_nombre+'\');">+</button>'

					html = html + '			</td>';
					html = html + '		</tr>';

				});

				html = html + '	</tbody>';

				html = html + '</table>';
			}
			else{
				html = '<div class="col-lg-12 text-center"> No se encontraron registros </div>'
			}

			html = html + '<button class="btn_agregar_cte col-lg-12 text-center" data-toggle="modal" data-target="#modal_cliente" onClick="limpiar_form_cte();">+</button>'

			$("#contenido_principal").html(html);
		},
		error: function(){
			alert("error");
		}
	});
}

function crear_cliente(){
	var cte_nombre = document.getElementById("cte_nombre").value;
	var cte_documento = document.getElementById("cte_documento").value;
	var cte_direccion = document.getElementById("cte_direccion").value;
	var cte_fecha_nacimiento = document.getElementById("cte_fecha_nacimiento").value;
	var valida = 0;
	var formdata = false;
		
	if(window.FormData)	
		formdata = new FormData();

	if (cte_fecha_nacimiento == ""){
		document.getElementsByName("cte_fecha_nacimiento")[0].focus();
		$("#valida_cte_fecha_nacimiento").html("");
	    $("#valida_cte_fecha_nacimiento").append("Escriba la feche de nacimiento.");
	    $("#valida_cte_fecha_nacimiento").show();
	    valida = 1;
	}
	else
		$("#valida_cte_fecha_nacimiento").hide();

	if (cte_direccion == ""){
		document.getElementsByName("cte_direccion")[0].focus();
		$("#valida_cte_direccion").html("");
	    $("#valida_cte_direccion").append("Escriba la dirección.");
	    $("#valida_cte_direccion").show();
	    valida = 1;
	}
	else
		$("#valida_cte_direccion").hide();

	if (cte_documento == ""){
		document.getElementsByName("cte_documento")[0].focus();
		$("#valida_cte_documento").html("");
	    $("#valida_cte_documento").append("Escriba el documento.");
	    $("#valida_cte_documento").show();
	    valida = 1;
	}
	else
		$("#valida_cte_documento").hide();

	if (cte_nombre == ""){
		document.getElementsByName("cte_nombre")[0].focus();
		$("#valida_cte_nombre").html("");
	    $("#valida_cte_nombre").append("Escriba el nombre.");
	    $("#valida_cte_nombre").show();
	    valida = 1;
	}
	else
		$("#valida_cte_nombre").hide();

	if (valida == 0){
		
		//se agregan los demás parámetros
		formdata.append('cte_nombre', cte_nombre);
		formdata.append('cte_documento', cte_documento);
		formdata.append('cte_direccion', cte_direccion);
		formdata.append('cte_fecha_nacimiento', cte_fecha_nacimiento);
		
		$.ajax({
    		type: "POST",
    		url: "crear_cliente.data.php",
			processData : false, 
			contentType : false,
			data: formdata,
    		success: function(data){
				//se comprueba los datos que retorna el php
					// alert(data);
				//fin comprobar datos

				if(data==1){
					document.getElementById("btn_crear_cte").disabled = true;

					$("#valida_cte").html("");
	    			$("#valida_cte").append("<div class='alert alert-success'>Se creó correctamente el cliente.</div>");
	    			$("#valida_cte").show();

	    			consultar_clientes();
				}
				else{
					$("#valida_cte").html("");
	    			$("#valida_cte").append("<div class='alert alert-danger'>Ocurrió un error al crear el cliente.</div>");
	    			$("#valida_cte").show();
				}
			},
			error: function(){
				alert("Error al procesar la información.");
			}
		});
		return false;
	}
}

function limpiar_form_cte(){
	document.getElementById("cte_nombre").value = "";
	document.getElementById("cte_documento").value = "";
	document.getElementById("cte_direccion").value = "";
	document.getElementById("cte_fecha_nacimiento").value = "";

	$("#valida_cte").html("");
	$("#valida_cte").hide();
	$("#valida_cte_fecha_nacimiento").html("");
	$("#valida_cte_fecha_nacimiento").hide();
	$("#valida_cte_direccion").html("");
	$("#valida_cte_direccion").hide();
	$("#valida_cte_documento").html("");
	$("#valida_cte_documento").hide();
	$("#valida_cte_nombre").html("");
	$("#valida_cte_nombre").hide();

	document.getElementById("btn_crear_cte").disabled = false;

	document.getElementsByName("cte_nombre")[0].focus();
}

// CUENTA

function consultar_cuentas(){
	html = '<div class="col-lg-12 text-center"> <img src="imagenes/carga.gif"/> </div>'
	$("#contenido_principal").html(html);

	$.ajax({
		data: "",
		type: "POST",
		dataType: "json",
		url: "consultar_cuenta.data.php",
		success: function(data){
			
			var html = '';
			
			if(data.length > 0){
				html = '<div class="col-lg-12 text-center titulo_listado_cta"><h4>listado de cuentas</h4></div>'
				html = html + '	<table class="table table-striped">';
				html = html + '		<thead>';
				html = html + '			<tr>';
				html = html + '				<th width="5%">';
				html = html + '					Id';
				html = html + '				</th>';
				html = html + '				<th width="40%">';
				html = html + '					Cliente';
				html = html + '				</th>';
				html = html + '				<th width="15%">';
				html = html + '					Tipo de cuenta';
				html = html + '				</th>';
				html = html + '				<th width="15%">';
				html = html + '					Saldo';
				html = html + '				</th>';
				html = html + '				<th width="25%">';
				html = html + '					Tarjeta';
				html = html + '				</th>';
				html = html + '			</tr>';
				html = html + '		</thead>';
				
				html = html + '	<tbody>';

				$.each(data, function(i,item){

					entradas = item.entradas;
					salidas = item.salidas;
					monto = entradas - salidas;

					html = html + '		<tr>';
					html = html + '			<td>';
					html = html + '				'+item.cta_id
					html = html + '			</td>';
					html = html + '			<td>';
					html = html + '				'+item.cte_nombre
					html = html + '			</td>';
					html = html + '			<td>';
					html = html + '				'+item.ctp_nombre
					html = html + '			</td>';
					html = html + '			<td>';
					html = html + '				'+monto
					html = html + '			</td>';
					html = html + '			<td>';

					if( item.tarjeta != null )
						html = html + '			'+item.tarjeta
					else
						html = html + '			<button class="btn_agregar_tja_cta" data-toggle="modal" data-target="#modal_tarjeta" onClick="cargar_form_tja('+item.cta_id+');">+</button>'

					html = html + '			</td>';
					html = html + '		</tr>';

				});

				html = html + '	</tbody>';

				html = html + '</table>';
			}
			else{
				html = '<div class="col-lg-12 text-center"> No se encontraron registros </div>'
			}

			$("#contenido_principal").html(html);
		},
		error: function(){
			alert("error");
		}
	});
}

function asignar_cuenta(){
	var cta_id_cte = document.getElementById("cta_id_cte").value;
	var cta_tipo_cuenta = document.getElementById("cta_tipo_cuenta").options[document.getElementById("cta_tipo_cuenta").selectedIndex].value;
	var valida = 0;
	var formdata = false;
		
	if(window.FormData)	
		formdata = new FormData();
		
	//se agregan los demás parámetros
	formdata.append('cta_id_cte', cta_id_cte);
	formdata.append('cta_tipo_cuenta', cta_tipo_cuenta);
	
	$.ajax({
		type: "POST",
		url: "crear_cuenta.data.php",
		processData : false, 
		contentType : false,
		data: formdata,
		success: function(data){
			//se comprueba los datos que retorna el php
				// alert(data);
			//fin comprobar datos

			if(data==1){
				document.getElementById("btn_crear_cta").disabled = true;

				$("#valida_cta").html("");
    			$("#valida_cta").append("<div class='alert alert-success'>Se asignó correctamente la cuenta.</div>");
    			$("#valida_cta").show();

    			consultar_clientes();
			}
			else{
				$("#valida_cta").html("");
    			$("#valida_cta").append("<div class='alert alert-danger'>Ocurrió un error al asignar la cuenta.</div>");
    			$("#valida_cta").show();
			}
		},
		error: function(){
			alert("Error al procesar la información.");
		}
	});
	return false;
}

function cargar_form_cta(cta_id_cte, cta_nombre_cte){
	document.getElementById("cta_id_cte").value = cta_id_cte;
	document.getElementById("cta_nombre_cte").value = cta_nombre_cte;
	document.getElementById("btn_crear_cta").disabled = false;

	$("#valida_cta").html("");
	$("#valida_cta").hide();
}

// TARJETA

function asignar_tarjeta(){
	var tja_id_cta = document.getElementById("tja_id_cta").value;
	var valida = 0;
	var formdata = false;
		
	if(window.FormData)	
		formdata = new FormData();
		
	//se agregan los demás parámetros
	formdata.append('tja_id_cta', tja_id_cta);
	
	$.ajax({
		type: "POST",
		url: "crear_tarjeta.data.php",
		processData : false, 
		contentType : false,
		data: formdata,
		success: function(data){
			//se comprueba los datos que retorna el php
				// alert(data);
			//fin comprobar datos

			if(data==1){
				document.getElementById("btn_crear_tja").disabled = true;

				$("#valida_tja").html("");
    			$("#valida_tja").append("<div class='alert alert-success'>Se asignó correctamente la tarjeta.</div>");
    			$("#valida_tja").show();

    			consultar_cuentas();
			}
			else{
				$("#valida_tja").html("");
    			$("#valida_tja").append("<div class='alert alert-danger'>Ocurrió un error al asignar la tarjeta.</div>");
    			$("#valida_tja").show();
			}
		},
		error: function(){
			alert("Error al procesar la información.");
		}
	});
	return false;
}

function cargar_form_tja(tja_id_cta){
	document.getElementById("tja_id_cta").value = tja_id_cta;
	document.getElementById("btn_crear_tja").disabled = false;

	$("#valida_tja").html("");
	$("#valida_tja").hide();
}

// TRANSACCIÓN

function realizar_transaccion(){
	var trs_cuenta_1 = document.getElementById("trs_cuenta_1").options[document.getElementById("trs_cuenta_1").selectedIndex].value;
	var trs_tipo = document.getElementById("trs_tipo").options[document.getElementById("trs_tipo").selectedIndex].value;
	var trs_cuenta_2 = document.getElementById("trs_cuenta_2").options[document.getElementById("trs_cuenta_2").selectedIndex].value;
	var trs_monto = document.getElementById("trs_monto").value;
	var valida = 0;
	var formdata = false;
		
	if(window.FormData)	
		formdata = new FormData();
	
	if (trs_monto == ""){
		document.getElementsByName("trs_monto")[0].focus();
		$("#valida_trs_monto").html("");
	    $("#valida_trs_monto").append("Escriba el monto de la transacción.");
	    $("#valida_trs_monto").show();
	    valida = 1;
	}
	else
		$("#valida_trs_monto").hide();

	if (valida == 0){

		//se agregan los demás parámetros
		formdata.append('trs_cuenta_1', trs_cuenta_1);
		formdata.append('trs_cuenta_2', trs_cuenta_2);
		formdata.append('trs_tipo', trs_tipo);
		formdata.append('trs_monto', trs_monto);
		
		$.ajax({
			type: "POST",
			url: "crear_transaccion.data.php",
			processData : false, 
			contentType : false,
			data: formdata,
			success: function(data){
				//se comprueba los datos que retorna el php
					alert(data);
				//fin comprobar datos

				if(data==1){
					document.getElementById("btn_realizar_trs").disabled = true;

					$("#valida_trs").html("");
	    			$("#valida_trs").append("<div class='alert alert-success'>La transacción se realizó correctamente.</div>");
	    			$("#valida_trs").show();

	    			consultar_cuentas();
				}
				else{
					$("#valida_trs").html("");
	    			$("#valida_trs").append("<div class='alert alert-danger'>Ocurrió un error al realizar la transacción.</div>");
	    			$("#valida_trs").show();
				}
			},
			error: function(){
				alert("Error al procesar la información.");
			}
		});
		return false;
	}
}

function cargar_transaccion(){

	$.ajax({
		data: "",
		type: "POST",
		dataType: "json",
		url: "consultar_cuenta.data.php",
		success: function(data){
			
			var html = '';
			
			if(data.length > 0){

				$.each(data, function(i,item){
					if(item.tarjeta!=null)
						html = html + '		<option value="'+item.cta_id+'">'+item.tarjeta+'</option>';
				});
			}

			$("#trs_cuenta_1").html(html);
			$("#trs_cuenta_2").html(html);
		},
		error: function(){
			alert("error");
		}
	});

	$("#valida_trs").html("");
	$("#valida_trs").hide();

	document.getElementById("btn_realizar_trs").disabled = false;
	document.getElementById("trs_monto").value = "";
}

function sel_transaccion(){
	var trs_tipo = document.getElementById("trs_tipo").options[document.getElementById("trs_tipo").selectedIndex].value;
	
	if(trs_tipo!=1)
		$("#trs_cuenta_2").hide();
	else
		$("#trs_cuenta_2").show();
}
