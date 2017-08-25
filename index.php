<!DOCTYPE html>
<html>
<head>
	<!-- bootstrap css -->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" media="all">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css" media="all">

    <!-- js -->
    <script src="js/jquery.min1_12_4.js"></script>
    <script src="js/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/bootstrap-modal-carousel.min.js"></script>
    <script src="js/angular.min.js"></script>

    <!-- css -->
    <link rel="stylesheet" type="text/css" href="css/estilo.css" media="all">

	<title>Prueba PappCorn</title>
</head>
<body>
	<h1 class="text-center">BANCO PAPP</h1>
	<h3 class="text-center">administrador</h3>

	<div class="nopadding_lados text-center">
		<button class="btn_menu_cte" >clientes</button>
		<button class="btn_menu_cta" >cuentas</button>
		<button class="btn_menu_trs" >transacción +</button>
	</div>

	<main id="contenido_principal" class="text-center" ng-app="app_prueba" ng-controller="control_prueba">
		<div class="col-lg-12 text-center titulo_listado_cte"><h4>listado de clientes</h4></div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th width="5%">Id</th>
					<th width="25%">Nombre</th>
					<th width="10%">Documento</th>
					<th width="15%">Dirección</th>
					<th width="20%">Fecha de nacimiento</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="cliente in clientes">
					<td>{{ cliente.cte_id }}</td>
					<td>{{ cliente.cte_nombre }}</td>
					<td>{{ cliente.cte_documento }}</td>
					<td>{{ cliente.cte_direccion }}</td>
					<td>{{ cliente.cte_fecha_nacimiento }}</td>
				</tr>
			</tbody>
		</table>
	</main>

</body>
</html>

<script>
	var app = angular.module('app_prueba', []);

	app.controller('control_prueba', function($scope, $http) {

		get_clientes();

		function get_clientes(){  
		$http.post("consultar_cliente.data.php").then(function(respuesta){
		    $scope.clientes = respuesta.data;
		   });
		};
	});
</script>