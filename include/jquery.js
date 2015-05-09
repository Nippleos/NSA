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
				$('#new_users_table #glyphicon-remove'+value["UserID"]).on('click',function(){
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
				$('#new_users_table #glyphicon-plus'+value["UserID"]).on('click',function(){
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
	$('#new_exams_div').remove();
	$('#new_exams_table').empty();
	$('.content1 #home_button').remove();
	$('.content1 h3').remove();
	$('#exams_list_group').show();
	$('#tmp_table').remove();
	$('#legend').remove();
	$('#table_of_exams').empty();
	$('#table_of_editable_exams').empty();

});
/********************** creating new exams ********************/
$('#first_choose_of_exams_list').on('click',function(){
	$('#exams_list_group').hide();
	$('.content1 h2').prepend('<a id="glyphicon-list-alt" href="#"><span title="Back" id="home_button" class="glyphicon glyphicon-home"></span></a> ');
	$('.content1 #home_button').on('click',function(){
		$('.content1 h3').remove();
		$(this).remove();
		$('#new_exams_div').remove();
		$('.content1 #exams_list_group').show();
		$('#new_exams_table').empty();
		$('#tmp_table').remove();
	});
	/* check if prof. created any collection */
	var xmlhttp=new XMLHttpRequest();
	var parameters="name=checkcollections&userid="+$('#session_info #p_userid').text();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var data=JSON.parse(xmlhttp.responseText);
			if("empty" in data){
				$('#new_exams_table').empty();
				$('#new_exams_table').append('<tr><th>'+data["empty"]+'</th></tr>');
				$('#new_exams_table').append('<tr id="new_exams_lastrow"><td><a id="glyphicon-book" href=#><span class="glyphicon glyphicon-book"></span><span> Make new collection</span></a></td></tr>')
				$('#new_exams_table #new_exams_lastrow #glyphicon-book').on('click',function(){
					new_collection_dialog();
				});
				return;
			}else{
				$('#new_exams_table').empty();
				$('#new_exams_table').append('<tr><th></th><th>Collection name</th><th>Number of exams</th><th>Add exam</th><th>Change coll. name</th></tr>');
				$.each(data,function(key,value){
					if(value['Count']>99) $('#new_exams_table').append('<tr id="new_exams_tr'+value["CollectionID"]+'"><td><input type="checkbox" name="hmm" value="'+value["CollectionID"]+'"></td><td id="collection_name">'+value["CollectionName"]+'</td><td><a href="#"><span class="badge">>99</span></a></td><td><a id="glyphicon-plus-sign'+value["CollectionID"]+'" href="#"><span class="glyphicon glyphicon-plus-sign"></span></a></td><td><a id="glyphicon-edit'+value["CollectionID"]+'" href="#"><span class="glyphicon glyphicon-edit"></span></a></td></tr>');
					else $('#new_exams_table').append('<tr id="new_exams_tr'+value["CollectionID"]+'"><td><input type="checkbox" name="hmm" value="'+value["CollectionID"]+'"></td><td id="collection_name">'+value["CollectionName"]+'</td><td><a href="#"><span class="badge">'+value["Count"]+'</span></a></td><td><a id="glyphicon-plus-sign'+value["CollectionID"]+'" href="#"><span class="glyphicon glyphicon-plus-sign"></span></a></td><td><a id="glyphicon-edit'+value["CollectionID"]+'" href="#"><span class="glyphicon glyphicon-edit"></span></a></td></tr>');
					$('#new_exams_table #glyphicon-plus-sign'+value["CollectionID"]).on('click',function(){
						var id=$(this).attr("id").replace('glyphicon-plus-sign','');
						new_exam_dialog(id);
					});
					$('#new_exams_table #glyphicon-edit'+value["CollectionID"]).on('click',function(){
						var id=$(this).attr("id").replace('glyphicon-edit','');
						change_collection_name_dialog(id);
					});
				});
				$('#new_exams_table').append('<tr id="new_exams_lastrow"><td colspan="5"><img src="images/arrow_ltr.png" />&nbsp<input type="checkbox"> Mark all</input> <i style="margin-left:30px; margin-right:10px;">With marked: </i><a id="glyphicon-trash" href="#"><span class="glyphicon glyphicon-trash"></span></a><i> Delete collections </i></td></tr>');
				$('#tmp_table').remove();
				$('.content1').append('<table id="tmp_table"><tr id="new_exams_lastrow1"><td colspan="4"><a id="glyphicon-book" href=#><span class="glyphicon glyphicon-book"></span> Make new collection</a></td><tr></table>');
				$('#new_exams_lastrow1 #glyphicon-book').on('click',function(){
					new_collection_dialog();
				});
				$('#new_exams_lastrow input[type=checkbox]').on('click',function(){
					if($('#new_exams_lastrow input[type=checkbox]:checked').length){
						$('#new_exams_table td input[name=hmm]').each(function(){
							$(this).prop('checked', true);
						});
					}else{
						$('#new_exams_table td input[name=hmm]').each(function(){
							$(this).prop('checked', false);
						});
					}
				});
				$('#new_exams_lastrow #glyphicon-trash').on('click',function(){
					var vsi=[];
					$('#new_exams_table input[name=hmm]:checked').each(function(){
						vsi.push($(this).val());
					});
					var xmlhttp=new XMLHttpRequest();
					var parameters="name=removecollections&ids="+JSON.stringify(vsi);
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200) {
							var data=JSON.parse(xmlhttp.responseText);
							if(data===1){
								$.each(vsi,function(key,value){
									$('#new_exams_tr'+value).remove();
									$('.content1 #home_button').remove();
									$('.content1 #tmp_table').remove();
									$('#first_choose_of_exams_list').trigger('click');
								});
							}else{
								$('.content1 #home_button').remove();
								$('.content1 #tmp_table').remove();
								$('#first_choose_of_exams_list').trigger('click');
							}
						}
					}
					xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xmlhttp.send(parameters);
				});				
			}
		}
	}
	xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
	
	/*check if prof. created any collection */
});

/********************** showing exams ********************/
$('#second_choose_of_exams_list').on('click',function(){
	$('#exams_list_group').hide();
	$('.content1 h2').prepend('<a id="glyphicon-list-alt" href="#"><span title="Back" id="home_button" class="glyphicon glyphicon-home"></span></a> ');
	$('.content1 #home_button').on('click',function(){
		$(this).remove();
		$('.content1 #exams_list_group').show();
		$('#legend').remove();
		$('.content1 #table_of_exams').empty();
	});
	var xmlhttp=new XMLHttpRequest();
	var parameters="name=getexams";
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200) {
			var data=JSON.parse(xmlhttp.responseText);
			if(data===0){
				alert('Random error ...');										
			}else{
				$('#table_of_exams').empty();				
				if("empty" in data){
					$('#table_of_exams').append('<th>'+data['empty']+'</th>');
					return;
				}
				$('.content1 h2[name=title]').after('<p id="legend">Rows with<span style="background-color:#eee;border:1px solid;padding-left:20px;margin-left:5px;margin-right:5px"></span> background color are yours.</p>');
				$('.content1 #table_of_exams').append('<th>Exam ID</th><th>Title</th><th>Creator</th><th>Description</th><th>Keywords</th><th>Created</th><th>Startline</th><th>Deadline</th><th>Max canditdates</th><th>Participated</th>');
				var counter=0;
				$.each(data,function(key,value){
					if(value['UserID']==$('#session_info #p_userid').text()){
						$('#table_of_exams').append('<tr style="background-color:#eee"><td>'+value["AssignementID"]+'</td><td>'+value["Title"]+'</td><td>'+value["Name"]+' '+value["Surname"]+'</td><td>'+value["Description"]+'</td><td>'+value["KeyWords"]+'</td><td>'+value["Created"]+'</td><td>'+value["Startline"]+'</td><td>'+value["Deadline"]+'</td><td>'+value["MaxNumber"]+'</td><td>'+value["CountNumber"]+'</td></tr>');
					}else $('#table_of_exams').append('<tr><td>'+value["AssignementID"]+'</td><td>'+value["Title"]+'</td><td>'+value["Name"]+' '+value["Surname"]+'</td><td>'+value["Description"]+'</td><td>'+value["KeyWords"]+'</td><td>'+value["Created"]+'</td><td>'+value["Startline"]+'</td><td>'+value["Deadline"]+'</td><td>'+value["MaxNumber"]+'</td><td>'+value["CountNumber"]+'</td></tr>');
				});	
				
				
			}
		}
	}
	xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
});

/********************** editing exams ********************/
$('#third_choose_of_exams_list').on('click',function(){
	$('#exams_list_group').hide();
	$('.content1 h2').prepend('<a id="glyphicon-list-alt" href="#"><span title="Back" id="home_button" class="glyphicon glyphicon-home"></span></a> ');
	$('.content1 #home_button').on('click',function(){
		$(this).remove();
		$('.content1 #exams_list_group').show();
		$('#table_of_editable_exams').empty();
	});
	$('#table_of_editable_exams').empty();
	var xmlhttp=new XMLHttpRequest();
	var parameters="name=readforedit&userid="+$('#session_info #p_userid').text();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var data=JSON.parse(xmlhttp.responseText);
			if("empty" in data){
				$('#table_of_editable_exams').append('<th>'+data['empty']+'</th>');
				return;
			}
			$('#table_of_editable_exams').append('<tr><th></th><th>ID</th><th>Title</th><th>Startline</th><th>Deadline</th><th>Published</th><th>Description</th><th>Keywords</th><th>Toys</th></tr>');
			$.each(data,function(key,value){
				$('#table_of_editable_exams').append('<tr id="edit_exam_tr'+value["AssignementID"]+'"><td><input type="checkbox" name="hmm" value="'+value["AssignementID"]+'"></td><td>'+value["AssignementID"]+'</td><td id="title">'+value["Title"]+'</td><td id="startline">'+value["Startline"]+'</td><td id="deadline">'+value["Deadline"]+'</td><td id="published">'+value["Published"]+'</td><td id="description">'+value["Description"]+'</td><td id="keywords">'+value["KeyWords"]+'</td><td><a id="" href="#"><span class="glyphicon glyphicon-remove"></span></a> <a id="glyphicon-edit'+value["AssignementID"]+'" href="#"><span class="glyphicon glyphicon-edit"></span></a></td></tr>');
				$('#table_of_editable_exams #glyphicon-edit'+value["AssignementID"]).on('click',function(){
					var id=$(this).attr("id").replace('glyphicon-edit','');
					edit_exam_dialog(id);
				});
			});
			$('#table_of_editable_exams').append('<tr id="editable_exams_lastrow"><td colspan="8"><img src="images/arrow_ltr.png" />&nbsp<input type="checkbox"> Mark all</input> <i style="margin-left:30px; margin-right:10px;">With marked: </i><a id="glyphicon-trash" href="#"><span class="glyphicon glyphicon-trash"></span></a><i> Delete assignements</i></td></tr>');
			$('#editable_exams_lastrow #glyphicon-trash').on('click',function(){
				var vsi=[];
				$('#table_of_editable_exams input[name=hmm]:checked').each(function(){
					vsi.push($(this).val());
				});
				var xmlhttp=new XMLHttpRequest();
				var parameters="name=removeexams&id="+JSON.stringify(vsi);
				xmlhttp.onreadystatechange=function(){
					if(xmlhttp.readyState==4 && xmlhttp.status==200) {
						var data=JSON.parse(xmlhttp.responseText);
						if(data===1){
							$.each(vsi,function(key,value){
								$('#edit_exam_tr'+value).remove();
							});
						}
						$('.content1 #home_button').remove();
						$('#table_of_editable_exams').empty();
						$('#third_choose_of_exams_list').trigger('click');
					}
				}
				xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send(parameters);
			});
			$('#editable_exams_lastrow input[type=checkbox]').on('click',function(){
				if($('#editable_exams_lastrow input[type=checkbox]:checked').length){
					$('#table_of_editable_exams td input[name=hmm]').each(function(){
						$(this).prop('checked', true);
					});
				}else{
					$('#table_of_editable_exams td input[name=hmm]').each(function(){
						$(this).prop('checked', false);
					});
				}
			});
		}
	}
	xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(parameters);
});

function change_collection_name_dialog(id){
	var box=bootbox.dialog({
		title: "Setting up new collection",
		onEscape: function(){},
		backdrop: true,
		message: 
			'<div class="row"><div class="col-md-12"> ' +
				'<form class="form-horizontal"> ' +
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="collection_name1">Set name</label>' +
						'<div class="col-md-4"> ' +
							'<input id="collection_name1" name="collection_name1" type="text" placeholder="Collection name" value="'+$("#new_exams_tr"+id+" #collection_name").text()+'" class="form-control input-md">' +
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
				label: "Confirm",
				className: "btn-success",
				callback: function () {
					var xmlhttp=new XMLHttpRequest();
					var parameters="name=changename&id="+id+"&coll_name="+$('.col-md-4 input[id=collection_name1]').val();
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200) {
							var data=JSON.parse(xmlhttp.responseText);
							if(data===0){
								alert('Random errors ...');
								return;
							}
							$('.content1 #home_button').remove();
							$('#first_choose_of_exams_list').trigger('click');
							bootbox.hideAll();
						}
					}
					xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xmlhttp.send(parameters);
				}
			}
		}
	});
	box.on('shown.bs.modal',function(){
		$('.col-md-4 input[id=coll_name]').focus();
	});
}

function new_collection_dialog(){
	var box=bootbox.dialog({
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
					var parameters="name=createcollection&userid="+$('#session_info #p_userid').text()+"&coll_name="+$('.col-md-4 input[id=coll_name]').val();
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200) {
							var data=JSON.parse(xmlhttp.responseText);
							if(data===0){
								alert('Random errors ...');
								return;
							}
							$('.content1 #home_button').remove();
							$('#first_choose_of_exams_list').trigger('click');
							bootbox.hideAll();
						}
					}
					xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xmlhttp.send(parameters);
				}
			}
		}
	});
	box.on('shown.bs.modal',function(){
		$('.col-md-4 input[id=coll_name]').focus();
	});
}

function edit_exam_dialog(id){
	var a=bootbox.dialog({
		title: "Modify exam",
		onEscape: function(){},
		backdrop: true,
		message: 
			'<div class="row"><div class="col-md-12"> ' +
				'<form class="form-horizontal"> ' +
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="title">Title</label>' +
						'<div class="col-md-4"> ' +
							'<input id="title" name="title" type="text" placeholder="Title" value="'+$("#table_of_editable_exams #edit_exam_tr"+id+" #title").text()+'" class="form-control input-md">' +
						'</div> ' +
					'</div> '+
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="startline">Startline</label>' +
						'<div class="col-md-4"> ' +
							'<input id="startline" name="startline" type="text" placeholder="Date" value="'+$("#table_of_editable_exams #edit_exam_tr"+id+" #startline").text()+'" class="form-control input-md">'+
						'</div> ' +
					'</div> '+
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="deadline">Deadline</label>'+
						'<div class="col-md-4"> ' +
							'<input id="deadline" name="deadline" type="text" placeholder="Date" value="'+$("#table_of_editable_exams #edit_exam_tr"+id+" #deadline").text()+'" class="form-control input-md">'+
						'</div> ' +
					'</div> '+
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="published">Published</label>'+
						'<div class="col-md-4"> ' +
							'<input id="published" name="published" type="text" placeholder="1/0" value="'+$("#table_of_editable_exams #edit_exam_tr"+id+" #published").text()+'" class="form-control input-md">'+
						'</div> ' +
					'</div> '+
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="description">Description</label>'+
						'<div class="col-md-4"> ' +
							'<input id="description" name="description" type="text" placeholder="1/0" value="'+$("#table_of_editable_exams #edit_exam_tr"+id+" #description").text()+'" class="form-control input-md">'+
						'</div> ' +
					'</div> '+
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="keywords">Keywords</label>'+
						'<div class="col-md-4"> ' +
							'<input id="keywords" name="keywords" type="text" placeholder="Keywords" value="'+$("#table_of_editable_exams #edit_exam_tr"+id+" #keywords").text()+'" class="form-control input-md">'+
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
					var parameters="name=update_exam&id="+id+"&title="+$('.col-md-4 input[id=title]').val()+"&startline="+$('.col-md-4 input[id=startline]').val()+"&deadline="+$('.col-md-4 input[id=deadline]').val()+"&published="+$('.col-md-4 input[id=published]').val()+"&description="+$('.col-md-4 input[id=description]').val()+"&keywords="+$('.col-md-4 input[id=keywords]').val();
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200) {
							var data=JSON.parse(xmlhttp.responseText);
							if(data===1){
								$('.content1 #home_button').remove();
								$('#third_choose_of_exams_list').trigger('click');
								bootbox.hideAll();										
							}
						}
					}	
					xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xmlhttp.send(parameters);
					alert(id);
				}
			}
		}
	});
	if($('#session_info #p_statusid').text()!=1){
		$('#status_change_div').remove();
	}
	

}

function new_exam_dialog(id){
	var a=bootbox.dialog({
		title: "New exam",
		onEscape: function(){},
		backdrop: true,
		message: 
			'<div class="row"><div class="col-md-12"> ' +
				'<form class="form-horizontal"> ' +
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="title">Title*</label>' +
						'<div class="col-md-4"> ' +
							'<input id="title" name="title" type="text" required placeholder="Title" value="'+$("#users_table #user_tr"+id+" #users_uname").text()+'" class="form-control input-md">' +
						'</div> ' +
					'</div> '+
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="name">Description</label>' +
						'<div class="col-md-4"> ' +
							'<textarea style="resize:vertical" rows="5" id="description" name="description" placeholder="Description" value="'+$("#users_table #user_tr"+id+" #users_name").text()+'" class="form-control"></textarea>'+
						'</div> ' +
					'</div> '+
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="surname">Keywords</label>'+
						'<div class="col-md-4"> ' +
							'<input id="keywords" name="keywords" type="text" placeholder="Keywords" value="'+$("#users_table #user_tr"+id+" #users_surname").text()+'" class="form-control input-md">'+
						'</div> ' +
					'</div> '+
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="emso">Startline</label>'+
						'<div class="col-md-4"> ' +
							'<input id="startline" name="startline" type="date" placeholder="Startline" value="'+$("#users_table #user_tr"+id+" #users_emso").text()+'" class="form-control input-md">'+
						'</div> ' +
					'</div> '+
					'<div class="form-group" id="status_change_div"> ' +
						'<label class="col-md-4 control-label" for="status">Deadline</label>'+
						'<div class="col-md-4"> ' +
							'<input id="deadline" name="deadline" type="date" placeholder="Deadline" value="'+$("#users_table #user_tr"+id+" #users_status").text()+'" class="form-control input-md">'+
						'</div> ' +
					'</div> '+
					'<div class="form-group"> ' +
						'<label class="col-md-4 control-label" for="password">Max students</label>'+
						'<div class="col-md-4"> ' +
							'<input id="maxnumber" name="maxnumber" type="text" placeholder="Max students" class="form-control input-md">'+
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
					var parameters="name=newexam&collectionid="+id+"&title="+$('.col-md-4 input[id=title]').val()+"&description="+$('.col-md-4 input[id=description]').val()+"&keywords="+$('.col-md-4 input[id=keywords]').val()+"&startline="+$('.col-md-4 input[id=startline]').val()+"&deadline="+$('.col-md-4 input[id=deadline]').val()+"&maxnumber="+$('.col-md-4 input[id=maxnumber]').val();
					xmlhttp.onreadystatechange=function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200) {
							var data=JSON.parse(xmlhttp.responseText);
							if(data===1){
								$('.content1 #home_button').remove();
								$('#first_choose_of_exams_list').trigger('click');
								bootbox.hideAll();										
							}
						}
					}
					xmlhttp.open("POST","ajax/ajax_exams_manipulation.php",true);
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xmlhttp.send(parameters);
				}
			}
		}
	});
}