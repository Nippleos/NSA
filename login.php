<?php
session_start();
if(isset($_POST['submit'])){
	global $conn;
	$conn=new mysqli('localhost','admgorant','nahod5afekt','anaslex');
	if ($conn->connect_error) {
		$error_message="Napaka pri povezavi z bazo: ".$conn->connect_error;
		echo '<script type="text/javascript">alert("'.$error_message.'");</script>';
		header('Location: login.php');
		exit();
	}else{
		header('Location: first.php');
	}
}


?><!DOCTYPE html>
<html>
<head>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</head>

<body>
<form method="post" action="login.php">
	Uporabniško ime: <input type="text" name="username"><br>
	Geslo: <input type="password" name="password"><br>
	<input type="submit" name="submit">
</form>
</body>
</html>