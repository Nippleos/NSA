//$('#topbar').remove();
$('#logout').on('click',function(){
	document.location = 'web_logout.php';
});

function generally(){
	
}

$('#glyphicon-registration-mark').on('click',function(){
	var xmlhttp=new XMLHttpRequest();
	var parameters="name=repair";
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			var data=JSON.parse(xmlhttp.responseText);
			alert('Uspešna sprememba');
			
		}
	}
	xmlhttp.open("POST","ajax/ajax_new_users.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
});

//$('#new_users_table').append();
	/*
	var xmlhttp=new XMLHttpRequest();
	var parameters="name=get_all";
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			var data=JSON.parse(xmlhttp.responseText);
			if(data===0){
				
			}else{ 
				$.each(data,function(key,value){
					if(key==='user'){
						close_divs(); //zapres vse kar je v <div id="content">->sredinski del
						sidebar_children_hide(); //skrijes sidebars podelemente
						$('#chart').hide();
						$('#chart1').hide();
						$('#first').show();
						$('#users_div').empty();			
						$('#users_div').append('<table id="users_table"><th>Uporabniško ime</th><th>Ime</th><th>Priimek</th><th>Datum pristopa</th><th>Kontakt</th><th></th></table>');
						$('#users_table').append('<tr id="users_tr_'+value["UserID"]+'"><td id="uname">'+value["Username"]+'</td><td id="name">'+value["Name"]+'</td><td id="surname">'+value["Surname"]+'</td><td>'+value["Datum"]+'</td><td id="contact">'+value["Contact"]+'</td><td><img class="user_img" style="margin-right:3px" id="repair_user_'+value["UserID"]+'" src="images/pencil.png"></td></tr>');
						$('#repair_user_'+value["UserID"]).on('click',function(){
							repair_users($(this).attr('id').replace('repair_user_',''));
						});
						return false;
					}else{
						close_divs(); //zapres vse kar je v <div id="content">->sredinski del
						sidebar_children_hide(); //skrijes sidebars podelemente
						$('#chart').hide();
						$('#chart1').hide();
						$('#first').show();
						$('#users_div').empty();			
						$('#users_div').append('<table id="users_table"><th>Uporabniško ime</th><th>Ime</th><th>Priimek</th><th>Datum</th><th>Kontakt</th><th>Potrjen</th><th>Potrdi/izbriši</th></table>');
						$.each(data[1],function(key,val){
							if(val['Checked']==1)var potrjen='Da';else var potrjen='Ne';
							$('#users_table').append('<tr id="users_tr_'+val["UserID"]+'"><td id="uname">'+val["Username"]+'</td><td id="name">'+val["Name"]+'</td><td id="surname">'+val["Surname"]+'</td><td>'+val["Datum"]+'</td><td id="contact">'+val["Contact"]+'</td><td id="checked_td">'+potrjen+'</td><td><img class="user_img" style="margin-right:3px" id="remove_user_'+val["UserID"]+'" src="images/remove.png"><img class="user_img" style="margin-right:3px" id="repair_user_'+val["UserID"]+'" src="images/pencil.png"><img class="user_img" id="check_user_'+val["UserID"]+'" src="images/check.png" style="margin-right:3px"></td></tr>');
							$('#check_user_'+val["UserID"]).on('click',function(){
								var xmlhttp=new XMLHttpRequest();
								var parameters="name=checkuser&id="+val["UserID"];
								xmlhttp.onreadystatechange=function() {
									if(xmlhttp.readyState==4 && xmlhttp.status==200) {
										var data=JSON.parse(xmlhttp.responseText);
										if(data===1){
											$('#users_tr_'+val["UserID"]+' #checked_td').text('Da');
											alert('Uporabnik se lahko zdaj prijavi.');
										}
									}
								}
								xmlhttp.open("POST","ajax/ajax_get_users_info.php",true);
								xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
								xmlhttp.send(parameters);
							});
							$('#repair_user_'+val["UserID"]).on('click',function(){
								repair_users($(this).attr('id').replace('repair_user_',''));
							});

							$('#remove_user_'+val["UserID"]).on('click',function(){
								remove_users($(this).attr('id').replace('remove_user_',''));
							});
							$('#users_div').show();
							
						});
						return false;
					}
				});
			}
		}
	}
	xmlhttp.open("POST","ajax/ajax_get_users_info.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
	*/
