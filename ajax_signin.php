<?php
	session_start();
	$conn=new mysqli('localhost','admgorant','nahod5afekt','anaslex');
	mysqli_set_charset($conn, "utf8");
	if($conn->connect_error){
		echo json_encode('Database connection failed: '.$conn->connect_error);
	}else{
		$value='SELECT Username FROM Users WHERE Username="'.$_POST["username"].'";';
		$rs=$conn->query($value);
		if($rs===false){
			echo json_encode("Database error.");
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			if(!empty($arr)){
				echo json_encode("Username: ".$_POST['username']." is already used. Choose another one");
			}else{
				$a=array();
				foreach ($_POST as $key) {
					$a[]=mysqli_real_escape_string($conn,$key);
				}
				$value='INSERT INTO Users VALUES(NULL,"3","'.$a[0].'","'.$a[1].'","'.$a[2].'","'.$a[3].'","'.$a[4].'");';
				$rs=$conn->query($value);
				if($rs===false){
					echo json_encode("Unknown error: ".$conn->error);
				}else{
					echo json_encode("1");
				}
			}			
		}
		
	}
?>