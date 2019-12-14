$(function() {
    function buildHTML(message){
      if (message.image == null) {
        let html = `<div class="message">
                      <div class='message__name'> ${message.name}
                      </div>
                      <div class='message__date-time'> ${message.created_at}
                      </div>
                      <div class='message__comment'> ${message.body}
                      </div>
                    </div>`
        return html;

      } else if (message.image != null) { 
        let html = `<div class="message">
                      <div class='message__name'> ${message.name}
                      </div>
                      <div class='message__date-time'> ${message.created_at}
                      </div>
                      <div class='message__comment'> ${message.body}
                        <img class='image' src=${message.image}/>
                      </div>
                    </div>`
        return html;
      }
    }

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
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-space').append(html);
      $('.chat-space').animate({scrollTop: $('.chat-space')[0].scrollHeight});
      $('.input-area').val('');
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    });
  })
});