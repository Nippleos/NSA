<?php
	session_start();
	if(!(isset($_SESSION['user']))){
		header('Location:web_login.php');
		exit();
	}
	include '/../include/connect_database.php';
	if($_POST['name']==='get_all'){
		if($_POST['statusid']>2){
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
		if($rs===false)echo '0'; else echo '1';
	}


?>