$(document).ready(function(){
    // check if user is already signed in and update navbar
    $.get('/auth/checkIfSignedIn', function(data) {
        if (data['signedIn']) {
            // changing navbar text
            $('#login-trigger').text("Admin");

            // removing existing content
            $('#login-content #inputs').empty();
            $('#submit').remove();

            // adding signout button
            $('#signout').css("visibility", "visible");
        }
        else {
            // removing signout button if not logged in
            $('#signout').remove();
        }
    })

    // dropdown login toggle
    $('#login-trigger').click(function(){
      $(this).next('#login-content').slideToggle();
      $(this).toggleClass('active');

      if ($(this).hasClass('active')) {
          $(this).find('span').html('&#x25B2;')
      }
      else {
          $(this).find('span').html('&#x25BC;')
      }
    })

    // submitting sign out request
    $('#signout').click(function(event) {
        $.post('/auth/signOut', function(data) {
            alert("Logged out");
            location.reload();
        })
    })

    // submitting log in request
    $('#submit').click(function(event) {
        event.preventDefault();
        const username = $('#inputs #username').val();
        const password = $('#inputs #password').val();
        $.post('/auth/login', {username, password}, function(data) {
            if (data['success']) {
                alert("Success! Welcome, " + username + ".")
                location.reload();
            }
            else if (data['message'] == "userNotExist") {
                alert("Username not found.");
            }
            else if (data['message'] == "incorrectPassword") {
                alert("Incorrect password.");
            }
        })
    });
});