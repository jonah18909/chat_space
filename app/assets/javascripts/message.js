$(function(){
  function buildHTML(message){
    var chatImage = message.image == null ?  '' : `<img class='chat-main__message-image', src='${message.image}'> ` ;

    var html = `
                  <div class="chat-main__message clearfix" data-message-id=${message.id}>
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
                  </div>`
    return html;
  }

    function scroll() {
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight }, 'fast');
    };

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
        $('.chat-main__body').append(html);
        $('#new_message')[0].reset();
        scroll();
        console.log(data);
      })
      .fail(function(){
        alert('error');
      })
    return false;
  });

//   setInterval(function() {
//   //   if (window.location.href.match(/\/groups\/\d+\/messages/)) {
//   //     var lastMessageId = $('.chat-main__message:last').data('message-id')
//   //     $.ajax({
//   //       type: "get",
//   //       data:{ id: lastMessageId },
//   //       url: window.location.href,
//   //       dataType: 'json',
//   //       })
//   //     .done(function(messages){
              // var html = "";
//   //       messages.forEach(function(message){
//   //         var html = buildHTML(message);
//   //         $('.chat-main__body').append(html);
//   //       })
//   //     })
//   //     .fail(function(){
//   //       alert('送信失敗');
//   //     })
//   //   }
//   // }, 5000);
});




