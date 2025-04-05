// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
// Add .hidden class to error modal in HTML (done once)
document.querySelector('#modal').classList.add('hidden');

// Event listener for heart clicks
document.addEventListener('DOMContentLoaded', () => {
  const hearts = document.querySelectorAll('.like-glyph');

  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      if (heart.classList.contains('activated-heart')) {
        // If heart is full, empty it
        heart.classList.remove('activated-heart');
        heart.textContent = '♡';
      } else {
        // If heart is empty, attempt to like
        mimicServerCall()
          .then(() => {
            // Success: make heart full
            heart.classList.add('activated-heart');
            heart.textContent = '♥';
          })
          .catch(error => {
            // Failure: show error modal
            const modal = document.querySelector('#modal');
            modal.querySelector('#modal-message').textContent = error;
            modal.classList.remove('hidden');

            // Hide modal after 3 seconds
            setTimeout(() => {
              modal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
