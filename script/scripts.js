// Toggle class active for hamburger menu
const navbarNav = document.querySelector('nav ul');

document.querySelector('#hamburger-menu').onclick = (event) => {
    event.preventDefault(); // Prevent default action of the anchor tag
    navbarNav.classList.toggle('active');
};

// SLIDE SHOW //
let slideIndex = 1;
let slideTimer;

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  resetTimer();
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
  resetTimer();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function showSlidesAutomatically() {
  slideIndex++;
  showSlides(slideIndex);
  slideTimer = setTimeout(showSlidesAutomatically, 5000); // Change image every 5 seconds
}

function resetTimer() {
  clearTimeout(slideTimer);
  slideTimer = setTimeout(showSlidesAutomatically, 5000);
}

// Start the initial timer
resetTimer();

$(document).ready(function() {
  function checkWindowSize() {
      if ($(window).width() <= 768) {
          $('#section-1-h2').hide();
          $('#features .part p').hide();
      } else {
          $('#section-1-h2').show();
          $('#features .part p').show();
      }
  }

  // Initial check
  checkWindowSize();

  // Check on window resize
  $(window).resize(checkWindowSize);

  $('.toggle-btn').on('click', function() {
      $(this).next('p').slideToggle();
  });
});

window.addEventListener('load', () => {
  const openingScene = document.getElementById('opening-scene');
  const mainContent = document.getElementById('main-content');
  const logo = document.querySelector('.logo');

  setTimeout(() => {
      logo.classList.add('fade-in');
  }, 1000);

  setTimeout(() => {
      openingScene.classList.add('fade-out');
      mainContent.classList.add('visible');
  }, 3000);
});

// klik di luar elemen 
const hm = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e) {
    if(!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }});