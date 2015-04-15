<?php
	session_start();
	if(isset($_SESSION['user'])){
		include 'include/connect_database.php';
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
					<li><a href="#">Page 2</a></li>
					<li><a href="#">Page 3</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li><a id="glyphicon-registration-mark" href="#"><span class="glyphicon glyphicon-registration-mark"></span> New users</a></li>
					<li><a href="#"><span class="glyphicon glyphicon-user"></span> Settings</a></li>
					<li><a id="logout" href="#"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>

				</ul>
			</div>
		</div>
	</nav>
	<div class="container">
		<div class="jumbotron">
		</div>
		<div class="clearfix visible-lg"></div>
		<div class="row">
		<div class="col-md-3">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget ligula finibus felis ullamcorper pellentesque. Phasellus quis lobortis urna. Curabitur in vehicula lectus. Phasellus pharetra, lacus eu sollicitudin tincidunt, ex elit rutrum nisl, non placerat urna dolor at justo. Aenean ultrices pharetra pretium. Vestibulum maximus tempus ex ac auctor. Integer dapibus dui nisl, nec porta leo vulputate vitae. Praesent auctor sapien lacinia, scelerisque ipsum non, laoreet quam. Vestibulum sit amet metus posuere, iaculis ex eget, ultrices ipsum. Pellentesque lobortis blandit augue, a blandit urna euismod ut. Integer a nunc ut orci blandit bibendum. Donec vel facilisis tortor, non rutrum orci. Integer id consequat dui.
				Ut a lacus dapibus, facilisis ex nec, mattis eros. Fusce sodales finibus consectetur. In facilisis mi libero, eu ornare nisl sollicitudin id. Duis commodo felis eros, vel dapibus nisl eleifend sit amet. Suspendisse sit amet porta ipsum. Morbi vel nisi volutpat, sollicitudin ligula elementum, aliquet turpis. Sed finibus est in risus rhoncus hendrerit. Ut eleifend diam odio, a eleifend magna sodales sit amet. Duis non ex purus. Nulla id justo lectus. Vivamus ornare tempor elit sed bibendum. Vivamus maximus at orci ac porttitor. Curabitur vitae justo fermentum, ultrices risus ut, bibendum felis. Maecenas at nisl fringilla, maximus ante at, ultrices metus. Vestibulum nunc ligula, faucibus nec urna in, tristique mollis risus. Morbi semper sit amet nunc ac dictum.
			</p>
	    </div>
	</div>	
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		//$('#topbar').remove();
		$('#logout').on('click',function(){
			document.location = 'web_logout.php';
		});
		$('#glyphicon-registration-mark').on('click',function(){

		});
	</script>
</body>
</html>