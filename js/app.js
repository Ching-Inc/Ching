document.getElementById("submit-btn").addEventListener("click", addToEmailListing);

// Smooth scrolling for menu links
$(document).ready(function(){

  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {
        window.location.hash = hash;
      });
    }
  });
});

function addToEmailListing() {
  // var script_url = "https://script.google.com/macros/s/AKfycbzVUFjypOFzFiPD7cZXnBdZ7hBx9MJ2lm_Bqm00ifofAWVikkzSDr9uWbzFjArbQOXqiw/exec";
  var script_url = "https://script.google.com/macros/s/AKfycbz8Spu5n_KcLIh0IkNiQoH4k83PXpfD2QQ3ge74-U20/dev";
  var fname = document.getElementById("fname").value;
  var contact = document.getElementById("contact").value;
  var phone  = ("" + contact).replace(/\D/g, "");  
  var match  = contact.match(/\S+@\S+\.\S+/);
  var match1 = contact.match(/^(\d{3})(\d{3})(\d{4})$/);
  var type   = "invalid";

  if(match)
    type = "Email";
  else if(match1) {
    type    = "Phone";
    contact = '(' + match1[1] + ') ' + match1[2] + '-' + match1[3];
  }

  if(contact == "" || type == "invalid")
    document.getElementById("contact").style.borderColor = "red";

  if(fname == "")
    document.getElementById("fname").style.borderColor = "red";

  if(fname != "" && contact != "" && type != "invalid") {
    $.getJSON(
      script_url + "?callback=?",
      {
        method:"doGet",
        "fname": fname,
        "contact": contact,
        "type": type
      }
    );
    document.getElementById("join-form").hidden = true;
    document.getElementById("join-success").hidden = false;
  }
}