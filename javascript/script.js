const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});


// Seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // Toggle selected class for unselected seats
    e.target.classList.toggle('selected');
    updateSelectedCount();
  } else if (
    e.target.classList.contains('seat') &&
    e.target.classList.contains('selected')
  ) {
    // Remove selected class for selected seats to cancel booking
    e.target.classList.remove('selected');
    updateSelectedCount();
  }
});

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

function validateForm() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  if (selectedSeats.length < 1) {
    alert('Please select at least one seat.');
    return false;
  }

  // Add 'booked' class to booked seats
  selectedSeats.forEach((seat) => {
    seat.classList.remove('selected');
    seat.classList.add('booked');
  });

  // Add 'available' class to available seats
  const availableSeats = document.querySelectorAll('.row .seat:not(.booked)');
  availableSeats.forEach((seat) => {
    seat.classList.remove('selected');
    seat.classList.remove('available');
    seat.classList.add('available');
  });

  updateSelectedCount();

  return true;
}


var now = new Date();
var deadline = new Date();
deadline.setHours(0,0,0,0); // set deadline to midnight
if (now.getHours() >= 21) { // if it's after 9pm, set deadline to midnight tomorrow
    deadline.setDate(deadline.getDate() + 1);
}
deadline.setHours(3*Math.floor((now.getHours()+3)/3),0,0,0); // set deadline to next 3-hour mark

var x = setInterval(function() {
    var now = new Date();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    document.getElementById("day").innerHTML = days;
    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minute").innerHTML = minutes; 
    document.getElementById("second").innerHTML = seconds; 
    if (t < 0) {
        deadline = new Date(deadline.getTime() + 1000 * 60 * 60 * 24); // add one day to the deadline
        deadline.setHours(3*Math.floor((deadline.getHours()+3)/3),0,0,0); // set deadline to next 3-hour mark
    }
}, 1000);



