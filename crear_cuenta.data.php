<?php
	include_once("cuenta.class.php");
  	$cuenta = new cuenta();

	$cuenta->setidcliente($_POST['cta_id_cte']);
	$cuenta->settipo_cuenta($_POST['cta_tipo_cuenta']);

	echo $cuenta->asignar_cuenta();
?>