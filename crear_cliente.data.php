<?php
	include_once("cliente.class.php");
  	$cliente = new cliente();

	$cliente->setnombre($_POST['cte_nombre']);
	$cliente->setdocumento($_POST['cte_documento']);
	$cliente->setdireccion($_POST['cte_direccion']);
	$cliente->setfechanacimiento($_POST['cte_fecha_nacimiento']);
	
	echo $cliente->crear_cliente();
?>