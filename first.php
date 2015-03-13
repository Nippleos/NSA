<?php
	session_start();
	if(isset($_SESSION['user'])){

	}else{
		header('Location: login.php');
		exit;
	}
?><!DOCTYPE html>
<html>
<head>

</head>
<body>
<h1>WELCOME</h1>
</body>
</html>