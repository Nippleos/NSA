<?php
	session_start();
	if(!(isset($_SESSION['user']))){
		header('Location:web_login.php');
		exit();
	}
	include '/../include/connect_database.php';
	if($_POST['name']==='get_all'){
		if($_POST['statusid']>1){
			$value='SELECT * FROM USERS WHERE Username="'.$_POST["username"].'";';
		}else{
			$value='SELECT * FROM Users WHERE Checked=1;';
		}
		$rs=$conn->query($value);
		if($rs===false){
			echo '0';
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			if(count($arr)<1){echo json_encode(array("empty"=>"There are no new users requests."));return;}
			echo json_encode($arr);
		}
	}else if($_POST['name']==='remove_user'){
		$value='DELETE FROM Users WHERE UserID='.$_POST["userid"].';';
		$rs=$conn->query($value);
		if($rs===false)echo '0'; else echo $_POST["userid"];
	}else if($_POST['name']==='update_user'){
		$uname=mysqli_real_escape_string($conn,$_POST["uname"]);
		$name=mysqli_real_escape_string($conn,$_POST["firstname"]);
		$surname=mysqli_real_escape_string($conn,$_POST["surname"]);
		$emso=mysqli_real_escape_string($conn,$_POST["emso"]);
		$status=mysqli_real_escape_string($conn,$_POST["status"]);
		$pass=sha1($_POST['password']);
		if(strcmp($status,'undefined')==0){
			if(strlen($_POST['password'])>0){
				$value='UPDATE USERS SET Username="'.$uname.'", Name="'.$name.'", Surname="'.$surname.'", EMSO="'.$emso.'", Password="'.$pass.'" WHERE UserID="'.$_POST["userid"].'";';
			}else{
				$value='UPDATE USERS SET Username="'.$uname.'", Name="'.$name.'", Surname="'.$surname.'", EMSO="'.$emso.'" WHERE UserID="'.$_POST["userid"].'";';
			}
		}else{
			if(strlen($_POST['password'])>0){
				$value='UPDATE USERS SET Username="'.$uname.'", Name="'.$name.'", Surname="'.$surname.'", EMSO="'.$emso.'", StatusID="'.$status.'", Password="'.$pass.'" WHERE UserID="'.$_POST["userid"].'";';
			}else{
				$value='UPDATE USERS SET Username="'.$uname.'", Name="'.$name.'", Surname="'.$surname.'", EMSO="'.$emso.'", StatusID="'.$status.'" WHERE UserID="'.$_POST["userid"].'";';
			}
		}
		$rs=$conn->query($value);
		if($rs===false){
			echo $conn->error;
		}else{
			echo '1';
		}
	}


?>