/**
 * Sprout 2.0 - Onboarding App Interaction Controller
 * Manages 5-step onboarding flow, Next/Back controls, Stepper updates, and State Switcher.
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentScreen = 1;
  const totalScreens = 5;
  let currentState = 'default';
  let currentLang = 'en';

  // Check URL query param e.g. ?screen=3 or ?state=loading
  const urlParams = new URLSearchParams(window.location.search);
  const paramScreen = parseInt(urlParams.get('screen'), 10);
  if (paramScreen >= 1 && paramScreen <= 5) {
    currentScreen = paramScreen;
  }
  const paramState = urlParams.get('state');
  if (paramState) {
    currentState = paramState;
  }
  const paramLang = urlParams.get('lang');
  if (paramLang === 'hi' || paramLang === 'en') {
    currentLang = paramLang;
  } else {
    try {
      const savedLang = localStorage.getItem('sprout_lang');
      if (savedLang) currentLang = savedLang;
    } catch(e) {}
  }

  // DOM Elements
  const screens = document.querySelectorAll('.onboarding-screen');
  const stepPills = document.querySelectorAll('.step-pill');
  const stepCounterText = document.getElementById('step-counter-text');
  const appBackBtn = document.getElementById('app-back-btn');
  const screenJumpBtns = document.querySelectorAll('.screen-jump-btn');
  const stateBtns = document.querySelectorAll('.state-ctrl-btn');

  function renderScreen(screenNum) {
    currentScreen = screenNum;

    // Toggle active screen
    screens.forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.screen, 10) === currentScreen);
    });

    // Update stepper pills
    stepPills.forEach((pill, idx) => {
      const stepIdx = idx + 1;
      pill.classList.remove('active', 'completed');
      if (stepIdx < currentScreen) {
        pill.classList.add('completed');
      } else if (stepIdx === currentScreen) {
        pill.classList.add('active');
      }
    });

    // Update counter text e.g. "Step 2 of 5"
    if (stepCounterText) {
      stepCounterText.textContent = `${currentScreen}/${totalScreens}`;
    }

    // Back button visibility / state
    if (appBackBtn) {
      appBackBtn.style.visibility = currentScreen === 1 ? 'hidden' : 'visible';
    }

    // Update jump list buttons
    screenJumpBtns.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.jumpScreen, 10) === currentScreen);
    });

    // Reset celebration on screen 5 if entering fresh
    const celebBox = document.getElementById('screen5-celebration');
    const investForm = document.getElementById('screen5-form');
    if (celebBox && investForm && currentScreen === 5 && currentState !== 'success') {
      celebBox.classList.remove('active');
      investForm.style.display = 'flex';
    }

    // Ensure translations remain active
    if (window.applyTranslations) {
      window.applyTranslations(currentLang);
    }
  }

  function applyState(stateName) {
    currentState = stateName;

    // Update state buttons styling
    stateBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.state === currentState);
    });

    // Reset all state sub-views in Screen 4
    const waitStateView = document.getElementById('kyc-wait-state');
    const defaultKycView = document.getElementById('kyc-default-state');
    const slowNetBanner = document.getElementById('slow-network-banner');
    const otpDelayCard = document.getElementById('otp-delay-card');
    const errorBanner = document.getElementById('error-banner');
    const offlineBanner = document.getElementById('offline-banner');
    const successBanner = document.getElementById('success-banner');
    const screen5Celeb = document.getElementById('screen5-celebration');
    const screen5Form = document.getElementById('screen5-form');

    // Hide all conditionally
    if (slowNetBanner) slowNetBanner.classList.remove('active');
    if (otpDelayCard) otpDelayCard.style.display = 'none';
    if (errorBanner) errorBanner.classList.remove('active');
    if (offlineBanner) offlineBanner.classList.remove('active');
    if (successBanner) successBanner.classList.remove('active');

    if (currentState === 'loading') {
      // Force jump to screen 4 for wait state inspection
      renderScreen(4);
      if (waitStateView && defaultKycView) {
        waitStateView.style.display = 'flex';
        defaultKycView.style.display = 'none';
      }
    } else {
      if (waitStateView && defaultKycView) {
        waitStateView.style.display = 'none';
        defaultKycView.style.display = 'flex';
      }
    }

    if (currentState === 'slow network') {
      if (slowNetBanner) slowNetBanner.classList.add('active');
    }

    if (currentState === 'otp delay') {
      renderScreen(4);
      if (otpDelayCard) otpDelayCard.style.display = 'block';
    }

    if (currentState === 'error') {
      renderScreen(4);
      if (errorBanner) errorBanner.classList.add('active');
      const panInput = document.getElementById('pan-input');
      if (panInput) {
        panInput.value = 'ABCDE1234F';
        panInput.style.borderColor = 'var(--color-warning-text)';
      }
    }

    if (currentState === 'offline') {
      if (offlineBanner) offlineBanner.classList.add('active');
    }

    if (currentState === 'success') {
      if (currentScreen === 4) {
        if (successBanner) successBanner.classList.add('active');
      } else if (currentScreen === 5) {
        if (screen5Celeb && screen5Form) {
          screen5Form.style.display = 'none';
          screen5Celeb.classList.add('active');
        }
      }
    }

    if (currentState === 'hindi') {
      currentLang = 'hi';
      if (window.applyTranslations) window.applyTranslations('hi');
    } else if (currentState === 'default' && currentLang === 'hi' && paramLang !== 'hi') {
      currentLang = 'en';
      if (window.applyTranslations) window.applyTranslations('en');
    }
  }

  // Next / Continue button click handlers
  document.querySelectorAll('[data-action="next-screen"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentScreen < totalScreens) {
        renderScreen(currentScreen + 1);
      }
    });
  });

  // Back button click handler
  if (appBackBtn) {
    appBackBtn.addEventListener('click', () => {
      if (currentScreen > 1) {
        renderScreen(currentScreen - 1);
      }
    });
  }

  // Direct Jump Buttons in Control Panel
  screenJumpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetScreen = parseInt(btn.dataset.jumpScreen, 10);
      renderScreen(targetScreen);
    });
  });

  // State Switcher Buttons
  stateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyState(btn.dataset.state);
    });
  });

  // Language Toggle buttons inside app
  document.querySelectorAll('.app-lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'hi' : 'en';
      if (window.applyTranslations) {
        window.applyTranslations(currentLang);
      }
    });
  });

  // "Remind me later" drawer modal (Screen 3)
  const remindLaterBtn = document.getElementById('btn-remind-later');
  const remindDialog = document.getElementById('remind-dialog-backdrop');
  const closeDialogBtn = document.getElementById('close-remind-dialog');
  const confirmReminderBtn = document.getElementById('confirm-reminder-btn');

  if (remindLaterBtn && remindDialog) {
    remindLaterBtn.addEventListener('click', () => {
      remindDialog.classList.add('active');
    });
  }
  if (closeDialogBtn && remindDialog) {
    closeDialogBtn.addEventListener('click', () => {
      remindDialog.classList.remove('active');
    });
  }
  if (confirmReminderBtn && remindDialog) {
    confirmReminderBtn.addEventListener('click', () => {
      remindDialog.classList.remove('active');
      alert('Reminder scheduled: We will notify you tomorrow when you have your documents ready.');
    });
  }

  // Amount selector buttons (Screen 5)
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customAmountInput = document.getElementById('custom-amount-input');
  const investSubmitBtn = document.getElementById('invest-confirm-btn');

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const val = btn.dataset.amount;
      if (customAmountInput) customAmountInput.value = val;
      if (investSubmitBtn) {
        investSubmitBtn.textContent = `Confirm and Invest ₹${val}`;
      }
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', (e) => {
      amountBtns.forEach(b => b.classList.remove('selected'));
      const val = parseInt(e.target.value, 10) || 100;
      if (investSubmitBtn) {
        investSubmitBtn.textContent = `Confirm and Invest ₹${val}`;
      }
    });
  }

  // Invest Form Submission (Screen 5 -> Restrained Celebration)
  const investForm = document.getElementById('screen5-form');
  const celebrationBox = document.getElementById('screen5-celebration');
  if (investForm && celebrationBox) {
    investForm.addEventListener('submit', (e) => {
      e.preventDefault();
      investForm.style.display = 'none';
      celebrationBox.classList.add('active');
    });
  }

  // Initialize
  renderScreen(currentScreen);
  if (currentState !== 'default') {
    applyState(currentState);
  }
});
