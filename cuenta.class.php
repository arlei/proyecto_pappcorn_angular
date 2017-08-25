<?php
include_once ('dataLayer.class.php');

class cuenta
{
    private $id = 0;
    private $id_cliente = 0;
    private $tipo_cuenta = 0;

    public function setidcuenta($int_idcuenta)
    { $this->id = $int_idcuenta; }

    public function setidcliente($int_idcliente)
    { $this->id_cliente = $int_idcliente; }

    public function settipo_cuenta($int_tipo_cuenta)
    { $this->tipo_cuenta = $int_tipo_cuenta; }


    /*......................................................................................*/
    /*                                                                            INSERT    */
    /*......................................................................................*/
    
    /* asigna una cuenta al cliente */
    function asignar_cuenta(){
        if($this->id_cliente == 0)
            throw new Exception('Debe especificar el cliente');

        if($this->tipo_cuenta == 0)
            throw new Exception('Debe especificar el tipo de cuenta');

        $insert = " INSERT INTO cuenta(
                                cta_cliente,
                                cta_tipo)
                    VALUES  (   $this->id_cliente,
                                $this->tipo_cuenta)  ";

        $conex=dataLayer::getInstance();
        return $conex->ejecutar( $insert,"crear_cuenta" );
    }

    /* asignar tarjeta debito */
    function asignar_tarjeta(){
        if($this->id == 0)
            throw new Exception('Debe especificar la cuenta');
        
        $untd = "1111-2345-5678-121";

        while ( $this->consultar_numero_tarjeta_debito($untd) == true ) {
            $untd = rand(0000, 9999)."-".rand(0000, 9999)."-".rand(0000, 9999)."-".rand(0000, 9999);
        }

        $insert = " INSERT INTO tarjeta_debito(
                                tjd_numero,
                                tjd_cuenta)
                    VALUES  ('$untd'
                            ,$this->id)  ";

        $conex=dataLayer::getInstance();
        return $conex->ejecutar( $insert,"asignar_tarjeta" );
    }
    
    /* realiza una transacción / transacción : 1 = transferencia, 2 = consignación, 3 = retiro */
    function transaccion($id_cuenta_transferir, $monto, $transaccion){
        $respuesta = false;

        if($this->id == 0)
            throw new Exception('Debe especificar la cuenta');

        if($id_cuenta_transferir == 0)
            throw new Exception('Debe especificar la cuenta de la transacción');

        if($monto <= 0)
            throw new Exception('Debe especificar el monto a transferir');

        if ($transaccion == 1) {
            $update = " INSERT INTO     cuenta_transaccion (
                                        ctr_cuenta,
                                        ctr_tipo_transaccion,
                                        ctr_cuenta_transaccion,
                                        ctr_monto)
                        VALUES  (
                                        $this->id,
                                        2,
                                        $id_cuenta_transferir,
                                        $monto
                                ),
                                (
                                        $id_cuenta_transferir,
                                        1,
                                        $this->id,
                                        $monto
                                ) ";
        }
        else{
            if($transaccion==2)
                $tipo_transaccion = 1;
            elseif($transaccion==3)
                $tipo_transaccion = 2;

            $update = " INSERT INTO     cuenta_transaccion (
                                            ctr_cuenta,
                                            ctr_tipo_transaccion,
                                            ctr_cuenta_transaccion,
                                            ctr_monto)
                            VALUES  (
                                            $this->id,
                                            $tipo_transaccion,
                                            $id_cuenta_transferir,
                                            $monto
                                    ) ";
        }

        $conex=dataLayer::getInstance();
        if($update<>"")
            $resultado = $conex->ejecutar($update,"transaccion");

        return $resultado;
    }

    /*......................................................................................*/
    /*                                                                            SELECT    */
    /*......................................................................................*/

    /* consulta el listado de clientas */
    function consultar_cuentas(){
        $consulta = "   SELECT  *,
                                (   SELECT  SUM(cuenta_transaccion.ctr_monto) 
                                    FROM    cuenta_transaccion 
                                    WHERE   cuenta_transaccion.ctr_cuenta = cuenta.cta_id
                                    AND     cuenta_transaccion.ctr_tipo_transaccion = 1
                                ) as entradas,
                                (   SELECT  SUM(cuenta_transaccion.ctr_monto) 
                                    FROM    cuenta_transaccion 
                                    WHERE   cuenta_transaccion.ctr_cuenta = cuenta.cta_id
                                    AND     cuenta_transaccion.ctr_tipo_transaccion = 2
                                ) as salidas,
                                ( SELECT tjd_numero FROM tarjeta_debito WHERE tarjeta_debito.tjd_cuenta = cuenta.cta_id LIMIT 1) AS tarjeta
                        FROM cuenta 
                        INNER JOIN cliente ON cliente.cte_id = cuenta.cta_cliente
                        INNER JOIN cuenta_tipo ON cuenta_tipo.ctp_id = cuenta.cta_tipo";

        $conex=dataLayer::getInstance();
        return $conex->combo_assoc( $consulta,"consultar_cuentas" );
    }

    /* consulta los tipos de cuenta */
    function consultar_tipo_cuenta(){
        $consulta = "   SELECT *
                        FROM cuenta_tipo ";

        $conex=dataLayer::getInstance();
        return $conex->combo_assoc( $consulta,"consultar_tipo_cuenta" );
    }

    /* retorna el número de tarjeta débito que coincida */
    function consultar_numero_tarjeta_debito($num_tarjeta){
        $consulta = "   SELECT  *
                        FROM    tarjeta_debito
                        WHERE   tjd_numero = '$num_tarjeta'";

        $conex = dataLayer::getInstance();
        return $conex->combo_assoc( $consulta,"consultar_numero_tarjeta_debito" );
    }
}

?>