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
	
};