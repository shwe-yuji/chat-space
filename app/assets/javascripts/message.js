$(function() {
  
  let buildHTML = function(message) {
    let message_name = `<div class="message__name">` + message.name + `</div>`
    let message_date_time = `<div class="message__date-time">` + message.created_at + `</div>`
    let message_comment = `<div class='message__comment'>` + message.body + `</div>`
    let message_image = `<img src="` + message.image + `" class="image" >`

    if (message.image && message.body) {
      let html = `<div class="message" data-message-id=` + message.id + `>
                  ${message_name}
                  ${message_date_time}
                  ${message_comment}
                  ${message_image}
                  </div>`
      return html;

    } else if (message.body) { 
      let html = `<div class="message" data-message-id=` + message.id + `>
                    ${message_name}
                    ${message_date_time}
                    ${message_comment}
                  </div>`
      return html;

    } else if (message.image) {
      let html = `<div class="message" data-message-id=` + message.id + `>
                    ${message_name}
                    ${message_date_time}
                    ${message_image}
                  </div>`
      return html;
    }
  }

  let reloadMessages = function(){
    last_message_id = $('.message').last().data('messageId')
    let url = $(location).attr('pathname').split('messages').join('');
    $.ajax({
      url: url + 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      let insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-space').append(insertHTML);
      $('.chat-space').animate({scrollTop: $('.chat-space')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
      });
    };

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    let formdata = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
        url: url,
        type: "POST",
        data: formdata,
        dataType: 'json',
        processData: false,
        contentType: false
    })
    .done(function(message) {
      let html = buildHTML(message);
      $('.chat-space').append(html);
      $('.chat-space').animate({scrollTop: $('.chat-space')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    });
  })

  let present_url_path = $(location).attr('pathname');
    if (present_url_path.includes('/groups/') && present_url_path.includes('/messages')) {
      setInterval(reloadMessages, 7000);
    }
});