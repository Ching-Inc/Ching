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
  var script_url = "https://script.google.com/macros/s/AKfycbzDNXgf5a94J4q0m_H8M8lQCcZmgVA6E_pMyvTTmPIXZa0vhnf8HtCh08nQqbXRQ01o/exec";
  var contact = document.getElementById("contact").value;
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
  
  if(contact != "" && type != "invalid") {
    $.getJSON(
      script_url + "?callback=?",
      {
        method    :"doGet",
        "contact" : contact,
        "type"    : type
      }
    );
    document.getElementById("join-form").hidden = true;
    document.getElementById("join-success").hidden = false;
  }
}