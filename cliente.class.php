<?php
include_once ('dataLayer.class.php');

class cliente
{
    private $id = 0;
    private $nombre = "";
    private $documento = 0;
    private $direccion = "";
    private $fecha_nacimiento = "";

    public function setidcliente($int_id)
    { $this->id = $int_id; }

    public function setnombre($str_nombre)
    { $this->nombre = $str_nombre; }

    public function setdocumento($int_documento)
    { $this->documento = $int_documento; }

    public function setdireccion($str_direccion)
    { $this->direccion = $str_direccion; }

    public function setfechanacimiento($str_fecha_nacimiento)
    { $this->fecha_nacimiento = $str_fecha_nacimiento; }


    /*......................................................................................*/
    /*                                                                            INSERT    */
    /*......................................................................................*/
    
    /* crea un cliente */
    function crear_cliente(){
        if($this->nombre == "")
            throw new Exception('Debe especificar el nombre del cliente');

        if($this->documento == 0)
            throw new Exception('Debe especificar el documento del cliente');

        if($this->direccion == "")
            throw new Exception('Debe especificar la dirección del cliente');

        if($this->fecha_nacimiento == "")
            throw new Exception('Debe especificar la fecha de cliente');

        $insert = " INSERT INTO cliente(
                                cte_nombre,
                                cte_documento,
                                cte_direccion,
                                cte_fecha_nacimiento)
                    VALUES  (   '$this->nombre',
                                $this->documento,
                                '$this->direccion',
                                '$this->fecha_nacimiento')  ";

        $conex=dataLayer::getInstance();
        return $conex->ejecutar( $insert,"crear_cliente" );
    }

    /*......................................................................................*/
    /*                                                                            SELECT    */
    /*......................................................................................*/

    /* consulta el listado de clientes */
    function consultar_clientes(){
        $consulta_art = "   SELECT  *,
                                    ( SELECT cta_id FROM cuenta WHERE cuenta.cta_cliente = cliente.cte_id LIMIT 1) AS cuenta
                            FROM cliente ";

        $conex=dataLayer::getInstance();
        return $conex->combo_assoc( $consulta_art,"consultar_clientes" );
    }
}

?>