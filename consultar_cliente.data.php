<?php
	include_once("cliente.class.php");
	$cliente = new cliente();
	$clientes = $cliente->consultar_clientes();
	echo json_encode($clientes);
?>