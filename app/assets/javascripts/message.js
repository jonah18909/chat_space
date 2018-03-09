$(function(){
  function buildHTML(message){
    var chatImage = "";
    if (message.image){
      chatImage = `<img class='chat-main__message-image', src='${message.image}'> `}
    var html = `
                  <div class="chat-main__message clearfix">
                    <div class="chat-main__message-name">
                    ${message.name}
                    </div>
                  <div class="chat-main__message-time">
                  ${message.time}
                  </div>
                  <div class="chat-main__message-body">
                    <p class="chat-main__message-text">
                    ${message.text}
                    </p>
                    ${chatImage}
                  </div>
                `
    return html;
  }

  $(document).on('turbolinks:load', function(){
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(data){
        var html = buildHTML(data);
        console.log('成功')
        $('.chat-main__body--messages-list').append(html);
        $('#message_text').val('');
        $('.chat-main__body').animate({scrollTop:$(document).height }, 1500);
      })
      .fail(function(){
        alert('error');
      });
    });
  });
});
