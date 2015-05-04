<?php
session_start();
if(isset($_POST['submit'])){
	include 'include/connect_database.php';
	if ($conn->connect_error){
		$error_message="Error: ".$conn->connect_error;
		echo '<script>alert("'.$error_message.'"); window.location.href="web_login.php"; </script>';
		exit();
	}else{
		$value='SELECT Name,Username,StatusID,UserID FROM Users WHERE Username="'.mysqli_real_escape_string($conn,$_POST["username"]).'" AND Password="'.sha1($_POST["password"]).'" AND Checked=1;';
		$rs=$conn->query($value);
		if($rs===false){
			echo '<script>alert("Wrong SQL: '.$conn->error.'"); window.location.href="web_login.php"; </script>';
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			if(empty($arr)){
				echo '<script>alert("We were unable to verify your login. Either your login information was entered incorrectly, or the account system is currently unavailable."); window.location.href="web_login.php"; </script>';
			}else{
				$_SESSION['userid']=$arr[0]['UserID'];
				$_SESSION['user']=$arr[0]['Name'];
				$_SESSION['username']=$arr[0]['Username'];
				$_SESSION['status']=$arr[0]['StatusID'];
				echo '<script>window.location.href="web_first.php"; </script>';
				exit();
			}			
		}
	}
}
?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> <!-- za responsive webpage -->
	<link rel="stylesheet" type="text/css" href="css/login.css" />
	<link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script><!-- jquery-->
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" /><!-- jquery ui-->
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script><!-- jquery ui-->
	
</head>
<body>
<div class="container">
	<h1>LOGIN</h1><hr/><br>
	<form id="login_form" method="post" action="web_login.php">
		<label id="icon" for="username"><i class="icon-user"></i></label>
		<input type="text" name="username" id="username" placeholder="Username" autofocus required/>
		<label id="icon" for="name"><i class="icon-shield"></i></label>
		<input type="password" name="password" id="password" placeholder="Password" required/>
		<a href="#" class="button" id="log_in">Log in</a>
		<a href="#" class="button" id="new_user">New user</a>
		<input type="submit" name="submit" id="submit_button" hidden/>
	</form><br><br><br><br>
	<hr>

</div>
</body>
<script type="text/javascript">
	$('#log_in').on('click',function(){
		$('#submit_button').trigger('click');
	});
	$('#new_user').on('click',function(){
		window.location.href="web_registration.php";
	});
</script>
</html>