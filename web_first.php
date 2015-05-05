<?php
	session_start();
	if(isset($_SESSION['user'])){
		include 'include/connect_database.php';
		echo '<div id="session_info" hidden><p id="p_username">'.$_SESSION["username"].'</p><p id="p_statusid">'.$_SESSION["status"].'</p><p id="p_userid">'.$_SESSION["userid"].'</p></div>';
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
	<link rel="stylesheet" type="text/css" href="css/first.css" />
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
					<!--<li><a href="#">Page 1</a></li>-->
				</ul>
				<ul class="nav navbar-nav navbar-right">				
					<li><a id="glyphicon-list-alt" href="#"><span class="glyphicon glyphicon-list-alt"></span> Exams</a></li>
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
		
		<div class="content1" style="display:none">
			<h2>Playing with exams</h2>
			<div class="list-group" id="exams_list_group">
				<a href="#" id="first_choose_of_exams_list" class="list-group-item">
					<h4 class="list-group-item-heading">Create new exam & collection</h4>
					<p class="list-group-item-text">Copy, edit old or create new one</p>
				</a>
				<a href="#" id="second_choose_of_exams_list" class="list-group-item">
					<h4 class="list-group-item-heading">Show exams</h4>
					<p class="list-group-item-text">List all created</p>
				</a>
				<a href="#" id="third_choose_of_exams_list" class="list-group-item">
					<h4 class="list-group-item-heading">Edit exams</h4>
					<p class="list-group-item-text">Do whatever you want (delete/edit)</p>
				</a>
				<a href="#" id="fourth_choose_of_exams_list" class="list-group-item">
					<h4 class="list-group-item-heading">Edit collections</h4>
					<p class="list-group-item-text">Do whatever you want (delete/edit)</p>
				</a>
			</div>
			<div class="table-responsive">
				<table class="table" id="new_exams_table"></table>
			</div>
		</div>
		<div class="content2" style="display:none">
			<div class="table-responsive">
				<table class="table" id="table_of_exams"></table>
			</div>
		</div>
		<div class="content3" style="display:none">
			<div class="table-responsive">
				<table class="table" id="new_users_table"></table>
			</div>
		</div>
		<div class="content4" style="display:none">
			<div class="table-responsive">
				<table class="table" id="users_table"></table>
			</div>
		</div>
	</div>	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<script src="include/jquery.js"></script>
	<script src="include/bootstrap.js"></script>
	<script src="include/bootbox.min.js"></script><!-- dialog etc-->
</body>
</html>