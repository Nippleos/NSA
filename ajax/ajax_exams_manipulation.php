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
			$val1='SELECT AssignementID FROM CollectionOfAssignements WHERE CollectionID='.$value.';';
			$rs=$conn->query($val1);
			$val1='DELETE FROM CollectionOfAssignements WHERE CollectionID='.$value.';';
			$rs1=$conn->query($val1);
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			foreach ($arr as $key => $value1) {
				$value0='DELETE FROM Assignements WHERE AssignementID='.$value1["AssignementID"].';'; 
				$rs=$conn->query($value0);
			}
			$value1='DELETE FROM Collection WHERE CollectionID='.$value.';';
			$rs=$conn->query($value1);
			if($rs===false){echo $conn->error;return;}
		}
		echo '1';
	}else if($_POST['name']==='newexam'){
		if(strlen($_POST['startline'])>0){
			$sl=DateTime::createFromFormat('d/m/Y', $_POST['startline']);
			$dl=DateTime::createFromFormat('d/m/Y', $_POST['deadline']);
			$startline=$sl->format('Y-m-d');
			$deadline=$dl->format('Y-m-d');
			$value='INSERT INTO Assignements VALUES(NULL,"'.$_POST["title"].'","'.$_POST["description"].'","'.$_POST["keywords"].'",CURRENT_DATE,1,"'.$startline.'","'.$deadline.'","'.$_POST["maxnumber"].'")';
		}else{
			$value='INSERT INTO Assignements VALUES(NULL,"'.$_POST["title"].'","'.$_POST["description"].'","'.$_POST["keywords"].'",CURRENT_DATE,0,"NULL","NULL","'.$_POST["maxnumber"].'")';
		}
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
				foreach ($arr as $key => $value) {
					if($value['Startline']!='0000-00-00'){
						$parts = explode('-', $value['Startline']);
						$date  = "$parts[1]/$parts[2]/$parts[0]";
						$arr[$key]['Startline']=$date;
					}
					if($value['Deadline']!='0000-00-00'){
						$parts = explode('-', $value['Deadline']);
						$date  = "$parts[1]/$parts[2]/$parts[0]";
						$arr[$key]['Deadline']=$date;
					}
					$parts = explode('-', $value['Created']);
					$date  = "$parts[1]/$parts[2]/$parts[0]";
					$arr[$key]['Created']=$date;
					$value1='SELECT COUNT(DateTime) AS CurrentNumber FROM Users u LEFT JOIN ChossingAnAssignement ca ON(u.UserID=ca.Userid) WHERE ca.UserID='.$value["UserID"].' AND AssignementID='.$value["AssignementID"].' GROUP BY u.UserID;';
					$rs=$conn->query($value1);
					if($rs===false){
						echo 'napal;';
						echo '<br>'.$conn->error.'<br>';
					}else{
						//echo $value1;
						$arras=$rs->fetch_all(MYSQLI_ASSOC);
						if(empty($arras)){
							$arr[$key]['CountNumber']=0;
						}else{
							$arr[$key]['CountNumber']=$arras[0]['CountNumber'];
						}
					}
				}
				echo json_encode($arr);
				//print_r($arr);
			}
			else echo json_encode(array("empty"=>"There are no exams in database."));
		}
	}else if($_POST['name']==='getlongdescription'){
		$value='SELECT Description FROM Assignements WHERE AssignementID='.$_POST["id"].';';
		$rs=$conn->query($value);
		if($rs===false){echo 0; return;}
		$arr=$rs->fetch_all(MYSQLI_ASSOC);
		echo json_encode($arr[0]);
	}else if($_POST['name']==='readforedit'){
		$value='SELECT a.* FROM Assignements a INNER JOIN CollectionOfAssignements coa ON(a.AssignementID=coa.AssignementID) INNER JOIN Collection c ON(coa.CollectionID=c.CollectionID) INNER JOIN Users u ON(c.UserID=u.UserID) WHERE u.UserID='.$_POST["userid"].';';
		$rs=$conn->query($value);
		if($rs===false){echo 0; return;}
		$arr=$rs->fetch_all(MYSQLI_ASSOC);
		if(count($arr)<1){echo json_encode(array("empty"=>"You dont have any exams."));return;}
		foreach ($arr as $key => $value) {
			if($value['Startline']!='0000-00-00'){
				$parts = explode('-', $value['Startline']);
				$date  = "$parts[2]/$parts[1]/$parts[0]";
				$arr[$key]['Startline']=$date;
			}
			if($value['Deadline']!='0000-00-00'){
				$parts = explode('-', $value['Deadline']);
				$date  = "$parts[2]/$parts[1]/$parts[0]";
				$arr[$key]['Deadline']=$date;
			}
		}
		echo json_encode($arr);
	}else if($_POST['name']==='update_exam'){
		if($_POST['startline']!=''){
			$parts = explode('/', $_POST['startline']);
			$startline  = "$parts[2]/$parts[1]/$parts[0]";
		}else $startline='';
		if($_POST['deadline']!=''){
			$parts = explode('/', $_POST['deadline']);
			$deadline  = "$parts[2]/$parts[1]/$parts[0]";
		}else $deadline='';
		if($startline!='')$published=1;else $published=0;
		$value='UPDATE Assignements SET Published='.$published.', Title="'.$_POST["title"].'", Startline="'.$startline.'", Deadline="'.$deadline.'",Description="'.$_POST["description"].'", KeyWords="'.$_POST["keywords"].'" WHERE AssignementID='.$_POST["id"].';';
		$rs=$conn->query($value);
		if($rs===false)echo $conn->error;
		else echo 1;
	}else if($_POST['name']==='removeexams'){
		foreach (json_decode($_POST['id']) as $key => $value) {
			$value1='DELETE FROM CollectionOfAssignements WHERE AssignementID='.$value.';';
			$rs=$conn->query($value1);
			if($rs===false){
				echo 0;
				return;
			}else{
				$value1='DELETE FROM Assignements WHERE AssignementID='.$value.';';
				$rs=$conn->query($value1);
				if($rs===false){echo $conn->error;return;}
			}
		}
		echo '1';
	}else if($_POST['name']==='changename'){
		$value='UPDATE Collection SET CollectionName="'.$_POST["coll_name"].'" WHERE CollectionID='.$_POST["id"].';';
		$rs=$conn->query($value);
		if($rs===false)echo 0; else echo 1;
	}else if($_POST['name']==='checkexamstatus'){
		$value='SELECT AssignementID FROM Assignements WHERE Startline>CURRENT_DATE OR Deadline<CURRENT_DATE'; 
		//naloge ki niso v izvajanju vec
		$rs=$conn->query($value);
		$arr=$rs->fetch_all(MYSQLI_ASSOC);//naloge ki niso v izvajanju vec
		$value='SELECT a.AssignementID FROM Assignements a LEFT JOIN ChossingAnAssignement ca ON(a.AssignementID=ca.AssignementID) WHERE Startline<=CURRENT_DATE AND Deadline>=CURRENT_DATE GROUP BY a.AssignementID HAVING COUNT(ca.UserID)=0';
		$arr1=$rs->fetch_all(MYSQLI_ASSOC);
	}



?>


