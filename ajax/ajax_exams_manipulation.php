<?php
	session_start();
	if(!(isset($_SESSION['user']))){
		header('Location:web_login.php');
		exit();
	}
	include '/../include/connect_database.php';
	if($_POST['name']==='checkcollections'){
		$value='SELECT c.*, COUNT(ca.AssignementID) AS Count FROM Collection c LEFT JOIN CollectionOfAssignements ca ON(c.CollectionID=ca.CollectionID) LEFT JOIN Assignements a ON(ca.AssignementID=a.AssignementID) WHERE c.UserID="'.$_POST["userid"].'" GROUP BY c.CollectionName ORDER BY c.CollectionID;';
		$rs=$conn->query($value);
		if($rs===false){
			echo $conn->error;
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			//print_r($arr);
			if(!isset($arr[0]['CollectionID'])){echo json_encode(array("empty"=>"You don't have any collections of assignements yet. First make new one."));return;}
			echo json_encode($arr);
		}
	}else if($_POST['name']==='createcollection'){
		$value='INSERT INTO Collection VALUES(NULL,"'.$_POST["coll_name"].'","'.$_POST["userid"].'");';
		$rs=$conn->query($value);
		if($rs===false){echo '0'; return;}
		$value='SELECT CollectionName,COUNT(ca.AssignementID) AS Count FROM Collection c LEFT JOIN CollectionOfAssignements ca ON(c.CollectionID=ca.CollectionID) LEFT JOIN Assignements a ON(ca.AssignementID=a.AssignementID) GROUP BY CollectionName;';
		$rs=$conn->query($value);
		if($rs===false) echo $conn->error; else echo json_encode($arr=$rs->fetch_all(MYSQLI_ASSOC));
	}else if($_POST['name']==='removecollections'){
		foreach (json_decode($_POST['ids']) as $key => $value) {
			$value='DELETE FROM Collection WHERE CollectionID='.$value.';';
			$rs=$conn->query($value);
			if($rs===false){echo '0';return;}
		}
		echo '1';
	}


?>