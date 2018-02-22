<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Page Title</title>
		<style>
			p { text-align: left; font-size: 6px; line-height: 100%; }
			p.col { font-size: 70%; font-weight: bold; }
			p.item { font-size: 70%; }
			.title { margin-bottom: 1px; }
			td { font-size: 60%; }
		</style>
	</head>
	<body>
		<h4 style="font-size: 70%; line-height: 50%;">NOMBRE EMPRESA</h3>
		<table style="text-align: left; padding-bottom: 2px; padding-left: 0px">
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
		<h4 style="font-size: 60%; text-align: center; line-height: 200%">
			BOLETA ELECTRONICA N° {numero}
		</h4>
		<p style="font-size: 55%; text-align: center; ">
			S.I.I {COMUNA}<br>
			FECHA EMISION: {fecha}
		</p>
		<table style="padding-top: 3px">
			<tbody>
				<tr>
					<td><hr/></td>
				</tr>
			</tbody>
		</table>
		<table style="width: 100%; padding-bottom: 3px">
			<tbody>
				<tr>
					<td width="15%"><p class="col">CODIGO</p></td>
					<td width="25%"><p class="col">DESCRIPCION</p></td>
					<td width="25%"><p class="col">CANTIDAD x PRECIO</p></td>
					<td width="18%"><p class="col">VALOR</p></td>
					<td width="17%"><p class="col">DESC.</p></td>
				</tr>
				<tr>
					<td><p class="item">{Codigo}</p></td>
					<td><p class="item">{Descr.}</p></td>
					<td><p class="item">{cant} x ${precio}</p></td>
					<td><p class="item">${Valor}</p></td>
					<td><p class="item">${Desc.}</p></td>
				</tr>
			</tbody>
		</table>
		<table style="padding-top: 3px">
			<tbody>
				<tr>
					<td><hr/></td>
				</tr>
			</tbody>
		</table>
		<table style="width: 100%; padding-bottom: 3px">
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
		<table style="padding-top: 3px">
			<tbody>
				<tr>
					<td><hr/></td>
				</tr>
			</tbody>
		</table>
		<p style="text-align: center;">
			<img src="https://user-images.githubusercontent.com/5008893/36402832-d803ec50-15bf-11e8-9803-b54e23c73cd7.png" width="140" height="80" />
		</p>
		<p style="font-size: 45%; text-align: center;">Timbre Electr&oacute;nico SII</p>
	</body>
</html>
