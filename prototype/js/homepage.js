/**
 * Sprout 2.0 - Homepage Controller
 * Zero external requests, accessible interactions, language switching.
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentLang = 'en';

  // Check saved language or browser preference
  try {
    const saved = localStorage.getItem('sprout_lang');
    if (saved === 'hi' || saved === 'en') {
      currentLang = saved;
    }
  } catch(e) {}

  if (window.applyTranslations) {
    window.applyTranslations(currentLang);
  }

  // Language toggle buttons
  const langButtons = document.querySelectorAll('.lang-toggle-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'hi' : 'en';
      if (window.applyTranslations) {
        window.applyTranslations(currentLang);
      }
    });
  });

  // Video click-to-load handler (Marketing compromise)
  const videoBtn = document.getElementById('video-poster-trigger');
  const videoContainer = document.getElementById('video-container');
  if (videoBtn && videoContainer) {
    videoBtn.addEventListener('click', () => {
      videoContainer.innerHTML = `
        <div style="padding: 2rem; background: var(--color-surface-white); text-align: center; border-radius: var(--radius-xl);">
          <p style="font-weight: var(--weight-bold); color: var(--color-forest-primary); margin-bottom: 0.5rem;">60-Second Video Walkthrough</p>
          <p style="font-size: 0.9375rem; color: var(--color-text-secondary); max-width: 480px; margin: 0 auto 1rem;">
            "Starting with ₹100 is simple. We select your verified fund, verify your PAN in seconds, and show you exactly where your money grows."
          </p>
          <a href="./app/index.html" class="btn-primary" style="display: inline-flex;">Try Interactive Prototype Instead →</a>
        </div>
      `;
    });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
