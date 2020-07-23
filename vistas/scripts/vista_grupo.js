var tabla;

//funcion que se ejecuta al inicio
function init(){
   mostrarform(false);
   listar();

   $("#formulario").on("submit",function(e){
   	guardaryeditar(e);
   })

   //cargamos los items al celect categoria

   $("#imagenmuestra").hide();



}

//funcion limpiar
function limpiar(){
	$("#codigo").val("");
	$("#nombre").val("");
	$("#descripcion").val("");
	$("#stock").val("");
	$("#imagenmuestra").attr("src","");
	$("#imagenactual").val("");
	$("#print").hide();
	$("#idalumno").val("");
}
 
//funcion mostrar formulario
function mostrarform(flag){
	limpiar();
	if(flag){
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
		$("#btnasistencia").hide();
		$("#btnconducta").hide();
		$("#btncalificaciones").hide();
		$("#btncursos").hide();
		$("#btnlistas").hide();
		$("#btnreporte").hide();
		$("#btngrupos").hide();
	}else{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
		$("#btnasistencia").show();
		$("#btnconducta").show();
		$("#btncalificaciones").show();
		$("#btncursos").show();
		$("#btnlistas").show();
		$("#btnreporte").show();
		$("#btngrupos").show();
	}
}



//cancelar form
function cancelarform(){
	limpiar();
	mostrarform(false);
}

//funcion listar
function listar(){
	var  team_id = $("#idgrupo").val();
	tabla=$('#tbllistado').dataTable({
		"aProcessing": true,//activamos el procedimiento del datatable
		"aServerSide": true,//paginacion y filrado realizados por el server
		dom: 'Bfrtip',//definimos los elementos del control de la tabla
        buttons: [
            {
                extend: 'copyHtml5',
                text:'Copiar',
                exportOptions: {
                    columns: [ 0, ':visible' ]
                }
            },
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [ 0, 1, 2, 5 ]
                }
            },
            {
                extend: 'colvis',
                text: 'Visor de columnas',
                collectionLayout: 'fixed three-column'
                }
        ],
		"ajax":
		{
			url:'../ajax/alumnos.php?op=listar',
			data:{idgrupo:team_id},
			type: "get",
			dataType : "json",
			error:function(e){  
				console.log(e.responseText);
			}
		},
		"bDestroy":true,
		"iDisplayLength":10,//paginacion
		"order":[[0,"desc"]]//ordenar (columna, orden)
	}).DataTable();
}



//funcion para guardaryeditar
function guardaryeditar(e){
     e.preventDefault();//no se activara la accion predeterminada 
     $("#btnGuardar").prop("disabled",true);
     var formData=new FormData($("#formulario")[0]);

     $.ajax({
     	url: "../ajax/alumnos.php?op=guardaryeditar",
     	type: "POST",
     	data: formData,
     	contentType: false,
     	processData: false,

     	success: function(datos){
     		bootbox.alert(datos);
     		mostrarform(false);
     		tabla.ajax.reload();
     	}
     });

     limpiar();
}

function mostrar(id){
	$.post("../ajax/alumnos.php?op=mostrar",{idalumno : id},
		function(data,status)
		{
			data=JSON.parse(data);
			mostrarform(true);
			$("#nombre").val(data.name);
			$("#apellidos").val(data.lastname);
			$("#email").val(data.email);
			$("#direccion").val(data.address);
			$("#telefono").val(data.phone);
			$("#imagenmuestra").show();
			$("#imagenmuestra").attr("src","../files/articulos/"+data.image);
			$("#imagenactual").val(data.image);
			$("#idalumno").val(data.id);
		})
}


//funcion para desactivar
function desactivar(idalumno){
	bootbox.confirm("¿Esta seguro de desactivar este dato?", function(result){
		if (result) {
			$.post("../ajax/alumnos.php?op=desactivar", {idalumno : idalumno}, function(e){
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		}
	})
}

function activar(idalumno){
	bootbox.confirm("¿Esta seguro de activar este dato?" , function(result){
		if (result) {
			$.post("../ajax/alumnos.php?op=activar" , {idalumno : idalumno}, function(e){
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		}
	})
}


init(); 