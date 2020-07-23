var tabla;

//funcion que se ejecuta al inicio
function init(){
	var  team_id = $("#idgrupo").val();
   listar();

    //cargamos los items al select cliente
   $.post("../ajax/cursos.php?op=selectCursos",{idgrupo:team_id}, function(r){
   	$("#curso").html(r);
   	$('#curso').selectpicker('refresh');
   });



      $("#formulario").on("submit",function(e){
   	guardaryeditar(e);
   })

}

//campturamos el id del curso la hacer cambio en el select curso
$("#curso").change(function(){
	var idcurso=$("#curso").val();
	$("#idcurso").val(idcurso);
   listar();

});

//FUNCION PARA VERIFICAR SI YA SE INGRESO UNA CALIFICACION DE UN CURSO
function verificar(id){
	var idcurso = $("#idcurso").val();

	$.post("../ajax/calificaciones.php?op=verificar",{alumn_id:id, idcurso:idcurso},
		function(data,status)
		{
				data=JSON.parse(data);
				if(data==null && $("#idcurso").val()!=0){

					$("#getCodeModal").modal('show');
				 	$.post("../ajax/alumnos.php?op=mostrar",{idalumno : id},
						function(data,status)
						{
						data=JSON.parse(data);
						$("#alumn_id").val(data.id);
						});
				}else if(data=!null && $("#idcurso").val()!=0){
					 $("#getCodeModal").modal('show');
				 	$.post("../ajax/calificaciones.php?op=verificar",{alumn_id:id, idcurso:idcurso},
					function(data,status)
					{
						data=JSON.parse(data);
						$("#idcalificacion").val(data.id);
						$("#alumn_id").val(data.alumn_id);
						$("#valor").val(data.val);
						$("#idcurso").val(data.block_id);
					});

				}else if($("#idcurso").val()==0){
					bootbox.alert('Seleciona un curso');
					}
		})
	limpiar();
		
}


//funcion limpiar
function limpiar(){
	$("#idcalificacion").val("");
	$("#alumn_id").val("");
	$("#valor").val("");
	$("#curso").selectpicker('refresh');
	$('#getCodeModal').modal('hide')
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
			url:'../ajax/calificaciones.php?op=listar',
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

//FUNCION GUARDAR O EDITAR
function guardaryeditar(e){
     e.preventDefault();//no se activara la accion predeterminada 
     $("#btnGuardar").prop("disabled",false);
     var formData=new FormData($("#formulario")[0]);

     $.ajax({
     	url: "../ajax/calificaciones.php?op=guardaryeditar",
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


init();  