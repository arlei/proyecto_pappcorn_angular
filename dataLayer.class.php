<?php
include_once ("error.class.php");

class dataLayer  
{
	private $servidor;
	private $usuario;
	private $password;
	private $base_datos;
	private $link;
	private $result;
	static $_instance;
	  
	/*consturctor que establece los parámetros de la conexión*/
	private function __construct()
	{
		include ("config.sql.php");
		$this->usuario=USER;
		$this->password=PASS;
		$this->servidor=HOST;
		$this->base_datos=DB;
		$this->conectar();
	}

	/*establecer la instancia */
	public static function getInstance()
	{
		if(!(self::$_instance instanceof self))
			self::$_instance=new self();
		
		return self::$_instance;
	}

	/* Realliza la conexión a la base de datos */
	public function conectar(){
		$this->link=mysqli_connect($this->servidor, $this->usuario, $this->password) or die(error('función conectar()',mysqli_error($this->link)));
		mysqli_select_db($this->link,$this->base_datos) or die(error('función conectar()',mysqli_error($this->link)));
		@mysqli_query("SET NAMES UTF8");
	}
	
	/*metodo que devuelve en una matriz los resultados de la consulta */
	public function combo_assoc($sql,$funcion){
		mysqli_query($this->link,'SET CHARACTER SET utf8');

		$query  = mysqli_query($this->link,$sql) or die(error($funcion,mysqli_error($this->link).' | consulta: '.$sql));
		$results = array();
		while($line = mysqli_fetch_assoc($query)){
    		$results[] = $line;
		}
		return $results;
	}

	/* metodo para obtener la cantidad según sentencia sql */
	public function cantidad_registros($consulta, $funcion){
		$results = mysqli_query($this->link,$consulta)or die(error($funcion,mysqli_error($this->link).' | consulta: '.$funcion));
		
		$data=mysqli_fetch_array($results);
		return $data[0];
	}

	/*metodo para ejecutar una secuencia insert*/
	public function ejecutar($sql,$funcion){	
		mysqli_query($this->link,'SET CHARACTER SET utf8');	
		return mysqli_query($this->link, $sql) or die(error($funcion,mysqli_error($this->link).' | consulta: '.$sql));
	}

	/* metodo para obtener una fila de resultados de la sentencia sql */
	public function resultados($result)
	{
		$this->array=mysql_fetch_assoc($result) or die(mysql_error($this->link));
		return $this->array;
	}
}