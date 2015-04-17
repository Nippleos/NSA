<?php
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
<div class="container2">
	<h1>Register</h1><hr/><br>
	<form id="registration" method="post">
		<label id="icon" for="username"><i class="icon-user"></i></label>
		<input type="text" name="username" id="username" placeholder="Username" autofocus required/>
		<label id="icon" for="password"><i class="icon-shield"></i></label>
		<input type="password" name="password" id="password" placeholder="Password" required/>
		<label id="icon" for="name"><img src="images/profile.png"></label>
		<input type="text" name="name" id="name" placeholder="Name" required>
		<label id="icon" for="surname"><img src="images/profile2.png"></label>
		<input type="text" name="surname" id="surname" placeholder="Surname" required>
		<label id="icon" for="emso"><img src="images/phone.png"></label>
		<input type="number" name="emso" id="emso" placeholder="Emšo" required>
		<a href="#" class="button" id="sign_in">Register</a>
	</form>
	<hr>
	<div id="return_back"><img src="images/back.png"></div>
</div>
<script>
	$('#sign_in').on('click',function(){
		var xmlhttp=new XMLHttpRequest(); 
		var username=encodeURIComponent($("#registration input[name=username]").val());
		var password=encodeURIComponent($("#registration input[name=password]").val());
		var name=encodeURIComponent($("#registration input[name=name]").val());
		var surname=encodeURIComponent($("#registration input[name=surname]").val());
		var contact=encodeURIComponent($("#registration input[name=emso]").val());
		var parameters="username="+username+"&password="+password+"&name="+name+"&surname="+surname+"&emso="+emso;
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200) {
				var data=JSON.parse(xmlhttp.responseText);
				if(data==="1"){
					alert("Application was succesfull. Once admin activate this account, you will be able to login.")
					window.location.href="web_login.php";
				}else{
					$("#registration input[name=username]").focus();
					alert(data);
				}
			}
		}
		xmlhttp.open("POST","ajax/ajax_registration.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(parameters);
	});
	$('#return_back').on('click',function(){
		window.location.href="web_login.php";
	});
</script>

</body>
</html>