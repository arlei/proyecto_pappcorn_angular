<?php
	include_once("cuenta.class.php");
	$cuenta = new cuenta();
	$cuentas = $cuenta->consultar_cuentas();
	echo json_encode($cuentas);
	// print_r(json_encode($cuentas));
?>