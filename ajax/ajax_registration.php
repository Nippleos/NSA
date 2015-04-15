<?php
	session_start();
	include '/../include/connect_database.php';
	if($conn->connect_error){
		echo json_encode('Database connection failed: '.$conn->connect_error);
	}else{
		$value='SELECT Username FROM Users WHERE Username="'.mysqli_real_escape_string($conn,$_POST["username"]).'";';
		$rs=$conn->query($value);
		if($rs===false){
			echo json_encode("Database error.");
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			if(!empty($arr)){
				echo json_encode("Username: ".$_POST['username']." is already used. Choose another one");
			}else{
				$a=array();
				foreach ($_POST as $key=>$value) {
					if($key==="password"){
						$value=sha1($value);
					}
					$a[]=mysqli_real_escape_string($conn,$value);
				}
				$value='INSERT INTO Users VALUES(NULL,"'.$a[0].'","'.$a[1].'","'.$a[2].'","'.$a[3].'",CURRENT_DATE,"'.$a[4].'",0,"user");';
				$rs=$conn->query($value);
				if($rs===false){
					echo json_encode("Unknown error.");
				}else{
					echo json_encode("1");
				}
			}			
		}
		
	}
?>