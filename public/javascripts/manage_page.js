var j = jQuery.noConflict();   
//editor initialization
var editor = new Editor('text-input','preview','showPreview');
j(document).ready(function(){
  j('#editor').hide();
  j('#save').addClass('disabled');
});
//show and hide preview
j(document).on('click', '#showPreview.unhide', function() {
  editor.showPreview();
});
j(document).on('click', '#showPreview.hide', function() {
  editor.hidePreview();
});

//Add new Button action
j(document).on('click', '.button.add.new', function(){
  if(j('#editor').is(':hidden')){
    j('#editor').show();
    j('#editor').attr('page_id', 'new');
    j('#title').html('');
    j('#text-input').val('');
  }
  var len = j('#text-input').val().length | j('#title').html().length | 0;
  if(len!=0){
    j('.small.confirm.unsaved.modal').modal('setting', {
      closable  : false,
      onDeny    : function(){},
      onApprove : function() {
        j('#editor').show();
        j('#editor').attr('page_id', 'new');
        j('#title').html('');
        j('#text-input').val('');
      }
  }).modal('show');
  }
});

// Save function
j(document).on('click','#save',function(){
  editor.save(j('#editor').attr('page_id'));
  j('#save').addClass('disabled');
});
//Enable save button
j('#text-input, #title').on('input', function(){
    j('#save').removeClass('disabled');
  });
//Load full page while clicking item on the left panel
j(document).on('click', 'a.item.pageref', function(){
  var id = j(this).attr('id');
  var this_element = j(this);
  j('.inverted.dimmer').addClass('active');
  j.ajax({
    url : '/page/load/'+id,
    type : 'GET',
    dataType : 'json',
    success : function(data){
      j('.inverted.dimmer').removeClass('active');
      j('#editor').show();
      j('#editor').attr('page_id', data._id);
      j('#title').html(data.title);
      j('#text-input').val(data.content);
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
  var id = j('#editor').attr('page_id');
  editor.setStatus(id, status);
})

//Setting Page Attributes
j('#pageAttr').on('click',function(){
    j('.pageAttr.modal').modal('setting', {
      closable  : false,
      onDeny    : function(){},
      onApprove : function() {
        var order = j('#order').val() | 0;
        var parent_id = j('#parent').val();
        var id = j('#editor').attr('page_id');
        j.ajax({
          url : '/page/save-attribute',
          type : 'GET',
          data : {id : id, order : order, parent_id : parent_id},
          error : function(err){
            alert('Sorry. Something unexpected occured..');
          }
        });
      }
  }).modal('show');
})
