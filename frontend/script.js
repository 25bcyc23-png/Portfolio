/*Custom Cursor*/
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top  = e.clientY + 'px';
  }, 80);
});

document.querySelectorAll('a, button, .tag, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorTrail.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorTrail.style.opacity = '0.5';
  });
});

/*Navbar Scroll & Active Link*/
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link =>
    link.classList.toggle('active', link.getAttribute('href') === '#' + current)
  );
});

/*Mobile Menu*/
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/*Typing Effect*/
const phrases = [
  'Ethical Hacker & Security Researcher',
  'CTF Player & Challenge Designer',
  'Network Security Enthusiast',
  'Cryptography Explorer',
  'Building a Safer Digital World',
];
const typingEl = document.getElementById('typingText');
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
      return;
    }
    setTimeout(type, 40);
  } else {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }
    setTimeout(type, 80);
  }
}
setTimeout(type, 1200);

/*Scroll Reveal*/
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/*Skill Bars*/
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsBox = document.querySelector('.skills-box');
if (skillsBox) skillObserver.observe(skillsBox);

/*Counter Animation*/
function animateCounter(el) {
  const target   = parseInt(el.dataset.target);
  const duration = 1500;
  const start    = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

/*Contact Form*/
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const btnText    = document.getElementById('btnText');
const btnLoader  = document.getElementById('btnLoader');
const formStatus = document.getElementById('formStatus');

const showError  = (id, msg) => { document.getElementById(id).textContent = msg; };
const clearError = id        => { document.getElementById(id).textContent = ''; };

function validateForm(data) {
  let valid = true;
  ['nameError','emailError','subjectError','messageError'].forEach(clearError);

  if (!data.name.trim())    { showError('nameError',    'Name is required.');        valid = false; }
  if (!data.email.trim())   { showError('emailError',   'Email is required.');       valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                            { showError('emailError',   'Enter a valid email.');     valid = false; }
  if (!data.subject.trim()) { showError('subjectError', 'Subject is required.');     valid = false; }
  if (!data.message.trim()) { showError('messageError', 'Message is required.');     valid = false; }
  else if (data.message.trim().length < 10)
                            { showError('messageError', 'Min 10 characters.');       valid = false; }
  return valid;
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const data = {
    name:    document.getElementById('name').value,
    email:   document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  if (!validateForm(data)) return;

  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  submitBtn.disabled = true;
  formStatus.classList.add('hidden');

  try {
    const res    = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (res.ok && result.success) {
      formStatus.textContent = "✓ Message sent! I'll get back to you soon.";
      formStatus.className   = 'form-status success';
      form.reset();
    } else {
      throw new Error(result.message || 'Server error');
    }
  } catch (err) {
    formStatus.textContent = '✗ Could not send. Please try again.';
    formStatus.className   = 'form-status error';
  } finally {
    formStatus.classList.remove('hidden');
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    submitBtn.disabled = false;
  }
});

//Clear errors on input
['name','email','subject','message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => clearError(id + 'Error'));
});
