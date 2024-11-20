localStorage.clear();
const tours = [
  { name: 'Beach Paradise', description: 'Experience the beauty of sun-kissed beaches.', price: 499 },
  { name: 'Mountain Adventure', description: 'Join us for an exhilarating adventure in the mountains.', price: 699 },
  { name: 'Cultural City Tour', description: 'Discover the rich history and culture of our vibrant cities.', price: 399 },
];

function setMode(mode) {
  document.body.className = mode;
  localStorage.setItem('mode', mode);
}

function applyPreferences() {
  const mode = localStorage.getItem('mode') || 'light';
  setMode(mode);
}

function registration() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username) {
    localStorage.setItem(username, password);
  }
}


function login() {
  const InputUsername = document.getElementById('username').value;
  const password = localStorage.getItem(InputUsername);
  const InputPassword = document.getElementById('password').value;
  const userPanel = document.getElementById('user-panel');
  const error = document.getElementById('reg-error');
  error.style.display = 'none'
  if (password === InputPassword) {
    // userPanel.querySelector('#user-name').textContent = String(username);
    updateUI(true);
  }
  else {
    error.style.display = 'block';
  }
}

function logout() {
  // localStorage.removeItem('username');
  updateUI(false);
}


function updateUI(mode) {
  const InputUsername = document.getElementById('username').value;
  const userPanel = document.getElementById('user-panel');
  const logoutBtn = document.getElementById('logout-btn');
  const loginForm = document.getElementById('auth');
  const regBtn = document.getElementById('reg-btn');

  if (mode) {

    // loginForm.querySelector('#login-btn').style.display = 'none';
    loginForm.style.display = 'none';

    logoutBtn.style.display = 'block';

    userPanel.style.display = 'flex';
    userPanel.querySelector('#user-name').textContent = InputUsername;

    // regBtn.style.display = 'none'
  } else {
    loginForm.querySelector('#login-btn').style.display = 'block';
    logoutBtn.style.display = 'none';
    regBtn.style.display = 'block'
    loginForm.style.display = 'block';

    userPanel.style.display = 'none';
    regBtn.style.display = 'block'



  }
}

function renderTours(sortOption) {
  const sortedTours = tours.sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else {
      return a.price - b.price;
    }
  });

  const tourList = document.getElementById('tour-list');
  tourList.innerHTML = sortedTours
    .map(tour => `
            <div class="col-md-4 tour">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${tour.name}</h5>
                        <p class="card-text">${tour.description}</p>
                        <p class="card-text"><strong>Price: $${tour.price}</strong></p>
                        <button class="btn btn-success">Book Now</button>
                    </div>
                </div>
            </div>
        `).join('');
}
document.getElementById('reg-btn').addEventListener('click', registration);
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('logout-btn').addEventListener('click', logout);
document.getElementById('mode').addEventListener('change', (event) => setMode(event.target.value));
document.getElementById('sort').addEventListener('change', (event) => renderTours(event.target.value));

applyPreferences();
updateUI();
renderTours('alphabetical');
