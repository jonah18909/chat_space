$(function(){

var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  search_list.append(html);
}

function appendNoUser(user) {
  var html = `<li>
                <div class=''>${user}</div>
              </li>`
  search_list.append(html);
}

function appendAddUser(user) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>${user.name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  $("#chat-group-users").append(html);
}

  $(document).on('turbolinks:load', function(){
    $(".chat-group-form__search").on("keyup", "#user-search-field", function(){
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0 ) {
          users.forEach(function(user){
            appendUser(user);
          })
        }
        else {
          appendNoUser("該当するユーザーはいません");
        }
        $(document).on("click", "data-user-id", function(){
          $('#chat-group-users').empty();
          $("#user-search-field").val('');
          var userId = $(".user-search-add").data('userId');
          var userName = $(".user-search-add").data('userName');

          var userIds = []
            userIds.push(userId)
          // var str = [];
          // var ary = $('[data-user-name]');
          // for(var n=0, len=ary.length;n<len;n++){
          //   str.push(ary[n].getAttribute('data-user-name'));
          // }
          // console.log(str);
          // console.log(userName);
            appendAddUser(userName);
        })
        $(document).on("click", ".user-search-remove", function(){
          $(".chat-group-user").remove("#chat-group-user-8");
        })
      })
      .fail(function() {
       alert('ユーザーの検索に失敗しました');
      });
    });
  });
});
