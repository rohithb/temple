var j = jQuery.noConflict();   
//editor initialization
var doc;
var editorFuncs = new EditorFuncs();
j(document).ready(function(){
  doc = j('textarea[data-uk-markdownarea]').data('markdownarea').editor.getDoc();
  j('#editor').hide();
  j('#save').addClass('disabled');

  //Enable save button
  j('#title').on('input', function(){
    j('#save').removeClass('disabled');
  });
  j('textarea[data-uk-markdownarea]').data('markdownarea').editor.on('change',function(){
    j('#save').removeClass('disabled');
  });
});

//Add new Button action
j(document).on('click', '.button.add.new', function(){
  if(j('#editor').is(':hidden')){
    j('#editor').show();
    j('#editor').attr('post_id', 'new');
    j('#title').html('');
    doc.setValue('');
  }
  var len = doc.getValue().length | j('#title').html().length | 0;
  if(len!=0){
    j('.small.confirm.unsaved.modal').modal('setting', {
      closable  : false,
      onDeny    : function(){},
      onApprove : function() {
        j('#editor').show();
        j('#editor').attr('post_id', 'new');
        j('#title').html('');
        doc.setValue('');
      }
  }).modal('show');
  }
});

// Save function
j(document).on('click','#save',function(){
  editorFuncs.savePost(j('#editor').attr('post_id'));
  j('#save').addClass('disabled');
});

//Load full page while clicking item on the left panel
j(document).on('click', 'a.item.pageref', function(){
  var id = j(this).attr('id');
  var this_element = j(this);
  j('.inverted.dimmer').addClass('active');
  j.ajax({
    url : '/post/load/'+id,
    type : 'GET',
    dataType : 'json',
    success : function(data){
      j('.inverted.dimmer').removeClass('active');
      j('#editor').show();
      j('#editor').attr('post_id', data._id);
      j('#title').html(data.title);
      doc.setValue(data.content);
      j('a.item.pageref.active').removeClass('active');
      j(this_element).addClass('active');
      if(data.published == true){
        j('#publish').html('Unpublish');
        j('#publish').addClass('red').removeClass('teal');
        j('#publish').attr('id','unpublish');
      }
      else{
        j('#unpublish').html('Publish');
        j('#unpublish').addClass('teal').removeClass('red');
        j('#unpublish').attr('id','publish');
      }
    },
    error : function(err){
      alert('Something went terribly wrong !! Please try again...');
      j('.inverted.dimmer').removeClass('active');
    }

   });
});
//Publish Action
j(document).on('click', '#publish, #unpublish', function(){
  var status = j(this).attr('id');
  var id = j('#editor').attr('post_id');
  editorFuncs.setStatusPost(id, status);
})

