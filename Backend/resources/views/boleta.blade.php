<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Page Title</title>
		<style>
			p { text-align: left; font-size: 80%; line-height: 100%; }
			p.col { font-size: 70%; font-weight: bold; }
			p.item { font-size: 70%; }
			h4 { font-size: 80%; }
			h3 { font-size: 60%; }
			.title { margin-bottom: 1px; }
			th { font-size: 65%; }
			td { font-size: 60%; }
		</style>
	</head>
	<body>
		<h4>NOMBRE EMPRESA</h1>
		<table style="text-align: left; padding-bottom: 1px">
			<tbody>
				<tr>
					<td width="25%"><p>RUT:</p></td>
					<td><p>{rut empresa}</p></td>
				</tr>
				<tr>
					<td><p>DIRECCION:</p></td>
					<td><p>{direccion empresa}</p></td>
				</tr>
				<tr>
					<td><p>GIRO:</p></td>
					<td><p>{giro empresa}</p></td>
				</tr>
				<tr>
					<td><p>TELEFONO:</p></td>
					<td><p>{telefono empresa}</p></td>
				</tr>
			</tbody>
		</table>
		<h3 style="text-align: center;">
			BOLETA ELECTRONICA N° {numero}
		</h3>
		<p style="font-size: 55%; text-align: center;">
			S.I.I {COMUNA}<br>
			FECHA EMISION: {fecha}
		</p>
		<hr/>
		<table style="width: 100%; padding-top: 3px; padding-bottom: 3px">
			<tbody>
				<tr>
					<td><p class="col">CODIGO</p></td>
					<td><p class="col">DESCRIPCION</p></td>
					<td><p class="col">VALOR</p></td>
					<td><p class="col">DESC.</p></td>
				</tr>
				<tr>
					<td><p class="item">{Codigo}</p></td>
					<td><p class="item">{Descr.}</p></td>
					<td><p class="item">${Valor}</p></td>
					<td><p class="item">-${Descuento}</p></td>
				</tr>
			</tbody>
		</table>
		<hr/>
		<table style="width: 100%; padding-top: 3px; padding-bottom: 3px">
			<tbody>
				<tr>
					<td width="75%"><p class="col" style="text-align: right">SUB TOTAL:</p></td>
					<td width="25%"><p class="item">$???</p></td>
				</tr>
				<tr>
					<td><p class="col" style="text-align: right">TOTAL:</p></td>
					<td><p class="item">$???</p></td>
				</tr>
			</tbody>
		</table>
		<hr/>
		<p style="text-align: center;">
			<img src="https://user-images.githubusercontent.com/5008893/36402832-d803ec50-15bf-11e8-9803-b54e23c73cd7.png" width="140" height="80" />
		</p>
		<p style="font-size: 45%; text-align: center;">Timbre Electr&oacute;nico SII</p>
	</body>
</html>
