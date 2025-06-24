// Scroll animation handler
function handleScroll() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const scrollProgress = Math.min(scrollY / (windowHeight * 0.5), 1);
  
  // Get all floating photos
  const floatingPhotos = document.querySelectorAll('.floating-photo');
  
  // Show floating photos based on scroll progress
  if (scrollProgress > 0.2) {
    floatingPhotos.forEach((photo, index) => {
      setTimeout(() => {
        photo.classList.add('visible');
      }, index * 200);
    });
  } else {
    floatingPhotos.forEach(photo => {
      photo.classList.remove('visible');
    });
  }
  
  // Optional: Scale main card slightly as user scrolls
  const mainCard = document.querySelector('.main-card');
  const scaleValue = Math.max(0.9, 1 - scrollProgress * 0.1);
  mainCard.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;
}

// Throttle scroll events for better performance
let ticking = false;

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
}

function finishTick() {
  ticking = false;
}

// Add scroll event listener
window.addEventListener('scroll', () => {
  requestTick();
  setTimeout(finishTick, 16); // ~60fps
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
  const mainCard = document.querySelector('.main-card');
  const photoFrame = document.querySelector('.photo-frame');
  
  // Add subtle parallax effect to main card
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    
    mainCard.style.transform = `translate(-50%, -50%) rotateY(${x * 2}deg) rotateX(${-y * 2}deg)`;
  });
  
  // Reset transform when mouse leaves
  document.addEventListener('mouseleave', () => {
    mainCard.style.transform = 'translate(-50%, -50%)';
  });
  
  // Add click animation to floating photos
  const floatingPhotos = document.querySelectorAll('.floating-photo');
  floatingPhotos.forEach(photo => {
    photo.addEventListener('click', () => {
      photo.style.transform = 'scale(1.2) rotate(0deg)';
      photo.style.zIndex = '20';
      
      setTimeout(() => {
        photo.style.transform = '';
        photo.style.zIndex = '';
      }, 300);
    });
  });
});

console.log('Birthday card loaded! 🎉');
