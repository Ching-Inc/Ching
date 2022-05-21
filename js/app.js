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
<<<<<<< Updated upstream
  // var script_url = "https://script.google.com/macros/s/AKfycbzVUFjypOFzFiPD7cZXnBdZ7hBx9MJ2lm_Bqm00ifofAWVikkzSDr9uWbzFjArbQOXqiw/exec";
  var script_url = "https://script.google.com/macros/s/AKfycbwvWj0eARaAp8EkoWKp_9SmgyXcZuGQYyoS48N_kBk/dev";
=======
  // var script_url = "https://script.google.com/macros/s/AKfycbzHgC1GV1qVM2RcfNADSC9E6w5suEqxYB7R1BbCUT1wp1mKf0RlitESvp1kd6YngQac/exec";
  var script_url = "https://script.google.com/macros/s/AKfycbwcQwAxpJs6K0CDLpAuYICS8ZAvUzvMhmfLf-QdfUQ/dev";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        method    :"doGet",
        "contact" : contact,
        "type"    : type
      }
    );
    document.getElementById("join-form").hidden = true;
    // document.getElementById("join-success").hidden = false;
=======
        method:"doGet",
        "contact": contact,
        "type": type
      }
    );
    document.getElementById("join-form").hidden = true;
    // document.getElementById("join-success").hidden = false;s
>>>>>>> Stashed changes
  }
}