<?php
	session_start();
	if(!(isset($_SESSION['user']))){
		header('Location:web_login.php');
		exit();
	}
	include '/../include/connect_database.php';
	if($_POST['name']==='get_all'){
		$value='SELECT Username FROM Users WHERE Username="'.$_SESSION["user"].'" AND Checked=1 AND UPPER(Type)="ADMIN";';
		$rs=$conn->query($value);
		if($rs===false){
			echo '0';
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			if(count($arr)<1){
				$value='SELECT * FROM Users WHERE Username="'.$_SESSION["user"].'" AND Checked=1;';
				$rs=$conn->query($value);
				$arr=$rs->fetch_all(MYSQLI_ASSOC);
				echo json_encode(array("user"=>$arr[0]));
				return;
			};
			$value='DELETE FROM Users WHERE CURRENT_DATE-Datum>7;';
			$rs=$conn->query($value);
			$value='SELECT * FROM Users WHERE Username NOT LIKE "'.$_SESSION["user"].'";';
			$rs=$conn->query($value);
			if($rs===false){echo 0;return;}else $arr=$rs->fetch_all(MYSQLI_ASSOC);
			echo json_encode(array('admin',$arr));
		}
	}else if($_POST['name']==='removeuser'){
		$value='DELETE FROM Users WHERE UserID='.$_POST["id"].';';
		$rs=$conn->query($value);
		if($rs===false)echo '0';else echo '1';
	}else if($_POST['name']==='checkuser'){
		$value='UPDATE USERS SET Checked=1 WHERE UserID='.$_POST["id"].';';
		$rs=$conn->query($value);
		if($rs===false)echo '0';else echo '1';
	}else if($_POST['name']==='repair'){
		if(strlen($_POST['pass'])>0)$value='UPDATE Users SET Password="'.sha1($_POST["pass"]).'", Name="'.$_POST["name1"].'", Username="'.$_POST["uname"].'",Surname="'.$_POST["sname"].'",Contact="'.$_POST["contact"].'" WHERE UserID='.$_POST["id"].';';
		else $value='UPDATE Users SET Name="'.$_POST["name1"].'", Username="'.$_POST["uname"].'",Surname="'.$_POST["sname"].'",Contact="'.$_POST["contact"].'" WHERE UserID='.$_POST["id"].';';
		$rs=$conn->query($value);
		if($rs===false)echo '0';else echo '1';
	}

?>