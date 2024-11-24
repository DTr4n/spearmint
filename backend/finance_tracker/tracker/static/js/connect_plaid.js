function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

document.addEventListener('DOMContentLoaded', function () {
  const linkHandler = Plaid.create({
    token: linkToken,
    onSuccess: function(public_token, metadata) {
      // Send the public_token to server
      fetch('/tracker/get_access_token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({ public_token: public_token }),
        credentials: 'include'
      }).then(response => response.json())
        .then(data => {
          console.log('Access token:', data.access_token);
        })
    },
    onExit: function(err, metadata) {
      if (err != null) {
        console.log('Plaid Link: User exited', err);
      }
    }
  });

  document.getElementById('link-button').onclick = function() {
    linkHandler.open();
  };

  document.getElementById('get-transactions-button').onclick = function() {
    fetch('/tracker/get_transactions/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      credentials: 'include'
    }).then(response => response.json())
      .then(data => {
        console.log('Status:', data.message);
      });
  };
});