<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Secure Access - fahimn.co.in</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    
    <link rel="stylesheet" href="auth_style.css" />

    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <script type="text/javascript">
      (function() { 
            // Default init for OTP functionality
            emailjs.init("3yO6tbaHty1fGoy2U"); 
        })();
    </script>
  </head>
  <body>
    <div class="bg-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    
    <div id="topToast" class="top-toast">
      <i class="fa-solid fa-envelope-circle-check" style="color: var(--glow-primary); font-size: 18px;"></i>
      <span id="topToastMsg">OTP sent to your email</span>
    </div>
    
    <div class="global-overlay" id="toastModalOverlay" style="z-index: 999999;">
      <div class="modal-content" style="padding: 30px 20px;">
        <h4 style="font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900; color: var(--brand-gray); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">
          Fahimn.co.in
        </h4>
        <div id="toastModalIcon" class="icon-circle-warm" style="margin: 0 auto 16px auto; width: 56px; height: 56px; font-size: 26px;">
          <i class="fa-solid fa-circle-exclamation"></i>
        </div>
        <h2 id="toastModalTitle" style="font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 800; margin-bottom: 8px;">
          Action Required
        </h2>
        <p id="toastModalMessage" style="font-size: 14px; font-weight: 500; color: #cbd5e1; margin-bottom: 24px;">
          Message goes here
        </p>
        <button id="toastModalBtn" class="btn-primary" onclick="document.getElementById('toastModalOverlay').style.display='none'" style="font-size: 13px; letter-spacing: 1px; text-transform: uppercase; padding: 12px;">
          OKAY
        </button>
      </div>
    </div>
    
    <div class="global-overlay" id="policyModal" style="z-index: 100000;">
      <div class="modal-content">
        <button class="close-modal-btn" onclick="AuthLogic.closePolicyModal()">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="icon-circle-warm" style="margin: 0 auto 12px auto; width: 48px; height: 48px; font-size: 20px; background: rgba(255,255,255,0.05); color: #fff;">
          <i class="fa-solid fa-shield-halved" id="modalIcon"></i>
        </div>
        <h2 id="modalTitle">
          Policy
        </h2>
        <p id="modalBody">
          Content goes here...
        </p>
        <button class="btn-primary" id="modalActionBtn">
          <span id="modalBtnText">Read on Google</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </button>
      </div>
    </div>
    
    <div class="auth-container">
      <div class="global-overlay" id="langOverlay" style="z-index: 9999;">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p style="font-weight: 600; font-size: 12px; color: #fff;" id="langLoadText">
          Please Wait...
        </p>
      </div>
      
      <div id="view-home" class="auth-view active">
        <div class="top-nav">
          <div class="left-actions">
            <button class="btn-sq" onclick="AuthLogic.toggleLanguage()">
              <span id="langBtnTextHome" style="font-size: 12px; font-weight: bold;">A/अ</span>
            </button>
          </div>
          <div class="premium-badge" data-i18n="badge">
            Login To fahimn.co.in
          </div>
          <div class="right-spacer"></div>
        </div>
        <h1 class="welcome-title">
          <span data-i18n="homeWelcome" style="font-size: 16px; font-weight: 600; color: var(--brand-gray);">Welcome to</span>
          <br />
          <span class="pro-text-shimmer">Fahimn.co.in</span>
        </h1>
        <p class="welcome-subtitle" data-i18n="homeSub">
          Connect, share and grow with a community that inspires you
        </p>
        <div class="glass-btn-wrapper" style="margin-bottom: 10px;" onclick="AuthLogic.switchView('view-signup')">
          <button class="glass-btn" style="text-align: left; padding: 12px 14px; justify-content: flex-start;">
            <div class="icon-circle-home" style="margin-right: 12px; background: rgba(255,255,255,0.1); color: #fff;">
              <i class="fa-solid fa-user-plus"></i>
            </div>
            <div class="card-text" style="margin-left: 0;">
              <h3 data-i18n="title">Create Account</h3>
              <div class="anim-text-wrapper">
                <div class="anim-text-item">
                  <i class="fa-solid fa-rocket" style="color: #fff;"></i>
                  <span data-i18n="homeBtn1Sub">Start your journey with us</span>
                </div>
                <div class="anim-text-item">
                  <i class="fa-solid fa-gem" style="color: #ffcc00;"></i>
                  <span data-i18n="feat1">Get free premium unlocked apps.</span>
                </div>
              </div>
            </div>
            <div class="arrow-circle" style="margin-left: auto;">
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </button>
        </div>
        
        <div class="action-card card-secondary" onclick="AuthLogic.switchView('view-login')">
          <div class="icon-circle-home">
            <i class="fa-regular fa-user"></i>
          </div>
          <div class="card-text">
            <h3 data-i18n="loginText">Login</h3>
            <p data-i18n="homeBtn2Sub">Welcome back! Sign in to continue</p>
          </div>
          <i class="fa-solid fa-arrow-right arrow-icon"></i>
        </div>
        
        <div class="action-card card-secondary" onclick="AuthLogic.switchView('view-recovery')">
          <div class="icon-circle-home">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <div class="card-text">
            <h3 data-i18n="findAccTitle">Find Your Account</h3>
            <p data-i18n="findAccSub">Recover your account easily</p>
          </div>
          <i class="fa-solid fa-arrow-right arrow-icon"></i>
        </div>
        
        <div class="divider">
          <span data-i18n="orContinue">or continue with</span>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button id="googleBtnLoaderHome" class="google-btn-large" onclick="AuthLogic.signInWithGoogle('googleBtnLoaderHome', 'googleBtnInnerHome')">
            <span id="googleBtnInnerHome" style="display:flex; align-items:center; gap:10px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <span data-i18n="googleBtn">Continue with Google</span>
            </span>
          </button>
        </div>
        <div class="footer-wrapper">
          <div class="footer-links">
            <a onclick="AuthLogic.openPolicyModal('privacy')">Privacy Policy</a>
            •
            <a onclick="AuthLogic.openPolicyModal('terms')">Terms of Service</a>
          </div>
          <div class="copyright" data-i18n="copyright">
            © 2026 Fahimn.co.in. All rights reserved.
          </div>
        </div>
      </div>
      
      <div id="view-signup" class="auth-view">
        <div class="top-nav-start">
          <button class="btn-sq" onclick="AuthLogic.switchView('view-home')">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <div class="header-section" style="margin-bottom: 12px;">
          <h1 data-i18n="title">Create Account</h1>
          <p data-i18n="subtitle">Join Fahimn.co.in and start your journey with our community</p>
        </div>
        
        <button id="googleBtnLoaderSignup" class="google-btn-large" style="margin-bottom: 10px;" onclick="AuthLogic.signInWithGoogle('googleBtnLoaderSignup', 'googleBtnInnerSignup')">
          <span id="googleBtnInnerSignup" style="display:flex; align-items:center; gap:10px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            <span data-i18n="googleBtn">Continue with Google</span>
          </span>
        </button>
        
        <div class="divider" style="margin: 6px 0 14px 0;">
          <span data-i18n="orContinueEmail">or sign up with email</span>
        </div>
        
        <div class="modern-input-card">
          <div class="icon-circle-warm">
            <i class="fa-regular fa-user"></i>
          </div>
          <div class="modern-input-content">
            <input type="text" id="signupName" class="modern-input" placeholder=" " />
            <label data-i18n="nameLabel">Name</label>
          </div>
        </div>
        <div class="modern-input-card">
          <div class="icon-circle-warm">
            <i class="fa-regular fa-envelope"></i>
          </div>
          <div class="modern-input-content">
            <input type="email" id="signupEmail" class="modern-input" placeholder=" " />
            <label data-i18n="emailLabel">Your Email Address</label>
          </div>
        </div>
        <div class="modern-input-card">
          <div class="icon-circle-warm">
            <i class="fa-solid fa-lock"></i>
          </div>
          <div class="modern-input-content">
            <input type="password" id="signupPassword" class="modern-input" placeholder=" " />
            <label data-i18n="passLabel">Password</label>
            <button class="eye-btn" onclick="AuthLogic.togglePassword('signupPassword', 'eyeIcon1')">
              <i class="fa-regular fa-eye-slash" id="eyeIcon1"></i>
            </button>
          </div>
        </div>
        
        <div class="glass-btn-wrapper" id="signupBtnWrapper" style="margin-top: 8px;">
          <button class="glass-btn" id="signupSubmitBtn" onclick="AuthLogic.handleSignup()">
            <span id="signupBtnText" data-i18n="btnSendOTP">Generate OTP</span>
            <i id="signupBtnIcon" class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        
        <div class="trust-badge-container">
          <div class="trust-badge">
            <i class="fa-solid fa-shield-halved" style="color: var(--success);"></i>
            256-Bit Secure
          </div>
        </div>
        
        <div class="footer-wrapper" style="margin-top: 10px; padding-top: 0;">
          <div class="footer-links" style="font-size: 13px;">
            <span data-i18n="alreadyAcc">Already have an account?</span>
            <a onclick="AuthLogic.switchView('view-login')" data-i18n="loginText" style="color:#fff; font-weight: 700;">Login</a>
          </div>
        </div>
      </div>
      
      <div id="view-login" class="auth-view">
        <div class="top-nav-start">
          <button class="btn-sq" onclick="AuthLogic.switchView('view-home')">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <div class="header-section" style="margin-bottom: 12px;">
          <h1 data-i18n="loginText">Login</h1>
          <p data-i18n="homeBtn2Sub">Welcome back! Sign in to continue</p>
        </div>
        
        <button id="googleBtnLoaderLogin" class="google-btn-large" style="margin-bottom: 10px;" onclick="AuthLogic.signInWithGoogle('googleBtnLoaderLogin', 'googleBtnInnerLogin')">
          <span id="googleBtnInnerLogin" style="display:flex; align-items:center; gap:10px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            <span data-i18n="googleBtn">Continue with Google</span>
          </span>
        </button>
        
        <div class="divider">
          <span data-i18n="orLoginEmail">or login with email</span>
        </div>
        
        <div class="modern-input-card">
          <div class="icon-circle-warm">
            <i class="fa-regular fa-envelope"></i>
          </div>
          <div class="modern-input-content">
            <input type="email" id="loginEmail" class="modern-input" placeholder=" " />
            <label data-i18n="emailLabel">Your Email Address</label>
          </div>
        </div>
        <div class="modern-input-card" style="margin-bottom: 6px;">
          <div class="icon-circle-warm">
            <i class="fa-solid fa-lock"></i>
          </div>
          <div class="modern-input-content">
            <input type="password" id="loginPassword" class="modern-input" placeholder=" " />
            <label data-i18n="passLabel">Password</label>
            <button class="eye-btn" onclick="AuthLogic.togglePassword('loginPassword', 'eyeIcon2')">
              <i class="fa-regular fa-eye-slash" id="eyeIcon2"></i>
            </button>
          </div>
        </div>
        
        <a class="forgot-link" onclick="AuthLogic.switchView('view-recovery')" data-i18n="forgotPass">Forgot Password?</a>
        
        <button class="btn-primary" id="loginSubmitBtn" style="margin-top: 10px;" onclick="AuthLogic.processLogin()">
          <span id="loginBtnText" data-i18n="loginText">Login</span>
          <i id="loginBtnIcon" class="fa-solid fa-arrow-right"></i>
        </button>
        
        <div class="footer-wrapper" style="margin-top: 16px;">
          <div class="footer-links" style="font-size: 13px;">
            <span data-i18n="noAcc">Don't have an account?</span>
            <a onclick="AuthLogic.switchView('view-signup')" data-i18n="createAccText" style="color:#fff; font-weight: 700;">Create One</a>
          </div>
        </div>
      </div>
      
      <div id="view-recovery" class="auth-view">
        <div class="top-nav-start">
          <button class="btn-sq" onclick="AuthLogic.switchView('view-login')">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <div class="header-section">
          <div class="icon-circle-warm pulse-anim" style="margin: 0 auto 16px auto; width: 72px; height: 72px; font-size: 32px; background: rgba(56, 189, 248, 0.1); color: var(--glow-primary); box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);">
            <i class="fa-solid fa-user-lock"></i>
          </div>
          <h1 data-i18n="findAccTitle">Find Your Account</h1>
          <p data-i18n="findAccSub">
            We will send a password reset link to your email instantly.
          </p>
        </div>
        
        <div class="modern-input-card">
          <div class="icon-circle-warm">
            <i class="fa-regular fa-envelope"></i>
          </div>
          <div class="modern-input-content">
            <input type="email" id="recoveryEmail" class="modern-input" placeholder=" " />
            <label data-i18n="emailLabel">Your Email Address</label>
          </div>
        </div>
        
        <div class="glass-btn-wrapper" id="recBtnWrapper" style="margin-top: 10px;">
          <button class="glass-btn" id="searchAccBtn" onclick="AuthLogic.processRecoverySearch()">
            <span id="recBtnText" data-i18n="btnSearchAcc">Send Reset Link</span>
            <i id="recBtnIcon" class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
      
      <div id="view-otp" class="auth-view">
        <div class="top-nav-start">
          <button class="btn-sq" onclick="AuthLogic.switchView('view-signup')">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        
        <div class="verification-timeline">
          <div class="step done">
            <i class="fa-solid fa-check"></i>
          </div>
          <div class="step-line done"></div>
          <div class="step active">
            <i class="fa-solid fa-envelope-open-text"></i>
          </div>
          <div class="step-line"></div>
          <div class="step">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
        </div>
        
        <div class="header-section" style="margin-bottom: 12px;">
          <h1 data-i18n="otpTitle">Check your email</h1>
          <p>
            <span data-i18n="otpSubtitle">We've sent a 6-digit verification code to</span>
            <br />
            <strong id="displayOtpEmail" style="color: #fff; font-size: 14px; margin-top: 4px; display: inline-block;"></strong>
          </p>
        </div>
        
        <div style="margin-bottom: 24px;">
          <input type="text" id="otpCode" class="otp-input-box" placeholder="------" maxlength="6" oninput="this.value=this.value.replace(/[^0-9]/g,'');" />
        </div>
        
        <button class="glass-btn" id="verifyBtn" style="border: 1px solid rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.1);" onclick="AuthLogic.verifyOTP()">
          <span id="verifyText" data-i18n="btnVerify">Verify & Proceed</span>
          <i id="verifyIcon" class="fa-solid fa-arrow-right"></i>
        </button>
        
        <div class="footer-wrapper" style="margin-top: 20px;">
          <div class="footer-links" style="font-size: 13px;">
            <span id="timerText">
              <span data-i18n="resendTimer">Resend code in</span>
              00:<span id="timerCount">60</span>
            </span>
            <a id="resendBtn" style="display:none; color: #fff;" onclick="AuthLogic.resendOTP()" data-i18n="resendCode">Resend Code</a>
          </div>
        </div>
      </div>
    </div>

    <script>
      /**
         * Global Configuration & State
         */
        window.isAuthenticating = false;

        const firebaseConfig = {
            apiKey: "AIzaSyC9T2Y5txsjo1qHvjEx6j3iN_4NMzyK9Qw",
            authDomain: "fahimn.co.in",
            databaseURL: "https://fahimn-co-in-default-rtdb.firebaseio.com",
            projectId: "fahimn.co.in",
            storageBucket: "fahimn-co-in.firebasestorage.app",
            messagingSenderId: "698585907618",
            appId: "1:698585907618:web:c8e4a6646b6b8f5c7932fb"
        };
        
        // Initialize Firebase securely
        if (!firebase.apps.length) { 
            firebase.initializeApp(firebaseConfig); 
        }
        
        const db = firebase.database();
        const auth = firebase.auth();

        // Listen for Auth State Changes
        auth.onAuthStateChanged((user) => { 
            if (user && !window.isAuthenticating) { 
                window.location.href = 'index.html'; 
            } 
        });

        /**
         * Translation Dictionary
         */
        const translations = {
            en: {
                badge: "Login To fahimn.co.in", 
                homeWelcome: "Welcome to", 
                homeSub: "Connect, share and grow with a community that inspires you",
                homeBtn1Sub: "Start your journey with us", 
                feat1: "Get free premium unlocked apps.", 
                feat2: "Connect your friends.",
                findAccTitle: "Find Your Account", 
                findAccSub: "We will send a password reset link to your email instantly.",
                title: "Create Account", 
                subtitle: "Join Fahimn.co.in and start your journey with our community",
                nameLabel: "Name", 
                emailLabel: "Your Email Address", 
                passLabel: "Password", 
                passHint: "Password must be at least 6 characters",
                btnSendOTP: "Generate OTP", 
                loginText: "Login", 
                btnSearchAcc: "Send Reset Link", 
                or: "or", 
                orContinue: "or continue with", 
                orContinueEmail: "or sign up with email", 
                orLoginEmail: "or login with email", 
                forgotPass: "Forgot Password?",
                alreadyAcc: "Already have an account?", 
                noAcc: "Don't have an account?", 
                createAccText: "Create One",
                processing: "Processing...", 
                sendWait: "Sending link...", 
                accountFound: "Successfully Sent! Check Spam folder too.", 
                otpTitle: "Check your email", 
                otpSubtitle: "We've sent a 6-digit verification code to ", 
                btnVerify: "Verify & Proceed",
                copyright: "© 2026 Fahimn.co.in. All rights reserved.", 
                transWait: "Please Wait...", 
                resendTimer: "Resend code in", 
                resendCode: "Resend Code", 
                googleBtn: "Continue with Google"
            },
            hi: {
                badge: "Login To fahimn.co.in", 
                homeWelcome: "आपका स्वागत है", 
                homeSub: "जुड़ें, साझा करें और उस समुदाय के साथ बढ़ें जो आपको प्रेरित करता है",
                homeBtn1Sub: "हमारे साथ अपनी यात्रा शुरू करें", 
                feat1: "मुफ़्त प्रीमियम अनलॉक्ड ऐप्स पाएं।", 
                feat2: "अपने दोस्तों को जोड़ें।",
                findAccTitle: "अपना पासवर्ड रीसेट करें", 
                findAccSub: "हम आपके ईमेल पर तुरंत पासवर्ड रीसेट लिंक भेजेंगे।",
                title: "खाता बनाएं", 
                subtitle: "Fahimn.co.in से जुड़ें और हमारे समुदाय के साथ अपनी यात्रा शुरू करें",
                nameLabel: "नाम", 
                emailLabel: "आपका ईमेल पता", 
                passLabel: "पासवर्ड", 
                passHint: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए",
                btnSendOTP: "OTP जनरेट करें", 
                loginText: "लॉग इन करें", 
                btnSearchAcc: "रीसेट लिंक भेजें", 
                or: "या", 
                orContinue: "या इसके साथ जारी रखें", 
                orContinueEmail: "या ईमेल से साइन अप करें", 
                orLoginEmail: "या ईमेल से लॉगिन करें", 
                forgotPass: "पासवर्ड भूल गए?",
                alreadyAcc: "क्या आपके पास पहले से खाता है?", 
                noAcc: "क्या आपके पास खाता नहीं है?", 
                createAccText: "नया बनाएं",
                processing: "प्रक्रिया हो रही है...", 
                sendWait: "लिंक भेजा जा रहा है...", 
                accountFound: "सफलतापूर्वक भेजा गया! अपना स्पैम फ़ोल्डर भी चेक करें।", 
                otpTitle: "अपना ईमेल जांचें", 
                otpSubtitle: "हमने 6-अंकों का सत्यापन कोड भेजा है ", 
                btnVerify: "सत्यापित करें और आगे बढ़ें",
                copyright: "© 2026 Fahimn.co.in. सर्वाधिकार सुरक्षित।", 
                transWait: "कृपया प्रतीक्षा करें...", 
                resendTimer: "कोड फिर से भेजें", 
                resendCode: "कोड पुनः भेजें", 
                googleBtn: "Google के साथ जारी रखें"
            }
        };

        /**
         * Core Application Logic Module
         */
        const AuthLogic = {
            
            currentLang: 'en', 
            targetEmail: '', 
            targetName: '', 
            targetPassword: '', 
            generatedOTP: '', 
            timerInterval: null,
            
            // 🔥 NEW: Referral ID Capture
            referrerUid: new URLSearchParams(window.location.search).get('ref'),

            // 🔥 NEW: Referral Bonus Process
            processReferralBonus: function(newUserId) {
                if (this.referrerUid && this.referrerUid !== newUserId) {
                    const referrerRef = db.ref('users/' + this.referrerUid);
                    referrerRef.child('walletBalance').transaction((currentBalance) => {
                        return (currentBalance || 0) + 200;
                    });
                    referrerRef.child('referralCount').transaction((count) => {
                        return (count || 0) + 1;
                    });
                    referrerRef.child('referrals/' + newUserId).set(firebase.database.ServerValue.TIMESTAMP);
                }
            },

            /**
             * Send Welcome Email on Registration / Login
             */
            sendWelcomeEmail: function(userEmail, userName) {
                // Initializing the specific public key for this call only
                emailjs.send(
                    'service_r3jytrx', 
                    'template_zx4hhsi', 
                    { 
                        to_email: userEmail, 
                        name: userName || 'User' 
                    }, 
                    'PEq4jKqaA-f9RddAe' 
                ).then(() => {
                    console.log("Welcome email sent securely.");
                }).catch((err) => {
                    console.error("Welcome email failed: ", err);
                });
            },

            /**
             * Synthesize success chime using browser AudioContext
             */
            playSuccessSound: function() {
                try {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    if(!AudioContext) return;
                    
                    const ctx = new AudioContext();
                    
                    const playNote = (freq, type, startTime, duration) => {
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        
                        osc.type = type;
                        osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
                        
                        gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
                        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + startTime + 0.05);
                        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
                        
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        
                        osc.start(ctx.currentTime + startTime);
                        osc.stop(ctx.currentTime + startTime + duration);
                    };

                    // Execute 4-note chord sequence
                    playNote(523.25, 'sine', 0, 0.3);       
                    playNote(659.25, 'sine', 0.1, 0.3);     
                    playNote(783.99, 'sine', 0.2, 0.5);     
                    playNote(1046.50, 'triangle', 0.3, 0.6); 
                    
                } catch(error) { 
                    console.log("Audio API not supported in this environment"); 
                }
            },

            /**
             * Triggers top dropdown notification for OTP
             */
            showTopNotification: function(message) {
                const toast = document.getElementById('topToast');
                const toastMsg = document.getElementById('topToastMsg');
                
                toastMsg.innerText = message;
                toast.classList.add('show');
                
                // Hide after 3.5 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3500);
            },

            /**
             * Handle loading states for primary action buttons
             */
            setBtnLoading: function(btnId, textId, iconId, isLoading, defaultTextKey) {
                const btn = document.getElementById(btnId); 
                const textEl = document.getElementById(textId); 
                const iconEl = document.getElementById(iconId);

                if(isLoading) {
                    btn.disabled = true; 
                    textEl.innerText = this.currentLang === 'hi' ? 'प्रक्रिया हो रही है...' : 'Processing...'; 
                    // Temporarily hide animation during loading for searchAccBtn to use notched spinner
                    if(btnId === 'searchAccBtn') {
                        btn.parentElement.classList.add('loading-state');
                    }
                    iconEl.className = 'fa-solid fa-circle-notch fa-spin';
                } else {
                    btn.disabled = false; 
                    textEl.innerText = translations[this.currentLang][defaultTextKey];
                    
                    if(btnId === 'searchAccBtn') {
                        btn.parentElement.classList.remove('loading-state');
                        iconEl.className = 'fa-solid fa-paper-plane'; 
                    } else {
                        iconEl.className = 'fa-solid fa-arrow-right';
                    }
                }
            },

            /**
             * Triggers center modal for critical alerts
             */
            showToast: function(message, type = 'error') {
                const overlay = document.getElementById('toastModalOverlay');
                const iconContainer = document.getElementById('toastModalIcon');
                const titleEl = document.getElementById('toastModalTitle');
                const msgEl = document.getElementById('toastModalMessage');
                const btnEl = document.getElementById('toastModalBtn');

                let iconClass, iconColor, titleText, btnBg;

                // Configure alert UI based on type
                if (type === 'success') {
                    iconClass = 'fa-circle-check'; 
                    iconColor = 'var(--success)';
                    titleText = this.currentLang === 'hi' ? 'सफल' : 'Success'; 
                    btnBg = 'var(--success)';
                } else if (type === 'info') {
                    iconClass = 'fa-circle-info'; 
                    iconColor = '#38bdf8'; 
                    titleText = this.currentLang === 'hi' ? 'जानकारी' : 'Notice'; 
                    btnBg = '#38bdf8';
                } else {
                    iconClass = 'fa-circle-exclamation'; 
                    iconColor = 'var(--danger)';
                    titleText = this.currentLang === 'hi' ? 'त्रुटि' : 'Action Required'; 
                    btnBg = '#ffffff'; 
                }

                // Apply configuration
                iconContainer.style.color = iconColor;
                iconContainer.style.background = `rgba(255,255,255,0.05)`; 
                iconContainer.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
                
                titleEl.innerText = titleText; 
                titleEl.style.color = iconColor; 
                msgEl.innerText = message;
                
                if(type === 'error'){ 
                    btnEl.style.background = '#ffffff'; 
                    btnEl.style.color = '#000000'; 
                } else { 
                    btnEl.style.background = btnBg; 
                    btnEl.style.color = '#000000'; 
                }

                // Display alert
                overlay.style.display = 'flex';
            },

            /**
             * Handlers for Policy Modal
             */
            openPolicyModal: function(type) {
                const modal = document.getElementById('policyModal'); 
                const title = document.getElementById('modalTitle');
                const body = document.getElementById('modalBody'); 
                const actionBtn = document.getElementById('modalActionBtn');
                
                modal.style.display = 'flex';
                
                if(type === 'privacy') {
                    title.innerText = this.currentLang === 'hi' ? "गोपनीयता नीति" : "Privacy Policy";
                    body.innerText = this.currentLang === 'hi' ? "हमारी गोपनीयता नीतियां Google द्वारा प्रबंधित की जाती हैं। कृपया आगे पढ़ने के लिए क्लिक करें।" : "Our privacy policies are strictly managed by Google. Please click below to read them on Google's official page.";
                    actionBtn.onclick = () => window.open('https://policies.google.com/privacy', '_blank');
                } else if(type === 'terms') {
                    title.innerText = this.currentLang === 'hi' ? "सेवा की शर्तें" : "Terms of Service";
                    body.innerText = this.currentLang === 'hi' ? "हमारी सेवा की शर्तें Google के दिशा-निर्देशों का पालन करती हैं।" : "Our terms of service strictly follow Google's official guidelines. Read them securely below.";
                    actionBtn.onclick = () => window.open('https://policies.google.com/terms', '_blank');
                }
            },
            
            closePolicyModal: function() { 
                document.getElementById('policyModal').style.display = 'none'; 
            },

            /**
             * Multi-view screen routing
             */
            switchView: function(viewId) {
                // Hide all views
                document.querySelectorAll('.auth-view').forEach(el => {
                    el.classList.remove('active');
                });
                
                // Show target view
                document.getElementById(viewId).classList.add('active');
                
                // Route specific resets
                if(viewId === 'view-recovery') { 
                    document.getElementById('searchAccBtn').disabled = false;
                    document.getElementById('recBtnText').innerText = translations[this.currentLang].btnSearchAcc;
                    document.getElementById('recBtnIcon').className = 'fa-solid fa-paper-plane';
                    document.getElementById('recoveryEmail').value = ''; 
                }
                
                if(viewId === 'view-otp') { 
                    document.getElementById('otpCode').focus(); 
                }
            },

            /**
             * Password visibility toggle
             */
            togglePassword: function(inputId, iconId) {
                const passInput = document.getElementById(inputId); 
                const eyeIcon = document.getElementById(iconId);
                
                if (passInput.type === "password") { 
                    passInput.type = "text"; 
                    eyeIcon.className = 'fa-regular fa-eye'; 
                } else { 
                    passInput.type = "password"; 
                    eyeIcon.className = 'fa-regular fa-eye-slash'; 
                }
            },

            /**
             * Application Internationalization (i18n)
             */
            toggleLanguage: function() {
                const overlay = document.getElementById('langOverlay'); 
                const loadText = document.getElementById('langLoadText');
                
                // Setup loader text based on target language
                loadText.innerText = this.currentLang === 'en' ? translations['hi'].transWait : translations['en'].transWait; 
                overlay.style.display = 'flex'; 
                
                setTimeout(() => {
                    // Switch current language
                    this.currentLang = this.currentLang === 'en' ? 'hi' : 'en';
                    
                    // Replace innerHTML
                    document.querySelectorAll('[data-i18n]').forEach(el => { 
                        const key = el.getAttribute('data-i18n'); 
                        if(translations[this.currentLang][key]) { 
                            el.innerHTML = translations[this.currentLang][key]; 
                        } 
                    });
                    
                    // Update main toggle button
                    let btnText = this.currentLang === 'en' ? 'A/अ' : 'EN'; 
                    if(document.getElementById('langBtnTextHome')) {
                        document.getElementById('langBtnTextHome').innerText = btnText;
                    }
                    
                    // Update Recovery Button text if active
                    if(document.getElementById('view-recovery').classList.contains('active')){
                        document.getElementById('recBtnText').innerText = translations[this.currentLang].btnSearchAcc;
                    }
                    
                    // Remove loading overlay
                    overlay.style.display = 'none'; 
                }, 800);
            },

            /**
             * Google OAuth Authentication Flow
             */
            signInWithGoogle: function(btnId, innerId) {
                
                window.isAuthenticating = true; 
                
                const provider = new firebase.auth.GoogleAuthProvider(); 
                const btnInner = document.getElementById(innerId); 
                const origInner = btnInner.innerHTML;
                
                // Trigger button loading state manually
                document.getElementById(btnId).disabled = true; 
                btnInner.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...`;

                auth.signInWithPopup(provider).then((result) => {
                    const user = result.user;
                    
                    // Cross check Database for initial registration
                    db.ref('users/' + user.uid).once('value').then(snap => {
                        if (!snap.exists()) {
                            
                            db.ref('users/' + user.uid).set({ 
                                uid: user.uid, 
                                name: user.displayName || 'Google User', 
                                email: user.email, 
                                profile_image: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=111&color=fff&bold=true`, 
                                khatarnak_id: Math.floor(10000 + Math.random() * 90000).toString(), 
                                last_login: firebase.database.ServerValue.TIMESTAMP 
                            }).then(() => { 
                                this.processReferralBonus(user.uid); // 🔥 CALLED HERE
                                this.playSuccessSound(); 
                                this.showToast(this.currentLang==='hi'?"लॉगिन सफल!":"Login Successful!", "success");
                                this.sendWelcomeEmail(user.email, user.displayName);
                                setTimeout(() => { window.location.href = 'index.html'; }, 2500);
                            });
                            
                        } else { 
                            // Returning Google User
                            this.playSuccessSound(); 
                            this.showToast(this.currentLang==='hi'?"लॉगिन सफल!":"Login Successful!", "success");
                            this.sendWelcomeEmail(user.email, user.displayName);
                            setTimeout(() => { window.location.href = 'index.html'; }, 2500);
                        }
                    });
                }).catch((error) => { 
                    window.isAuthenticating = false;
                    document.getElementById(btnId).disabled = false; 
                    btnInner.innerHTML = origInner; 
                    this.showToast(error.message, "error"); 
                });
            },

            /**
             * Password Recovery Flow with Data Verification
             */
            processRecoverySearch: function() {
                const recEmail = document.getElementById('recoveryEmail').value.trim().toLowerCase();
                
                if (!recEmail || !recEmail.includes('@')) { 
                    this.showToast(this.currentLang==='hi' ? "वैध ईमेल दर्ज करें।" : "Enter a valid email.", "error"); 
                    return; 
                }
                
                this.setBtnLoading('searchAccBtn', 'recBtnText', 'recBtnIcon', true, 'btnSearchAcc');
                
                // Validate email exists in Realtime Database before sending reset link
                db.ref('users').orderByChild('email').equalTo(recEmail).once('value')
                .then((snap) => {
                    if(snap.exists()) {
                        
                        // Execute Reset Link Dispatch
                        return auth.sendPasswordResetEmail(recEmail).then(() => {
                            this.setBtnLoading('searchAccBtn', 'recBtnText', 'recBtnIcon', false, 'btnSearchAcc');
                            this.playSuccessSound();
                            this.showTopNotification(this.currentLang==='hi' ? "पासवर्ड रीसेट लिंक आपके ईमेल पर भेज दिया गया है!" : "Password reset link sent to your email!");
                            
                            setTimeout(() => { 
                                this.switchView('view-login'); 
                                document.getElementById('recoveryEmail').value = '';
                            }, 3500);
                        });
                        
                    } else {
                        // Reject instantly if record missing
                        this.setBtnLoading('searchAccBtn', 'recBtnText', 'recBtnIcon', false, 'btnSearchAcc');
                        this.showToast(this.currentLang==='hi' ? "इस ईमेल से कोई खाता नहीं मिला।" : "No account found with this email.", "error");
                    }
                })
                .catch(err => { 
                    this.setBtnLoading('searchAccBtn', 'recBtnText', 'recBtnIcon', false, 'btnSearchAcc');
                    this.showToast(err.message, "error"); 
                });
            },

            /**
             * Initial Phase of User Creation
             */
            handleSignup: function() {
                this.targetEmail = document.getElementById('signupEmail').value.trim().toLowerCase(); 
                this.targetName = document.getElementById('signupName').value.trim(); 
                this.targetPassword = document.getElementById('signupPassword').value.trim();
                
                // Form Validations
                if (!this.targetName) { 
                    this.showToast(this.currentLang==='hi'?"कृपया अपना नाम दर्ज करें।":"Please enter your full name."); 
                    return; 
                }
                if (!this.targetEmail || !this.targetEmail.includes('@')) { 
                    this.showToast(this.currentLang==='hi'?"अवैध ईमेल पता।":"Invalid email address."); 
                    return; 
                }
                if (this.targetPassword.length < 6) { 
                    this.showToast(this.currentLang==='hi'?"पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।":"Password must be at least 6 characters."); 
                    return; 
                }
                
                this.sendOTPLogic();
            },

            /**
             * Dispatching OTP via EmailJS API (Upgraded with Smart Variables & Real Location)
             */
            sendOTPLogic: async function() {
                this.setBtnLoading('signupSubmitBtn', 'signupBtnText', 'signupBtnIcon', true, 'btnSendOTP');
                
                // Generate 6 digit secure code
                this.generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
                
                // Save state for Magic Link verification in new tab
                localStorage.setItem('magic_otp', this.generatedOTP);
                localStorage.setItem('magic_email', this.targetEmail);
                localStorage.setItem('magic_name', this.targetName);
                localStorage.setItem('magic_pass', this.targetPassword);

                const now = new Date();
                const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + " on " + now.toLocaleDateString('en-GB');

                let ua = window.navigator.userAgent;
                let userOS = 'Unknown Device';
                if (ua.indexOf('Win') !== -1) userOS = 'Windows';
                else if (ua.indexOf('Mac') !== -1) userOS = 'MacOS';
                else if (ua.indexOf('Android') !== -1) userOS = 'Android';
                else if (ua.indexOf('like Mac') !== -1) userOS = 'iOS';

                let userBrowser = 'Unknown Browser';
                if(ua.match(/chrome|chromium|crios/i)) userBrowser = "Chrome";
                else if(ua.match(/firefox|fxios/i)) userBrowser = "Firefox";
                else if(ua.match(/safari/i)) userBrowser = "Safari";
                else if(ua.match(/opr\//i)) userBrowser = "Opera";
                else if(ua.match(/edg/i)) userBrowser = "Edge";

                // UPDATE: Magic Link logic fixed to force 'index.html' explicitly if needed.
                // Or simply ensure the base URL is sent cleanly.
                let baseUrl = window.location.origin + window.location.pathname;
                const magicLinkUrl = baseUrl + "?verify_code=" + this.generatedOTP;

                // Fetch Real Location
                let realLocation = "Location Unavailable";
                try {
                    const response = await fetch('https://ipapi.co/json/');
                    const data = await response.json();
                    if(data && data.city) {
                        realLocation = `${data.city}, ${data.region}, ${data.country_name}`;
                    }
                } catch(error) {
                    console.warn("Location fetch failed, using fallback.", error);
                    realLocation = "Unknown Location"; 
                }

                emailjs.send(
                    'service_4uol868',    
                    'template_xy2bkrf',   
                    { 
                        to_email: this.targetEmail, 
                        name: this.targetName || 'User', 
                        otp_code: this.generatedOTP,
                        time: currentTime,
                        browser: userBrowser,
                        os: userOS,
                        location: realLocation,
                        magic_link: magicLinkUrl,
                        lock_account_url: "https://fahimn.co.in/recovery",
                        support_url: "https://fahimn.co.in/support"
                    },
                    '3yO6tbaHty1fGoy2U'   
                ).then(() => {
                    this.setBtnLoading('signupSubmitBtn', 'signupBtnText', 'signupBtnIcon', false, 'btnSendOTP');
                    this.showTopNotification(this.currentLang === 'hi' ? "OTP आपके ईमेल पर भेज दिया गया है!" : "OTP sent to your email!");
                    document.getElementById('displayOtpEmail').innerText = this.targetEmail; 
                    document.getElementById('otpCode').value = ""; 
                    this.switchView('view-otp'); 
                    this.startTimer();
                }).catch((err) => { 
                    this.setBtnLoading('signupSubmitBtn', 'signupBtnText', 'signupBtnIcon', false, 'btnSendOTP');
                    this.showToast(err.message || "Failed to communicate with server.", "error"); 
                });
            },

            /**
             * Code Validation and Firebase Finalization
             */
            verifyOTP: function() {
                const enteredCode = document.getElementById('otpCode').value.trim();
                
                if (enteredCode !== this.generatedOTP) { 
                    this.showToast(this.currentLang==='hi'?"अमान्य कोड।":"Invalid code.", "error"); 
                    return; 
                }
                
                window.isAuthenticating = true; 
                this.setBtnLoading('verifyBtn', 'verifyText', 'verifyIcon', true, 'btnVerify');
                
                auth.createUserWithEmailAndPassword(this.targetEmail, this.targetPassword).then((userCred) => {
                    const dp = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.targetName)}&background=111&color=fff&bold=true`;
                    
                    return userCred.user.updateProfile({ 
                        displayName: this.targetName, 
                        photoURL: dp 
                    }).then(() => {
                        return db.ref('users/' + userCred.user.uid).set({ 
                            uid: userCred.user.uid, 
                            name: this.targetName, 
                            email: this.targetEmail, 
                            profile_image: dp, 
                            khatarnak_id: Math.floor(10000 + Math.random() * 90000).toString(), 
                            last_login: firebase.database.ServerValue.TIMESTAMP 
                        });
                    });
                }).then(() => { 
                    this.processReferralBonus(auth.currentUser.uid); // 🔥 CALLED HERE
                    this.playSuccessSound();
                    this.showToast(this.currentLang==='hi'?"खाता बनाया गया!":"Account created!", "success"); 
                    this.sendWelcomeEmail(this.targetEmail, this.targetName);
                    
                    setTimeout(() => { 
                        window.location.href = 'index.html'; 
                    }, 2500);
                    
                }).catch(err => { 
                    window.isAuthenticating = false;
                    this.setBtnLoading('verifyBtn', 'verifyText', 'verifyIcon', false, 'btnVerify');
                    
                    let errorMsg = err.code === 'auth/email-already-in-use' ? 
                        (this.currentLang==='hi'?"ईमेल उपयोग में है।":"Email in use.") : err.message;
                        
                    this.showToast(errorMsg, "error"); 
                });
            },

            /**
             * Standard Email/Password Login
             */
            processLogin: function() {
                let logEmail = document.getElementById('loginEmail').value.trim(); 
                let logPass = document.getElementById('loginPassword').value.trim();
                
                if (!logEmail || !logPass) { 
                    this.showToast(this.currentLang==='hi'?"ईमेल और पासवर्ड दर्ज करें।":"Please enter email and password.", "error"); 
                    return; 
                }
                
                window.isAuthenticating = true; 
                this.setBtnLoading('loginSubmitBtn', 'loginBtnText', 'loginBtnIcon', true, 'loginText');
                
                auth.signInWithEmailAndPassword(logEmail, logPass).then(() => { 
                    this.setBtnLoading('loginSubmitBtn', 'loginBtnText', 'loginBtnIcon', false, 'loginText');
                    this.playSuccessSound();
                    this.showToast(this.currentLang==='hi'?"लॉगिन सफल!":"Login Successful!", "success"); 
                    this.sendWelcomeEmail(logEmail, 'User');
                    
                    setTimeout(() => { 
                        window.location.href = 'index.html'; 
                    }, 2500);
                    
                }).catch(err => { 
                    window.isAuthenticating = false;
                    this.setBtnLoading('loginSubmitBtn', 'loginBtnText', 'loginBtnIcon', false, 'loginText');
                    this.showToast(err.message, "error"); 
                });
            },

            /**
             * OTP Resend Countdown Logic
             */
            startTimer: function() {
                clearInterval(this.timerInterval); 
                let timeLeft = 60;
                
                document.getElementById('timerText').style.display = 'inline'; 
                document.getElementById('resendBtn').style.display = 'none'; 
                document.getElementById('timerCount').innerText = timeLeft; 
                
                this.timerInterval = setInterval(() => {
                    timeLeft--; 
                    document.getElementById('timerCount').innerText = timeLeft < 10 ? '0' + timeLeft : timeLeft;
                    
                    if (timeLeft <= 0) { 
                        clearInterval(this.timerInterval); 
                        document.getElementById('timerText').style.display = 'none'; 
                        document.getElementById('resendBtn').style.display = 'inline'; 
                    }
                }, 1000);
            },
            
            resendOTP: function() { 
                this.sendOTPLogic(); 
            }
        };

        /**
         * Magic Link Auto-Verification Listener
         */
        window.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const verifyCode = urlParams.get('verify_code');
            
            if (verifyCode) {
                // Determine which view should be visible to prevent showing the default home view.
                // We default to 'view-otp' so the user sees the verification state immediately.
                AuthLogic.switchView('view-otp');
                
                const savedOTP = localStorage.getItem('magic_otp');
                
                if (savedOTP && verifyCode === savedOTP) {
                    
                    AuthLogic.generatedOTP = savedOTP;
                    AuthLogic.targetEmail = localStorage.getItem('magic_email');
                    AuthLogic.targetName = localStorage.getItem('magic_name');
                    AuthLogic.targetPassword = localStorage.getItem('magic_pass');
                    
                    document.getElementById('otpCode').value = verifyCode;
                    document.getElementById('displayOtpEmail').innerText = AuthLogic.targetEmail;
                    
                    AuthLogic.showTopNotification(AuthLogic.currentLang === 'hi' ? "मैजिक लिंक द्वारा स्वचालित सत्यापन हो रहा है..." : "Magic Link Detected! Verifying automatically...");
                    
                    setTimeout(() => {
                        AuthLogic.verifyOTP();
                        
                        localStorage.removeItem('magic_otp');
                        localStorage.removeItem('magic_email');
                        localStorage.removeItem('magic_name');
                        localStorage.removeItem('magic_pass');
                        
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }, 1500);
                } else {
                    // Provide generic failure and allow them to retry or request a new code.
                    AuthLogic.showToast(AuthLogic.currentLang === 'hi' ? "लिंक अमान्य या समाप्त हो गया है।" : "Magic Link is invalid or expired.", "error");
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } else {
                 // No verification code, show default home view.
                 AuthLogic.switchView('view-home');
            }
        });
    </script>
  </body>
</html>
