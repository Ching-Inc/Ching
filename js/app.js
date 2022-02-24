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

// fillForm();

// function fillForm() {
//   alert("here");

//   $.ajax({
//     url: "https://docs.google.com/forms/d/e/1FAIpQLScAl-HLFNIs2NKh99RwYl_IuMF0XyIT4t4etbW4cbBGGmkqbQ/viewform?usp=pp_url&entry.1651911507=First_Name&entry.1516321001=Last_Name&entry.389783960=1234567890&entry.10128527=example@mail.com&entry.102460747=2000-01-01&entry.918584008=00:00&submit=Submit/",
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//   },
//     type: 'GET',
//     // contentType: "application/x-www-form-urlencoded",
//     dataType: 'json', // added data type
//     success: function(res) {
//         console.log(res);
//         alert(res);
//     }
// });
// }