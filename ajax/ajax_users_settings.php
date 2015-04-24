<?php
	session_start();
	if(!(isset($_SESSION['user']))){
		header('Location:web_login.php');
		exit();
	}
	if($_POST['name']==='getall'){
		$value='SELECT * FROM Users WHERE Checked=1;';
		$rs=$conn->query($value);
		if($rs===false){
			echo '0';
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			if(count($arr)<1){echo json_encode(array("empty"=>"There are no new users requests."));return;}
			echo json_encode($arr);
		}
	}

?>