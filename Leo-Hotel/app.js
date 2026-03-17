// ── PAGE SWITCHING ────────────────────────────────────────────────────────────

const pages = {
  home:         document.getElementById('page-home'),
  booking:      document.getElementById('page-booking'),
  confirmation: document.getElementById('page-confirmation'),
};

function showPage(name) {
  Object.values(pages).forEach(function(page) {
    page.classList.add('d-none');
  });
  if (pages[name]) {
    pages[name].classList.remove('d-none');
  }
  window.scrollTo(0, 0);
}

document.querySelectorAll('[data-page]').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    showPage(el.getAttribute('data-page'));
  });
});

showPage('home');


// ── ROOM SELECTION ────────────────────────────────────────────────────────────

let selectedRoom = null;

document.querySelectorAll('.room-card').forEach(function(card) {
  card.addEventListener('click', function() {
    const room = card.getAttribute('data-room');

    // Click same card again = deselect
    if (selectedRoom === room) {
      card.classList.remove('selected');
      selectedRoom = null;
      document.getElementById('room-display').value = '';
      return;
    }

    // Deselect all, select clicked
    document.querySelectorAll('.room-card').forEach(function(c) {
      c.classList.remove('selected');
    });

    card.classList.add('selected');
    selectedRoom = room;

    // Auto-fill the room field in the form
        document.getElementById('room-display').value = room;
  });
});


// ── FORM SUBMISSION ───────────────────────────────────────────────────────────

document.getElementById('btn-boka').addEventListener('click', function() {
  const name     = document.getElementById('full-name').value.trim();
  const email    = document.getElementById('email').value.trim();
  const checkin  = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;

  if (!selectedRoom)       { alert('Please select a room.'); return; }
  if (!name)               { alert('Please enter your name.'); return; }
  if (!email)              { alert('Please enter your email.'); return; } 
  if (!email.includes('@')){ alert('Please enter your email with @.'); return; } 
  if (!checkin)            { alert('Please select a check-in date.'); return; }
  if (!checkout)           { alert('Please select a check-out date.'); return; }
  if (checkout <= checkin) { alert('Check-out must be after check-in.'); return; }

  document.getElementById('conf-name').textContent     = name;
  document.getElementById('conf-room').textContent     = selectedRoom.charAt(0).toUpperCase() + selectedRoom.slice(1);
  document.getElementById('conf-checkin').textContent  = checkin;
  document.getElementById('conf-checkout').textContent = checkout;
  document.getElementById('conf-email').textContent    = email;

  showPage('confirmation');
});
// ── RESET ─────────────────────────────────────────────────────────────────────
  document.getElementById('btn-new-booking').addEventListener('click', function() {
  
  // Clear form fields
  document.getElementById('full-name').value    = '';
  document.getElementById('email').value        = '';
  document.getElementById('checkin').value      = '';
  document.getElementById('checkout').value     = '';
  document.getElementById('room-display').value = '';

  // Deselect room cards
  document.querySelectorAll('.room-card').forEach(function(c) {
    c.classList.remove('selected');
  });
  selectedRoom = null;
  showPage('booking'); 

});