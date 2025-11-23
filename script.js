// Basic UI interactions: mobile menu, scroll, navbar state, form stub, toast
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');
const toastEl = document.getElementById('toast');

function toggleMobileMenu(){
  const open = mobileMenu.classList.toggle('active');
  mobileMenu.style.display = open ? 'block' : 'none';
  mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
}

// smooth scroll helper
function scrollToSection(id){
  const el = document.getElementById(id);
  if (!el) return;
  // close mobile menu if open
  if (mobileMenu.classList.contains('active')) {
    toggleMobileMenu();
  }
  el.scrollIntoView({behavior:'smooth',block:'start'});
}

// scroll to top brand
function scrollToTop(){
  window.scrollTo({top:0,behavior:'smooth'});
}

// navbar shrink / shadow on scroll
function handleScroll(){
  if (window.scrollY > 24) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleScroll, {passive:true});
handleScroll(); // init

// simple toast
function showToast(message, ms = 3000){
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(()=> toastEl.classList.remove('show'), ms);
}

// contact form stub
function submitForm(e){
  e.preventDefault();
  // extract minimal fields (in real site send to backend)
  const name = (document.getElementById('name')||{}).value || '';
  const email = (document.getElementById('email')||{}).value || '';
  showToast('Thanks — we received your message. We will follow up by email.');
  // clear form gently
  e.target.reset();
}

// small helpers
document.getElementById('year').textContent = new Date().getFullYear();

// accessibility: close mobile menu when clicking outside
document.addEventListener('click', (ev) => {
  const target = ev.target;
  if (!mobileMenu.contains(target) && !mobileBtn.contains(target) && mobileMenu.classList.contains('active')) {
    toggleMobileMenu();
  }
});

// expose for console/testing
window.toggleMobileMenu = toggleMobileMenu;
window.scrollToSection = scrollToSection;
window.submitForm = submitForm;
window.scrollToTop = scrollToTop;
