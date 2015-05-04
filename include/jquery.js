//jquery.js
$('#logout').on('click',function(){
	document.location = 'web_logout.php';
});
generally();
function generally(){ //check user status
	if($('#session_info #p_statusid').text()<3){
		if($('#session_info #p_statusid').text()==1){
			$('#glyphicon-list-alt').remove();
			$('#glyphicon-bookmark').remove();
		}
		count_new_users();//check how much new users are here
	}else{
		$('#glyphicon-registration-mark').remove();
		$('#glyphicon-bookmark').remove();
		$('#glyphicon-list-alt').remove(); //assigneemnts
	}
}
function count_new_users(){
	var xmlhttp=new XMLHttpRequest();
	var parameters="name=countusers";
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var data=JSON.parse(xmlhttp.responseText);
			if(data>0 && data<100){				
				$('.numberCircle').remove();
				$('#glyphicon-registration-mark').append('<div class="numberCircle">'+data+'</div>');
				$('.numberCircle').css('width','15px');
			}else if(data>100){
				$('.numberCircle').remove();
				$('#glyphicon-registration-mark').append('<div class="numberCircle">+100</div>');
				$('.numberCircle').css({'width':'30px'});					
			}else{
				$('.numberCircle').remove();
			}
		}
	}
	xmlhttp.open("POST","ajax/ajax_new_users.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
}
function hide_container(){
	$('.content1').hide(); //exams
	$('.content2').hide(); //requests
	$('.content3').hide(); //table of new users requests
	$('.content4').hide(); //settings
}

$('#glyphicon-list-alt').on('click',function(){
	hide_container();
	$('.content1').show();
	$('').append();
});

$('#glyphicon-bookmark').on('click',function(){
	hide_container();
	$('.content2').show();
});

$('#glyphicon-registration-mark').on('click',function(){
	hide_container();
	$('.content3').show();
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
				$('.numberCircle').remove();
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
								count_new_users();
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
								count_new_users();
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
							count_new_users();
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
							count_new_users();
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
	$('.content4').show();
	var xmlhttp=new XMLHttpRequest();
	var parameters="name=get_all&statusid="+$('#session_info #p_statusid').text()+"&username="+$('#session_info #p_username').text();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			var data=JSON.parse(xmlhttp.responseText);
			$('#users_table').empty();
			$('#users_table').append('<tr><th></th><th>User ID</th><th>Username</th><th>Name</th><th>Surname</th><th>Emso</th><th>Status ID</th><th>Toys</th></tr>');
			if("empty" in data){
				$('#users_table').empty();
				$('#users_table').append('<th>'+data['empty']+'</th>');
				return;
			}
			$.each(data,function(key,value){
				if(value["Username"]===$('#session_info #p_username').text()){
					$('#users_table').append('<tr id="user_tr'+value["UserID"]+'"><td></td><td>'+value["UserID"]+'</td><td id="users_uname">'+value["Username"]+'</td><td id="users_name">'+value["Name"]+'</td><td id="users_surname">'+value["Surname"]+'</td><td id="users_emso">'+value["Emso"]+'</td><td id="users_status">'+value["StatusID"]+'</td><td><a id="glyphicon-edit'+value["UserID"]+'" href="#"><span class="glyphicon glyphicon-edit"></span></a></td></tr>');
				}else{
					$('#users_table').append('<tr id="user_tr'+value["UserID"]+'"><td></td><td>'+value["UserID"]+'</td><td id="users_uname">'+value["Username"]+'</td><td id="users_name">'+value["Name"]+'</td><td id="users_surname">'+value["Surname"]+'</td><td id="users_emso">'+value["Emso"]+'</td><td id="users_status">'+value["StatusID"]+'</td><td><a id="glyphicon-edit'+value["UserID"]+'" href="#"><span class="glyphicon glyphicon-edit"></span></a> <a id="glyphicon-remove'+value["UserID"]+'" href="#"><span class="glyphicon glyphicon-remove"></span></a></td></tr>');
				}
				$('#users_table #glyphicon-remove'+value["UserID"]).on('click',function(){
					var xmlhttp=new XMLHttpRequest();
					var parameters="name=remove_user&userid="+value["UserID"];
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200) {
							var data=JSON.parse(xmlhttp.responseText);
							if(data!=0){
								$('#users_table #user_tr'+data).remove();
							}
						}
					}
					xmlhttp.open("POST","ajax/ajax_users_settings.php",true);
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xmlhttp.send(parameters);
				});
				$('#users_table #glyphicon-edit'+value["UserID"]).on('click',function(){
					var id=$(this).attr("id").replace('glyphicon-edit','');
					var a=bootbox.dialog({
						title: "Change "+$('#users_table #glyphicon-edit'+id).parent().parent().find("#users_uname").text()+"'s informations",
						onEscape: function(){},
						backdrop: true,
						message: 
							'<div class="row"><div class="col-md-12"> ' +
								'<form class="form-horizontal"> ' +
									'<div class="form-group"> ' +
										'<label class="col-md-4 control-label" for="uname">Username</label>' +
										'<div class="col-md-4"> ' +
											'<input id="uname" name="uname" type="text" placeholder="Username" value="'+$("#users_table #user_tr"+id+" #users_uname").text()+'" class="form-control input-md">' +
										'</div> ' +
									'</div> '+
									'<div class="form-group"> ' +
										'<label class="col-md-4 control-label" for="name">Name</label>' +
										'<div class="col-md-4"> ' +
											'<input id="name" name="name" type="text" placeholder="Name" value="'+$("#users_table #user_tr"+id+" #users_name").text()+'" class="form-control input-md">'+
										'</div> ' +
									'</div> '+
									'<div class="form-group"> ' +
										'<label class="col-md-4 control-label" for="surname">Surname</label>'+
										'<div class="col-md-4"> ' +
											'<input id="surname" name="surname" type="text" placeholder="Surname" value="'+$("#users_table #user_tr"+id+" #users_surname").text()+'" class="form-control input-md">'+
										'</div> ' +
									'</div> '+
									'<div class="form-group"> ' +
										'<label class="col-md-4 control-label" for="emso">Emšo</label>'+
										'<div class="col-md-4"> ' +
											'<input id="emso" name="emso" type="text" placeholder="Emšo" value="'+$("#users_table #user_tr"+id+" #users_emso").text()+'" class="form-control input-md">'+
										'</div> ' +
									'</div> '+
									'<div class="form-group" id="status_change_div"> ' +
										'<label class="col-md-4 control-label" for="status">Status</label>'+
										'<div class="col-md-4"> ' +
											'<input id="status" name="status" type="text" placeholder="Status" value="'+$("#users_table #user_tr"+id+" #users_status").text()+'" class="form-control input-md">'+
										'</div> ' +
									'</div> '+
									'<div class="form-group"> ' +
										'<label class="col-md-4 control-label" for="password">New password</label>'+
										'<div class="col-md-4"> ' +
											'<input id="password" name="password" type="text" placeholder="New password" class="form-control input-md">'+
										'</div> ' +
									'</div> '+
								'</form>'+
							'</div> </div>',
						buttons: {
							danger: {
								label: "Cancel",
								className: "btn-danger",
								callback: function() {
									
								}
							},
							success: {
								label: "Save",
								className: "btn-success",
								callback: function () {
									var xmlhttp=new XMLHttpRequest();
									var parameters="name=update_user&userid="+id+"&uname="+$('.col-md-4 input[id=uname]').val()+"&firstname="+$('.col-md-4 input[id=name]').val()+"&surname="+$('.col-md-4 input[id=surname]').val()+"&emso="+$('.col-md-4 input[id=emso]').val()+"&status="+$('.col-md-4 input[id=status]').val()+"&password="+$('.col-md-4 input[id=password]').val();
									xmlhttp.onreadystatechange=function(){
										if(xmlhttp.readyState==4 && xmlhttp.status==200) {
											var data=JSON.parse(xmlhttp.responseText);
											if(data===1){
												$('#glyphicon-user').trigger('click');
												bootbox.hideAll();												
											}
										}
									}
									xmlhttp.open("POST","ajax/ajax_users_settings.php",true);
									xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
									xmlhttp.send(parameters);
									Example.show("Success!");
								}
							}
						}
					});
					if($('#session_info #p_statusid').text()!=1){
						$('#status_change_div').remove();
					}
					
				});
			});
			$('#users_table').append('<tr id="users_table_lastrow"><td colspan="8"></td></tr>');			
		}
	}
	xmlhttp.open("POST","ajax/ajax_users_settings.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
});

$('#glyphicon-list-alt').on('click',function(){
	hide_container();
	$('.content1').show();
	/********************** creating new exams ********************/
	$('#first_choose_of_exams_list').on('click',function(){
		$('#exams_list_group').hide();
		$('.content1 h2').prepend('<a id="glyphicon-list-alt" href="#"><span id="home_button" class="glyphicon glyphicon-home"></span></a> ');
		$('.content1').append('<h3>New exams</h3>');
		$('.content1 #home_button').on('click',function(){
			$('.content1 h3').remove();
			$(this).remove();
			$('#new_exams_div').remove();
			$('.content1 #exams_list_group').show();
		});
		/* check if prof. created any collection */
		var xmlhttp=new XMLHttpRequest();
		var parameters="name=checkcollections&userid="+$('#session_info #p_userid').text();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				var data=JSON.parse(xmlhttp.responseText);
				$('.content1').append('<div id="new_exams_div"><table id="new_exams_table"></table></div>')
				if("empty" in data){
					$('#new_exams_table').empty();
					$('#new_exams_table').append('<tr><th>'+data["empty"]+'</th></tr>');
					$('#new_exams_table').append('<tr id="new_exams_lastrow"><td><a id="glyphicon-book" href=#><span class="glyphicon glyphicon-book"></span> Make new collection</a></td></tr>')
					return;
				}
			}
		}
		xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(parameters);
		$('#new_exams_table #new_exams_lastrow #glyphicon-book').on('click',function(){
			new_collection_dialog();
		});
		/*check if prof. created any collection */
	});
	/********************** showing exams ********************/
	$('#second_choose_of_exams_list').on('click',function(){
		$('#exams_list_group').hide();
		$('.content1 h2').prepend('<a id="glyphicon-list-alt" href="#"><span id="home_button" class="glyphicon glyphicon-home"></span></a> ');
		$('.content1').append('<h3>List of exams</h3>');
		$('.content1 #home_button').on('click',function(){
			$('.content1 h3').remove();
			$(this).remove();
			$('.content1 #exams_list_group').show();
		});
	});
	/********************** editing exams ********************/
	$('#third_choose_of_exams_list').on('click',function(){
		$('#exams_list_group').hide();
		$('.content1 h2').prepend('<a id="glyphicon-list-alt" href="#"><span id="home_button" class="glyphicon glyphicon-home"></span></a> ');
		$('.content1').append('<h3>Editing/deleting exams</h3>');
		$('.content1 #home_button').on('click',function(){
			$('.content1 h3').remove();
			$(this).remove();
			$('.content1 #exams_list_group').show();
		});
	});
});

function new_collection_dialog(){
	var a=bootbox.dialog({
	title: "Setting up new collection",
	onEscape: function(){},
	backdrop: true,
	message: 
		'<div class="row"><div class="col-md-12"> ' +
			'<form class="form-horizontal"> ' +
				'<div class="form-group"> ' +
					'<label class="col-md-4 control-label" for="coll_name">Set name</label>' +
					'<div class="col-md-4"> ' +
						'<input id="coll_name" name="coll_name" type="text" placeholder="Collection name" class="form-control input-md">' +
					'</div> ' +
				'</div> '+
			'</form>'+
		'</div> </div>',
	buttons: {
		danger: {
			label: "Cancel",
			className: "btn-danger",
			callback: function() {
				
			}
		},
		success: {
			label: "Create",
			className: "btn-success",
			callback: function () {
				var xmlhttp=new XMLHttpRequest();
				var parameters="name=createcollection&userid="+$('#session_info #p_userid').text()+"&name="+$('.col-md-4 input[id=coll_name]').val();
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200) {
						var data=JSON.parse(xmlhttp.responseText);
						if(data===1){
							bootbox.hideAll();												
						}
					}
				}
				xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send(parameters);
				Example.show("Success!");
			}
		}
	}
});

}