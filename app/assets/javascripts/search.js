$(function(){

var search_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class ="chat-group-user clearfix" >
              <input name = 'group[user_ids][]' type='hidden'>
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" id = 'add-user-button' data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  search_list.append(html);
}

function appendNoUser(user) {
  var html = `<li>
                <div class='chat-group-user'>${user}</div>
              </li>`
  search_list.append(html);
}

// 追加されたユーザーを削除
function appendAddUser(name, id) {

  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                <input id='chat-group-user' name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' id='delete-user-button' data-user-id='${id}' data-user-name='${name}'>削除</a>
              </div>`
  $("#chat-group-users").append(html);
}

// 検索結果リスト & ユーザー検索
$('#user-search-field').change(displayUsers);

// メンバー追加
$('#user-search-result').on('click', '#add-user-button', function(){
  var user = $(this);
  var name = user.data('user-name');
  var id = user.data('user-id');
  user.parent().remove();
  appendAddUser(name, id);
});

// メンバー削除
$('#chat-group-user').on('click', '#delete-user-button', function(){
  $(this).parent().remove();
});

 function displayUsers() {
      $("#user-search-field").on("keyup", function(){
      var input = $("#user-search-field").val();
      if (input == ""){
        $("#user-search-result").empty();
      }
      else{

        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })
        .done(function(users) {
           $('#user-search-field').children().remove();
            if (users.length !== 0 ) {
              users.forEach(function(user){
                appendUser(user);
              });
            }
            else {
              appendNoUser("該当するユーザーはいません");
            }
        })
        .fail(function() {
          alert('ユーザーの検索に失敗しました');
        });
      }
    });
  };
    return false;
});


