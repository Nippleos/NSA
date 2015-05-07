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
	}else if($_POST['name']==='newexam'){
		$value='INSERT INTO Assignements VALUES(NULL,"'.$_POST["title"].'","'.$_POST["description"].'","'.$_POST["keywords"].'",CURRENT_DATE,NULL,"'.$_POST["startline"].'","'.$_POST["deadline"].'","'.$_POST["maxnumber"].'")';
		$rs=$conn->query($value);
		if($rs===false) echo 0;
		else{
			$value='INSERT INTO CollectionOfAssignements VALUES('.$_POST["collectionid"].','.$conn->insert_id.');';
			$rs=$conn->query($value);
			if($rs===false) echo 0; else echo 1;
		}
	}else if($_POST['name']==='getexams'){
		$value='SELECT a.*,u.Name,u.Surname,u.UserID FROM Assignements a LEFT JOIN CollectionOfAssignements ca ON(a.AssignementID=ca.AssignementID) LEFT JOIN Collection c ON(ca.CollectionID=c.CollectionID) LEFT JOIN Users u ON(c.UserID=u.UserID);';
		$rs=$conn->query($value);
		if($rs===false){
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			if(isset($arr[0]["AssignementID"])){
				print_r($arr);
				foreach ($arr as $key => $value) {
					$value1='SELECT COUNT(DateTime) AS CurrentNumber FROM Users u LEFT JOIN ChossingAnAssignement ca ON(u.UserID=ca.Userid) WHERE ca.UserID='.$value["UserID"].' AND AssignementID='.$value["AssignementID"].' GROUP BY u.UserID;';
					$rs=$conn->query($value1);
					if($rs===false){
						echo '<br>'.$conn->error.'<br>';
					}else{
						echo $value1;
						$arras=$rs->fetch_all(MYSQLI_ASSOC);
						if(empty($arras)){
							$arr[$key]['CountNumber']=0;
						}else{
							$arr[$key]['CountNumber']=$arras[0]['CountNumber'];
						}
					}
				}
				echo json_encode($arr);
			}
			else echo json_encode(array("empty"=>"You don't have any collections of assignements yet. First make new one."));
		}
	}


?>


