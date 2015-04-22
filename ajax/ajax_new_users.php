<?php
	session_start();
	if(!(isset($_SESSION['user']))){
		header('Location:web_login.php');
		exit();
	}
	include '/../include/connect_database.php';
	if($_POST['name']==='countusers'){
		$value='SELECT COUNT(UserID) AS Number FROM Users WHERE Checked=0;';
		$rs=$conn->query($value);
		if($rs===false)echo '0';else{$arr=$rs->fetch_all(MYSQLI_ASSOC); echo $arr[0]['Number'];}
	}else if($_POST['name']==='get_all'){
		$value='SELECT * FROM Users WHERE Checked=0;';
		$rs=$conn->query($value);
		if($rs===false){
			echo '0';
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			if(count($arr)<1){echo json_encode(array("empty"=>"There are no new users requests."));return;}
			echo json_encode($arr);
		}
	}else if($_POST['name']==='removeuser'){
		$value='DELETE FROM Users WHERE UserID='.$_POST["id"].';';
		$rs=$conn->query($value);
		if($rs===false)echo '0';else echo '1';
	}else if($_POST['name']==='removeusers'){
		foreach (json_decode($_POST['users']) as $key => $value) {
			$value='DELETE FROM Users WHERE UserID='.$value.';';
			$rs=$conn->query($value);
			if($rs===false){echo '0';return;}
		}
		echo '1';
	}else if($_POST['name']==='checkuser'){
		$value='UPDATE USERS SET Checked=1 WHERE UserID='.$_POST["id"].';';
		$rs=$conn->query($value);
		if($rs===false)echo '0';else echo '1';
	}else if($_POST['name']==='checkusers'){
		foreach (json_decode($_POST['users']) as $key => $value) {
			$value='UPDATE USERS SET Checked=1 WHERE UserID='.$value.';';
			$rs=$conn->query($value);
			if($rs===false){echo '0';return;}
		}
		echo '1';
	}else if($_POST['name']==='repair'){
		if(strlen($_POST['pass'])>0)$value='UPDATE Users SET Password="'.sha1($_POST["pass"]).'", Name="'.$_POST["name1"].'", Username="'.$_POST["uname"].'",Surname="'.$_POST["sname"].'",Contact="'.$_POST["contact"].'" WHERE UserID='.$_POST["id"].';';
		else $value='UPDATE Users SET Name="'.$_POST["name1"].'", Username="'.$_POST["uname"].'",Surname="'.$_POST["sname"].'",Contact="'.$_POST["contact"].'" WHERE UserID='.$_POST["id"].';';
		$rs=$conn->query($value);
		if($rs===false)echo '0';else echo '1';
	}

?>