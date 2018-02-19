<<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>Page Title</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" media="screen" href="main.css" />
		<script src="main.js"></script>
		<style>
			html { margin: 15px };
			div.p { font-size: 50% }
		</style>
	</head>
	<body>
		<h1>NOMBRE EMPRESA</h1>
		<div class="p">RUT: {rut empresa}</div>
		<p>DIRECCION: {direccion empresa}</p>
		<p>GIRO: {giro empresa}</p>
		<p>TELEFONO: {telefono}</p>
		<h3 style="text-align: center;">BOLETA ELECTRONICA N&deg;{numero de boleta}</h3>
		<p style="text-align: center;">S.I.I {COMUNA}</p>
		<p style="text-align: center;">FECHA DE EMISION: {fecha}</p>p>
		<hr />
		<table style="width: 100%;">
		<tbody>
		<tr>
		<th>CODIGO</th>
		<th>DESCRIPCION</th>
		<th>VALOR</th>
		<th>DESC.</th>
		</tr>
		<tr>
		<td>{Codigo}</td>
		<td>{Descr.}</td>
		<td>${Valor}</td>
		<td>-${Descuento}</td>
		</tr>
		</tbody>
		</table>
		<hr />
		<table style="width: 100%;">
		<tbody>
		<tr>
		<th>Sub-Total:</th>
		<td>$???</td>
		</tr>
		<tr>
		<th>Total</th>
		<td>$???</td>
		</tr>
	</tbody>
	</table>
	<hr />
	<p style="text-align: center;"><img src="https://www.webfactura.cl/images/blog/image009.png" width="200" height="100" /></p>
	<p style="text-align: center;">Timbre Electr&oacute;nico SII</p>
	</body>
</html>
