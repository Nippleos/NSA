//jquery.js
$('#logout').on('click',function(){
	document.location = 'web_logout.php';
});
generally();
function generally(){ //check user status
	if($('#session_info #p_statusid').text()<3){
		//check how much new users are here
		var xmlhttp=new XMLHttpRequest();
		var parameters="name=countusers";
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				var data=JSON.parse(xmlhttp.responseText);
				if(data>0 && data<100){
					$('.numberCircle').css('width','15px');
					$('#glyphicon-registration-mark').append('<div class="numberCircle">'+data+'</div>');
				}else if(data>100){
					$('#glyphicon-registration-mark').append('<div class="numberCircle">+100</div>');
					$('.numberCircle').css({'width':'30px'});					
				}
			}
		}
		xmlhttp.open("POST","ajax/ajax_new_users.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(parameters);
	}else{
		$('#glyphicon-registration-mark').remove();
		$('#glyphicon-bookmark').remove();
		$('#glyphicon-list-alt').remove(); //assigneemnts
	}
}
function hide_container(){
	$('.content1').hide(); //table of new users requests
}

$('#glyphicon-list-alt').on('click',function(){
	hide_container();
});

$('#glyphicon-bookmark').on('click',function(){
	hide_container();
});

$('#glyphicon-registration-mark').on('click',function(){
	hide_container();
	$('.content1').show();
	var xmlhttp=new XMLHttpRequest();
	var parameters="name=get_all&userid="+$('#session_info #p_statusid').text();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			var data=JSON.parse(xmlhttp.responseText);
			$('#new_users_table').empty();
			$('#new_users_table').append('<tr><th></th><th>User ID</th><th>Username</th><th>Name</th><th>Surname</th><th>Emso</th><th>Status ID</th><th>Toys</th></tr>');
			if("empty" in data){
				$('#new_users_table').empty();
				$('#new_users_table').append('<th>'+data['empty']+'</th>');
				return;
			}
			$.each(data,function(key,value){		
				$('#new_users_table').append('<tr id="new_users_tr'+value["UserID"]+'"><td><input type="checkbox" name="hmm" value="'+value["UserID"]+'"></td><td>'+value["UserID"]+'</td><td>'+value["Username"]+'</td><td>'+value["Name"]+'</td><td>'+value["Surname"]+'</td><td>'+value["Emso"]+'</td><td>'+value["StatusID"]+'</td><td><a id="glyphicon-remove'+value["UserID"]+'" href="#"><span class="glyphicon glyphicon-remove"></span></a> <a id="glyphicon-plus'+value["UserID"]+'" href="#"><span class="glyphicon glyphicon-plus"></span></a></td></tr>');
				$('#glyphicon-remove'+value["UserID"]).on('click',function(){
					var id=$(this).attr('id').replace('glyphicon-remove','');
					var xmlhttp=new XMLHttpRequest();
					var parameters="name=removeuser&id="+id;
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200){
							var data=JSON.parse(xmlhttp.responseText);
							if(data===1){
								$('#new_users_tr'+id).remove();
							}
						}
					}
					xmlhttp.open("POST","ajax/ajax_new_users.php",true);
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xmlhttp.send(parameters);
				});
				$('#glyphicon-plus'+value["UserID"]).on('click',function(){
					var id=$(this).attr('id').replace('glyphicon-plus','');
					var xmlhttp=new XMLHttpRequest();
					var parameters="name=checkuser&id="+id;
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200){
							var data=JSON.parse(xmlhttp.responseText);
							if(data===1){
								$('#new_users_tr'+id).remove();
							}
						}
					}
					xmlhttp.open("POST","ajax/ajax_new_users.php",true);
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xmlhttp.send(parameters);
				});
			});
			$('#new_users_table').append('<tr id="new_users_lastrow"><td colspan="8"><img src="images/arrow_ltr.png" />&nbsp<input type="checkbox"> Mark all</input> <i style="margin-left:30px; margin-right:10px;">With marked: </i><a id="glyphicon-trash" href="#"><span class="glyphicon glyphicon-trash"></span></a><i> Delete requests </i><a id="glyphicon-ok"><span class="glyphicon glyphicon-ok"></span></a><i> Confirm requests</i></td></tr>');
			$('#new_users_lastrow input[type=checkbox]').on('click',function(){
				if($('#new_users_lastrow input[type=checkbox]:checked').length){
					$('#new_users_table td input[name=hmm]').each(function(){
						$(this).prop('checked', true);
					});
				}else{
					$('#new_users_table td input[name=hmm]').each(function(){
						$(this).prop('checked', false);
					});
				}
			});
			$('#new_users_lastrow #glyphicon-trash').on('click',function(){
				var vsi=[];
				$('#new_users_table input[name=hmm]:checked').each(function(){
					vsi.push($(this).val());
				});
				var xmlhttp=new XMLHttpRequest();
				var parameters="name=removeusers&users="+JSON.stringify(vsi);
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200) {
						var data=JSON.parse(xmlhttp.responseText);
						if(data===1){
							$.each(vsi,function(key,value){
								$('#new_users_tr'+value).remove();
							});
						}
					}
				}
				xmlhttp.open("POST","ajax/ajax_new_users.php",true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send(parameters);
			});
			$('#new_users_lastrow #glyphicon-ok').on('click',function(){
				var vsi=[];
				$('#new_users_table input[name=hmm]:checked').each(function(){
					vsi.push($(this).val());
				});
				var xmlhttp=new XMLHttpRequest();
				var parameters="name=checkusers&users="+JSON.stringify(vsi);
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200) {
						var data=JSON.parse(xmlhttp.responseText);
						if(data===1){
							$.each(vsi,function(key,value){
								$('#new_users_tr'+value).remove();
							});
						}
					}
				}
				xmlhttp.open("POST","ajax/ajax_new_users.php",true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send(parameters);
			});
		}
	}
	xmlhttp.open("POST","ajax/ajax_new_users.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
});

$('#glyphicon-user').on('click',function(){
	hide_container();
});

$('').on('click',function(){
	
});
