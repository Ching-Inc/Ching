document.getElementById("submit-btn").addEventListener("click", addToEmailListing);

// Main Header animation on scroll
var scrolled = false;
$(window).scroll(function() {
    if($(window).scrollTop() > 40 && scrolled == false){
      $('.main-header').addClass('scrolled');
      scrolled = true;
    } else if($(window).scrollTop() == 0) {
      $('.main-header').removeClass('scrolled');
      scrolled = false;
    }
});

// Menu
$('#btnMenu').click( function() {
    $('.main-menu').toggleClass('active');
    $('#btnMenu').toggleClass('change');
})

$('.main-wrapper').click( function() {
    if($('.main-menu').hasClass('active')){
        $('.main-menu').removeClass('active');
        $('#btnMenu').removeClass('change');
    }
})

// Smooth scrolling for menu links
$(document).ready(function(){

  $("a").on('click', function(event) {

    if (this.hash !== "") {

      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        window.location.hash = hash;
      });
    }
  });
});

function addToEmailListing() {
  // var script_url = "https://script.google.com/macros/s/AKfycbzVUFjypOFzFiPD7cZXnBdZ7hBx9MJ2lm_Bqm00ifofAWVikkzSDr9uWbzFjArbQOXqiw/exec";
  var script_url = "https://script.google.com/macros/s/AKfycbz8Spu5n_KcLIh0IkNiQoH4k83PXpfD2QQ3ge74-U20/dev";
  $.getJSON(
    script_url + "?callback=?",
    {
      method:"doGet",
      "fname": document.getElementById("fname").value,
      "lname": document.getElementById("lname").value,
      "phone": document.getElementById("phone").value,
      "email": document.getElementById("email").value
      // success: function (response) { 
      //   // alert(JSON.stringify(data)); 
      //   // console.log(JSON.stringify(data)));
      //   console.log(response);
      // }
    }
  );
}