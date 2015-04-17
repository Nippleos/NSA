<?php
	session_start();
	if(isset($_SESSION['user'])){
		include 'include/connect_database.php';
		echo '<div id="session_info" hidden><p id="p_username">'.$_SESSION["username"].'</p><p id="p_statusid">'.$_SESSION["status"].'</p></div>';
	}else{
		header('Location:web_login.php');
		exit();
	}

?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Nippleos-ERS</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span> 
				</button>
				<a class="navbar-brand" href="#">Nippleos - ERS</a>
			</div>
			<div class="collapse navbar-collapse" id="myNavbar">
				<ul class="nav navbar-nav">
					<li class="active"><a href="#">Home</a></li>
					<li><a href="#">Page 1</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li><a id="glyphicon-bookmark" href="#"><span class="glyphicon glyphicon-bookmark"></span> Requests</a></li>
					<li><a id="glyphicon-registration-mark" href="#"><span class="glyphicon glyphicon-registration-mark"></span> New users</a></li>
					<li><a id="glyphicon-user" href="#"><span class="glyphicon glyphicon-user"></span> Settings</a></li>
					<li><a id="logout" href="#"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="container">
		<div class="jumbotron">
		</div>
		
		<div class="row">
		<div class="table-responsive">
			<table class="table" id="new_users_table">				
			</table>
		</div>
	</div>	
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<script src="include/jquery.js"></script>
</body>
</html>