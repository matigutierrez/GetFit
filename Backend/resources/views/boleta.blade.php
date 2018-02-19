<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Page Title</title>
		<style>
			p { font-size: 70%;}
			.title { margin-bottom: 1px; }
			th { font-size: 65%; }
			td { font-size: 60%; }
		</style>
	</head>
	<body>
		<h4>NOMBRE EMPRESA</h3>
		<p>RUT: {rut empresa}</p>
		<p>DIRECCION: {direccion empresa}</p>
		<p>GIRO: {giro empresa}</p>
		<p>TELEFONO: {telefono}</p>
		<h4 style="text-align: center;">BOLETA ELECTRONICA</h3>
		<p style="text-align: center;">N&deg;{numero de boleta}</p>
		<p style="text-align: center;">S.I.I {COMUNA}</p>
		<p style="text-align: center;">FECHA DE EMISION: {fecha}</p>
		<hr/>
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
		<hr/>
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
		<hr/>
		<p style="text-align: center;"><img src="https://www.webfactura.cl/images/blog/image009.png" width="200" height="100" /></p>
		<p style="text-align: center;">Timbre Electr&oacute;nico SII</p>
	</body>
</html>
