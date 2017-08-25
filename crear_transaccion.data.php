<?php
	include_once("cuenta.class.php");
  	$cuenta = new cuenta();

	$cuenta->setidcuenta($_POST['trs_cuenta_1']);

	echo $cuenta->transaccion($_POST['trs_cuenta_2'],$_POST['trs_monto'],$_POST['trs_tipo']);
?>