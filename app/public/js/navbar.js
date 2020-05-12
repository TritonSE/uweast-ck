$(document).ready(function(){
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

    // submitting log in request
    $('#submit').click(function() {
        alert("logged in");
    })
});