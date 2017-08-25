<?php
	function error($funcion,$texto){
		$file_log = fopen('error.log','a');
		fwrite($file_log,"[".date("r")."] Error en $funcion: $texto".PHP_EOL);
		fclose($file_log);
	}
?>