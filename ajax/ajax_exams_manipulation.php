<?php
	session_start();
	if(!(isset($_SESSION['user']))){
		header('Location:web_login.php');
		exit();
	}
	include '/../include/connect_database.php';
	if($_POST['name']==='checkcollections'){
		$value='SELECT * FROM Collection WHERE UserID="'.$_POST["userid"].'";';
		$rs=$conn->query($value);
		if($rs===false){
			echo '0';
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			if(count($arr)<1){echo json_encode(array("empty"=>"You don't have any collections of assignements yet. First make new one."));return;}
			echo json_encode($arr);
		}
	}else if($_POST['name']==='createcollection'){
		$value='INSERT INTO Collection VALUES(NULL,"'.$_POST["coll_name"].'","'.$_POST["userid"].'");';
		$rs=$conn->query($value);
		if($rs===false)echo '0'; else echo '1';
	}


?>