function Editor(input, preview, preview_btn){
	var j = jQuery.noConflict(); 
	

	this.input = input;
	this.preview = preview;
	this.preview_btn = preview_btn;

	// j("#"+this.preview).hide();
	
	Editor.prototype.showPreview = function (){
		var input_md = j('#'+this.input).val();
		j("#"+this.preview).html(markdown.toHTML(input_md));

		j("#"+this.input).fadeOut(300);
		j("#"+this.preview).delay(400).fadeIn(300).css('display', 'inline-block');
		j("#"+this.preview_btn).removeClass("unhide");
		j("#"+this.preview_btn).addClass("hide")
		//j("#"+this.preview_btn).attr("id","hidePreview");

	};

	Editor.prototype.hidePreview = function (){
		j("#"+this.preview).fadeOut(300);
		j("#"+this.input).delay(400).fadeIn(300).css('display', 'inline-block');
		j("#"+this.preview_btn).removeClass("hide");
		j("#"+this.preview_btn).addClass("unhide")
		//j("#hidePreview").attr("id","showPreview");
	};

	Editor.prototype.save = function(id){
		var title = j('#title').html();
		var content = j('#text-input').val();
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
					j('a.active.item').removeClass('active');
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
	
};

