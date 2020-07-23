<?php 
//incluir la conexion de base de datos
require "../config/Conexion.php";
class Alumnos{


	//implementamos nuestro constructor
public function __construct(){

} 
//metodo insertar regiustro
public function insertar($image,$name,$lastname,$email,$address,$phone,$c1_fullname,$c1_address,$c1_phone,$c1_note,$user_id,$team_id){
	$sql="INSERT INTO alumn (image,name,lastname,email,address,phone,c1_fullname,c1_address,c1_phone,c1_note,is_active,user_id)
	 VALUES ('$image','$name','$lastname','$email','$address','$phone','$c1_fullname','$c1_address','$c1_phone','$c1_note','1','$user_id')";
	

	 $idalumno_new=ejecutarConsulta_retornarID($sql);
	 $sw=true;
	 	$sql_detalle="INSERT INTO alumn_team (alumn_id, team_id) VALUES('$idalumno_new','$team_id')";

	 	ejecutarConsulta($sql_detalle) or $sw=false; 

	 return $sw;

}


public function editar($id,$image,$name,$lastname,$email,$address,$phone,$c1_fullname,$c1_address,$c1_phone,$c1_note,$user_id){
	$sql="UPDATE alumn SET image='$image',name='$name', lastname='$lastname',email='$email',address='$address',phone='$phone' ,c1_fullname='$c1_fullname', c1_address='$c1_address', c1_phone='$c1_phone',c1_note='$c1_note',user_id='$user_id'
	WHERE id='$id'";
	return ejecutarConsulta($sql);
}
public function desactivar($id){
	$sql="UPDATE alumn SET condicion='0' WHERE id='$id'";
	return ejecutarConsulta($sql);
}
public function activar($id){
	$sql="UPDATE alumn SET condicion='1' WHERE id='$id'";
	return ejecutarConsulta($sql);
}
 
//metodo para mostrar registros
public function mostrar($id){
	$sql="SELECT * FROM alumn WHERE id='$id'";
	return ejecutarConsultaSimpleFila($sql);
}

//listar registros 
public function listar($user_id, $team_id){
	$sql="SELECT a.id,a.image,a.name,a.lastname,a.email,a.address,a.phone,a.c1_fullname,a.c1_address,a.c1_phone,a.c1_note, a.is_active, a.user_id FROM alumn a INNER JOIN alumn_team alt ON a.id=alt.alumn_id WHERE a.is_active=1 AND a.user_id='$user_id' AND alt.team_id='$team_id' ORDER BY a.id DESC ";
	return ejecutarConsulta($sql);
}


public function verficar_alumno($user_id, $team_id){
	$sql="SELECT * FROM alumn a INNER JOIN alumn_team alt ON a.id=alt.alumn_id WHERE a.is_active=1 AND a.user_id='$user_id' AND alt.team_id='$team_id' ORDER BY a.id DESC ";
	return ejecutarConsultaSimpleFila($sql);
}
public function listar_calif($user_id, $team_id){
	$sql="SELECT a.id AS idalumn,a.image,a.name,a.lastname,a.email,a.address,a.phone,a.c1_fullname,a.c1_address,a.c1_phone,a.c1_note, a.is_active, a.user_id FROM alumn a INNER JOIN alumn_team alt ON a.id=alt.alumn_id WHERE a.is_active=1 AND a.user_id='$user_id' AND alt.team_id='$team_id' ORDER BY a.id DESC ";
	return ejecutarConsulta($sql); 
}
//listar registros activos

//implementar un metodo para listar los activos, su ultimo precio y el stock(vamos unir con el ultimo registro de la tabla detalle_ingreso)

}
 ?>
