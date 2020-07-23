var tabla;

//funcion que se ejecuta al inicio
function init(){
   mostrarform(false);
   listar();

   $("#formulario").on("submit",function(e){
   	guardaryeditar(e);
   });

      $("#formulario_asis").on("submit",function(e){
   	guardaryeditar_asis(e);
   })

   //cargamos los items al celect categoria

   $("#imagenmuestra").hide();



}


function verificar(id){
		//obtenemos la fecha actual
	var now = new Date();
	var day =("0"+now.getDate()).slice(-2);
	var month=("0"+(now.getMonth()+1)).slice(-2);
	var today=now.getFullYear()+"-"+(month)+"-"+(day);
	var idgrupo = $("#idgrupo").val();

	$.post("../ajax/conducta.php?op=verificar",{fecha_conducta : today, alumn_id:id, idgrupo:idgrupo},
		function(data,status)
		{
				data=JSON.parse(data);
				if(data==null && $("#tipo_conducta").val()!=""){

					 	$("#getCodeModal").modal('show');
					 	$.post("../ajax/alumnos.php?op=mostrar",{idalumno : id},
						function(data,status)
						{
							data=JSON.parse(data);
							$("#alumn_id").val(data.id);
						});
				
				}else if(data=!null && $("#tipo_conducta").val()!=""){
					 $("#getCodeModal").modal('show');
				 	$.post("../ajax/conducta.php?op=verificar",{fecha_conducta : today, alumn_id:id, idgrupo:idgrupo},
					function(data,status)
					{
						data=JSON.parse(data);
						$("#idconducta").val(data.id);
						$("#alumn_id").val(data.alumn_id);
						$("#tipo_conducta").val(data.kind_id);
						$("#tipo_conducta").selectpicker('refresh');
					});

				}else if($("#tipo_conducta").val()==""){
					alert('borrar');
					}
		})
	limpiar();
		
}


//funcion limpiar
function limpiar(){
	$("#idconducta").val("");
	$("#alumn_id").val("");
	$("#tipo_conducta").val("");
	$("#tipo_conducta").selectpicker('refresh');

		//obtenemos la fecha actual
	var now = new Date();
	var day =("0"+now.getDate()).slice(-2);
	var month=("0"+(now.getMonth()+1)).slice(-2);
	var today=now.getFullYear()+"-"+(month)+"-"+(day);
	$("#fecha_conducta").val(today);
	$('#getCodeModal').modal('hide')
}

//funcion mostrar formulario
function mostrarform(flag){
	limpiar();
	if(flag){
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
	}else{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
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
                  'copyHtml5',
                  'excelHtml5',
                  'csvHtml5',
                  'pdf'
		],
		"ajax":
		{
			url:'../ajax/conducta.php?op=listar',
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







function guardaryeditar_asis(e){
     e.preventDefault();//no se activara la accion predeterminada 
     $("#btnGuardar_asis").prop("disabled",false);
     var formData=new FormData($("#formulario_asis")[0]);

     $.ajax({
     	url: "../ajax/conducta.php?op=guardaryeditar",
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
			alert(data.name);
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