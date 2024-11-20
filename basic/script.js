import offers from './offers.js'; // Importing the offers module

// Function to return HTML for a specific category
function getOffersHTML(category) {
  let html = '';
  switch (category) {
    case 'cruises':
      html += '<h2>Cruise Offers</h2>';
      offers.cruises.forEach(cruise => {
        html += `
          <div class="card">
            <h3>Destination: ${cruise.destination}</h3>
            <p><strong>Duration:</strong> ${cruise.duration}</p>
            <p><strong>Price:</strong> $${cruise.price}</p>
            <p>${cruise.description}</p>
          </div>
        `;
      });
      break;

    case 'flights':
      html += '<h2>Flight Offers</h2>';
      offers.flights.forEach(flight => {
        html += `
          <div class="card">
            <h3>From: ${flight.from} to ${flight.to}</h3>
            <p><strong>Price:</strong> $${flight.price}</p>
            <p>${flight.description}</p>
          </div>
        `;
      });
      break;

    case 'tours':
      html += '<h2>Tour Offers</h2>';
      offers.tours.forEach(tour => {
        html += `
          <div class="card">
            <h3>Name: ${tour.name}</h3>
            <p><strong>Location:</strong> ${tour.location}</p>
            <p><strong>Duration:</strong> ${tour.duration}</p>
            <p><strong>Price:</strong> $${tour.price}</p>
            <p>${tour.description}</p>
          </div>
        `;
      });
      break;

    default:
      html = '<p>No offers available.</p>';
      break;
  }
  return html;
}

// Function to update the content and thumbnail based on category
function updateOffers(category, thumbnailSrc) {
  const offersContainer = document.getElementById('offerContent');
  offersContainer.innerHTML = getOffersHTML(category);
  const offerThumbnail = document.getElementById('offerThumbnail');
  offerThumbnail.src = thumbnailSrc;
}

// Event Listeners for Category Buttons
document.getElementById('cruiseButton').addEventListener('click', () => {
  updateOffers('cruises', './img/thumb2.jpg');
});

document.getElementById('toursButton').addEventListener('click', () => {
  updateOffers('tours', './img/thumb3.jpg');
});

document.getElementById('flightsButton').addEventListener('click', () => {
  updateOffers('flights', './img/thumb1.jpg');
});

// Light/Dark Mode Toggle
const toggleThemeButton = document.getElementById('themeToggle');
toggleThemeButton.addEventListener('click', () => {
  const htmlElement = document.querySelector('html');
  if (htmlElement.classList.contains('light-mode')) {
    htmlElement.classList.remove('light-mode');
    toggleThemeButton.textContent = 'Light Mode';
  } else {
    htmlElement.classList.add('light-mode');
    toggleThemeButton.textContent = 'Dark Mode';
  }
});

// Get DOM elements
// const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const signupToggle = document.getElementById('signupToggle');
const signupPopup = document.getElementById('signupPopup');
const loginPopup = document.getElementById('loginPopup');

const closeSignup = document.getElementById('closeSignup');
const closeLogin = document.getElementById('closeLogin');

const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginError = document.getElementById('loginError');

// Open Sign Up Popup
signupToggle.addEventListener('click', function () {
  loginPopup.style.display = 'none';
  signupPopup.style.display = 'block';
});

// Close Sign Up Popup
closeSignup.addEventListener('click', function () {
  signupPopup.style.display = 'none';
});

// Close Login Popup
closeLogin.addEventListener('click', function () {
  loginPopup.style.display = 'none';
});

// Open Login Popup

const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', function() {
    loginPopup.style.display = 'block'; // Open login popup
    signupPopup.style.display = 'none'; // Close sign-up popup if it's open
});
// Sign Up Form Submission
signupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (validateSignupForm(username, email, password)) {
    storeUserData(username, email, password);
    window.location.href = './about.html'; // Redirect to profile page after signup
  }
});

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (validateLoginForm(email, password)) {
    loginUser(email, password);
  }
});

// Sign Up Form Validation
function validateSignupForm(username, email, password) {
  emailError.textContent = '';
  passwordError.textContent = '';
  
  // Email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    return false;
  }

  if (password.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters.';
    return false;
  }

  return true;
}

function validateLoginForm(email, password) {
  loginError.textContent = '';
  
  if (!email || !password) {
    loginError.textContent = 'Please enter both email and password.';
    return false;
  }

  return true;
}

function storeUserData(username, email, password) {
  const userData = {
    username,
    email,
    password,
  };

  localStorage.setItem(email, JSON.stringify(userData)); 
}

function loginUser(email, password) {
  const storedUser = JSON.parse(localStorage.getItem(email));

  if (storedUser && storedUser.password === password) {
    localStorage.setItem('loggedUser', JSON.stringify(storedUser));
    window.location.href = './profile.html'; 
  } else {
    loginError.textContent = 'Invalid email or password. Please try again.';
  }
}

async function fetchRandomFact() {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/facts', {
            method: 'GET',
            headers:{'X-Api-Key': '/8qse1s9AGy5Yba5NsZA7Q==sonsH68pWpa4afG0'}
        },
      );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data[0].fact; // The random fact data
    } catch (error) {
        console.error('Error fetching random fact:', error);
        return null;
    }
}

document.getElementById('fact').textContent =  await fetchRandomFact()