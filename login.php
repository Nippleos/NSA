<?php
session_start();
if(isset($_POST['submit'])){
	global $conn;
	$conn=new mysqli('localhost','admgorant','nahod5afekt',"anaslex");
	if ($conn->connect_error){
		$error_message="Napaka pri povezavi z bazo: ".$conn->connect_error;
		echo '<script>alert("Wrong SQL: '.$error_message.'"); window.location.href="login.php"; </script>';
		exit();
	}else{
		$value='SELECT Username,Password FROM Users WHERE Username="'.sha1($_POST["username"]).'" AND Password="'.sha1($_POST["password"]).'";';
		$rs=$conn->query($value);
		if($rs===false){
			echo '<script>alert("Wrong SQL: '.$conn->error.'"); window.location.href="login.php"; </script>';
		}else{
			$arr=$rs->fetch_all(MYSQLI_ASSOC);
			echo '<script>alert("Napačni vpisni podatki. Vstvari novega ali pa popravi podatke."); window.location.href="login.php"; </script>';
		}
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
	<input type="submit" name="submit" value="Prijavi se">
</form>
<input type="button" value="Nov uporabnik" id="new_user">
<script>
	$('#new_user').on('click',function(){
		window.location.href="signin.php";
	});
</script>

</body>
</html>