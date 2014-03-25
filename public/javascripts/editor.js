function EditorFuncs(){
	var j = jQuery.noConflict(); 
//------------------------------ PAGE ---------------------------------//
	// Saving the page
	EditorFuncs.prototype.savePage = function(id){
		var title = j('#title').html();
		var content = doc.getValue();
		j('#save').addClass('loading');
		j.ajax({
			url : '/page/save-or-update',
			type : 'PUT',
			dataType: 'json',
			data : {id : id, title : title, content : content},
			success : function(data){
				j('#save').removeClass('loading');
				j('#editor').attr('page_id', data.id);
				if(id =='new'){
					var monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
					var newDate = new Date();
					newDate.setDate(newDate.getDate() + 1);
					var dispDate = monthName[newDate.getMonth()]+ ' ' + newDate.getDate()+ ', '+ newDate.getFullYear();
					j('a.active.item.pageref').removeClass('active');
					var new_entry = "<a class='active item pageref' id= '"+data.id+"'> \
										<div class='left floated ui star rating'> \
											<i class='icon'></i> \
										</div> \
										<div class='right floated date'>"+ dispDate +"</div> \
										<div class='description'>"+ title +"</div></a>";
					j('.tab.draft').prepend(new_entry);
				}
			},
			error : function(err){
				j('#save').removeClass('loading');
				alert('Something went terribly wrong !! Please try again...');
			}
		});
	};
// setting Page  published or not published
	EditorFuncs.prototype.setStatusPage = function(id , status){
		j('#publish').addClass('loading');
		j.ajax({
			url : '/page/'+status+'/'+id,
			type : 'GET',
			success : function(data){
				j('#publish').removeClass('loading');
				if(status == 'publish'){
					j('#publish').html('Unpublish');
					j('#publish').addClass('red').removeClass('teal');
					j('#publish').attr('id','unpublish');
					j('a.item.pageref#'+id).prependTo('.published');
				}else if(status == 'unpublish'){
					j('#unpublish').html('Publish');
					j('#unpublish').addClass('teal').removeClass('red');
					j('#unpublish').attr('id','publish');
					j('a.item.pageref#'+id).prependTo('.draft');
				}
			},
			error : function(err){
				j('#publish').removeClass('loading');
				alert('Something went terribly wrong !! Please try again...');
			}
		});
	};

//----------------------------POSTS-----------------------------------//
	// Saving the post
	EditorFuncs.prototype.savePost = function(id){
		var title = j('#title').html();
		var content = doc.getValue();
		j('#save').addClass('loading');
		j.ajax({
			url : '/post/save-or-update',
			type : 'PUT',
			dataType: 'json',
			data : {id : id, title : title, content : content},
			success : function(data){
				j('#save').removeClass('loading');
				j('#editor').attr('post_id', data.id);
				if(id =='new'){
					var monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
					var newDate = new Date();
					newDate.setDate(newDate.getDate() + 1);
					var dispDate = monthName[newDate.getMonth()]+ ' ' + newDate.getDate()+ ', '+ newDate.getFullYear();
					j('a.active.item.pageref').removeClass('active');
					var new_entry = "<a class='active item pageref' id= '"+data.id+"'> \
										<div class='left floated ui star rating'> \
											<i class='icon'></i> \
										</div> \
										<div class='right floated date'>"+ dispDate +"</div> \
										<div class='description'>"+ title +"</div></a>";
					j('.tab.draft').prepend(new_entry);
				}
			},
			error : function(err){
				j('#save').removeClass('loading');
				alert('Something went terribly wrong !! Please try again...');
			}
		});
	};
// setting post  published or not published
	EditorFuncs.prototype.setStatusPost = function(id , status){
		j('#publish').addClass('loading');
		j.ajax({
			url : '/post/'+status+'/'+id,
			type : 'GET',
			success : function(data){
				j('#publish').removeClass('loading');
				if(status == 'publish'){
					j('#publish').html('Unpublish');
					j('#publish').addClass('red').removeClass('teal');
					j('#publish').attr('id','unpublish');
					j('a.item.pageref#'+id).prependTo('.published');
				}else if(status == 'unpublish'){
					j('#unpublish').html('Publish');
					j('#unpublish').addClass('teal').removeClass('red');
					j('#unpublish').attr('id','publish');
					j('a.item.pageref#'+id).prependTo('.draft');
				}
			},
			error : function(err){
				j('#publish').removeClass('loading');
				alert('Something went terribly wrong !! Please try again...');
			}
		});
	};
	
};