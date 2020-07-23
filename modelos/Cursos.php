<?php 
//incluir la conexion de base de datos
require "../config/Conexion.php";
class Cursos{


	//implementamos nuestro constructor
public function __construct(){

}

//metodo insertar regiustro
public function insertar($name,$team_id){
	$sql="INSERT INTO block (name,team_id) VALUES ('$name','$team_id')";
	return ejecutarConsulta($sql);
}

public function editar($id,$name,$team_id){
	$sql="UPDATE block SET name='$name',team_id='$team_id' 
	WHERE id='$id'";
	return ejecutarConsulta($sql);
}
public function desactivar($id){
	$sql="UPDATE block SET condicion='0' WHERE id='$id'";
	return ejecutarConsulta($sql);
}
public function activar($id){
	$sql="UPDATE block SET condicion='1' WHERE id='$id'";
	return ejecutarConsulta($sql);
}

//metodo para mostrar registros
public function mostrar($id){
	$sql="SELECT * FROM block WHERE id='$id'";
	return ejecutarConsultaSimpleFila($sql);
}

//listar registros
public function listar($team_id){
	$sql="SELECT id, name,team_id FROM block WHERE team_id='$team_id'";
	return ejecutarConsulta($sql);
}

public function verficar_curso($team_id){
	$sql="SELECT id,name, team_id FROM block  WHERE team_id='$team_id'";
		return ejecutarConsulta($sql);
}

public function listarc_nota(){
	$sql="SELECT * FROM block";
	return ejecutarConsulta($sql);
}
//listar y mostrar en selct
public function select(){
	$sql="SELECT * FROM block WHERE condicion=1";
	return ejecutarConsulta($sql);
}
}

 ?>
