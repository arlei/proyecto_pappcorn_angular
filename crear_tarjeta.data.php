<?php
	include_once("cuenta.class.php");
  	$cuenta = new cuenta();

	$cuenta->setidcuenta($_POST['tja_id_cta']);

	echo $cuenta->asignar_tarjeta();
?>