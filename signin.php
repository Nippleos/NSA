<?php
?><!DOCTYPE html>
<html>
<head>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</head>

<body>
	<form id="registration">
		Username:<input type="text" id="username" placeholder="Username" name="Username" maxlength="20" required autofocus><br>
		Password:<input type="password" placeholder="Password" name="Password" maxlength="40" required><br>
		Name:<input type="text" placeholder="Name" name="Name" maxlength="20" required><br>
		Surname:<input type="text" placeholder="Surname" name="Surname" maxlength="20" required><br>
		Emso:<input type="number" placeholder="Emšo" name="emso" onKeyDown="if(this.value.length==13) return false;" required><br>
		<input type="button" value="Sign in" id="sign_in"><br>
	</form>
<script>
	$('#sign_in').on('click',function(){
		var xmlhttp=new XMLHttpRequest(); 
		var username=encodeURIComponent($("#registration input[name=Username]").val());
		var password=encodeURIComponent($("#registration input[name=Password]").val());
		var name=encodeURIComponent($("#registration input[name=Name]").val());
		var surname=encodeURIComponent($("#registration input[name=Surname]").val());
		var emso=encodeURIComponent($("#registration input[name=emso]").val());
		var parameters="username="+username+"&password="+password+"&name="+name+"&surname="+surname+"&emso="+emso;
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200) {
				var data=JSON.parse(xmlhttp.responseText);
				if(data==="1"){
					alert("Application was succesfull.")
					window.location.href="login.php";
				}
			}
		}
		xmlhttp.open("POST","ajax_signin.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(parameters);
	});
</script>

</body>
</html>