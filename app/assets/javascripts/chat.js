$(function(){
  function buildHTML(message) {
    var insertImage = '';
    if (message.image) {
      insertImage = `<img src="${message.image}">`;
    }
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
                    ${insertImage}
                  </div>
                `
    return html
  }


  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      type: "get",
      url: window.location.href,
      dataType: 'json',
    })

    .done(function(json) {
      var id = $('.chat-main__message').data('messageId');
      var insertHTML = '';
      json.messages.forEach(function(message) {
        if (message.id > id) {
          insertHTML += buildHTML(message);
        }
      });
      $('.chat-main__body--messages-list:last').html(insertHTML);
      console.log('自動更新')
    })

    .fail(function(data) {
      alert('自動更新に失敗しました');
    });

  } else {
    clearInterval(interval);
    }}, 5000 );


});
