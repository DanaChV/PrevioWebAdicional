var materia="";
var est="";
var cant="";
var reprobados = 0;
var aprobados = 0;

function crearForm()
{
   materia=document.getElementById("materia").value;
   est=document.getElementById("est").value;
   cant=document.getElementById("cant").value;

   if(materia == "" || est == "" || cant == ""){
      swal("¡ Advertenvia !","Por favor llene todos los campos para generar la gráfica indicada","info");
    }else{
     //reiniciar tabla definitivas y grafica
     var def = document.getElementById("registros_def");
     def.innerHTML="";
     var graf = document.getElementById("graficas");
     graf.innerHTML="";
     var bot1 = document.getElementById("boton_tabla_estadisticas_torta");
     bot1.innerHTML="";
     var bot2 = document.getElementById("boton_tabla_estadisticas_barras");
     bot2.innerHTML="";
     var col = document.getElementById("columnas_def");
     col.innerHTML="";

     var tabla=document.getElementById("registros_tabla");
     var columnas = document.getElementById("columnas_tabla");
     var col_generadas = "<tr><th scope='col' style='text-align: center;'>Código</th>";

     for(i=1;i<=cant;i++)
      {
         col_generadas+="<th scope='col' style='text-align: center;'>Nota "+i+"</th>"; 
      }
      col_generadas+="</tr>"
      columnas.innerHTML=col_generadas;

     var form="<tr>";
      for(i=1;i<=est;i++)
      {
         form+="<td><input type='text' id='codigo' name='codigo' placeholder='Código "+i+"' style='display:block;margin:auto;text-align: center;'/></td>";
         for (j=1;j<=cant;j++) {
           form+="<td><input type='number' id='nota"+i+"' name='nota"+i+"' placeholder='Nota "+j+"' style='display:block;margin:auto;text-align: center;'/></td>";
         } 
         form+="</tr>";
      }
      tabla.innerHTML=form; 
      var boton=document.getElementById("boton_tabla");
      boton.innerHTML="<button type='button' class='btn btn-success mt-3' onclick='analizar()' style='width: 100%;'>Analizar</button>"
  
    }
  }

function analizar(){
   document.getElementById("nombre_materia").innerHTML = materia;
   aprobados=0;
   reprobados=0;
     var tabla=document.getElementById("registros_def");
     var columnas = document.getElementById("columnas_def");
     var codigos= document.getElementsByName("codigo");
     var col_generadas = "<tr><th scope='col' style='text-align: center;'>Código</th>";
      col_generadas+="<th scope='col' style='text-align: center;'>Definitiva</th></tr>"
      columnas.innerHTML=col_generadas;

      var form="<tr>";
         for (j=0;j<codigos.length;j++) {
           var def = sacarDef(j);

              form+="<td style='background:#FFF289;'><label style='display:block;margin:auto;text-align: center;'>"+codigos[j].value+"</label></td>";         
              form+="<td style='background:#FFF289;'><label style='display:block;margin:auto;text-align: center;'>"+def+"</label></td></tr>";
              form+="<td style='background:blue;'><label style='display:block;margin:auto;text-align: center;'>"+codigos[j].value+"</label></td>";         
              form+="<td style='background:blue;'><label style='display:block;margin:auto;text-align: center;'>"+def+"</label></td></tr>";
              form+="<td style='background:#FF5B60;'><label style='display:block;margin:auto;text-align: center;'>"+codigos[j].value+"</label></td>";         
              form+="<td style='background:#FF5B60;'><label style='display:block;margin:auto;text-align: center;'>"+def+"</label></td></tr>";

         } 
      
      tabla.innerHTML=form;
      var boton1=document.getElementById("boton_tabla_estadisticas_torta");
      boton1.innerHTML="<button type='button' class='btn btn-success mt-3' onclick='graficarTorta()' style='width: 100%;'>Gráfica Torta</button>";

      var boton2=document.getElementById("boton_tabla_estadisticas_barras");
      boton2.innerHTML="<button type='button' class='btn btn-success mt-3' onclick='graficarBarras()' style='width: 100%;'>Gráfica Barras</button>";
}

function sacarDef(x){
  var notas= document.getElementsByName("nota"+(x+1)+"");
  var suma = 0;
  var def = 0;
  for(i=0;i<notas.length;i++){
      suma+=parseFloat(notas[i].value);
  }
  def = suma/cant;
  return(def);
}


function graficarTorta(){
  var datos = ["Reprobados","Aprobados"];
  var valores = [reprobados,aprobados];
  $("#graficas").css("width", "100%");
  $("#graficas").css("border", "2px solid black");
  draw_chart(datos,valores);
}
      
function draw_chart(datos,valores){
  drawChart(datos,valores);
  google.charts.setOnLoadCallback(drawChart);
}  

function drawChart(a,v) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Tipo');
  data.addColumn('number', 'Cantidad');
  data.addRows(a.length);
  for(i=0;i<a.length;i++){
    data.setCell(i, 0, a[i]);
    data.setCell(i, 1, v[i]);        
  }
  var options = {
    title: 'Graficador'

  };

  var chart = new google.visualization.PieChart(document.getElementById('graficas'));
    chart.draw(data, options);
}

function graficarBarras(){
  var datos = ["Reprobados","Aprobados"];
  var valores = [reprobados,aprobados];
  $("#graficas").css("width", "100%");
  $("#graficas").css("border", "2px solid black");
  draw_chart1(datos,valores);
}

function draw_chart1(datos,valores){
  drawChart1(datos,valores);
  google.charts.setOnLoadCallback(drawChart1);
}  

function drawChart1(a,v) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Tipo');
  data.addColumn('number', 'Cantidad');
  data.addRows(a.length);
  for(i=0;i<a.length;i++){
    data.setCell(i, 0, a[i]);
    data.setCell(i, 1, v[i]);        
  }
  var options = {
    title: 'Graficador'

  };

  var chart1 = new google.visualization.ColumnChart(document.getElementById('graficas'));
    chart1.draw(data, options);
}

  