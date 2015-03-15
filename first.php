<?php
	session_start();
	if(isset($_SESSION['user'])){
		echo '<h1>WELCOME '.$_SESSION["user"].'</h1>';
		//print_r($_SESSION);
	}
?><!DOCTYPE html>
<html>
<head>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</head>
<body>

<script>

</script>
</body>
</html>