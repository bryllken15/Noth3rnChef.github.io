document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const header = document.getElementById("main-header")
  const backToTopButton = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
      backToTopButton.style.display = "block"
    } else {
      header.classList.remove("scrolled")
      backToTopButton.style.display = "none"
    }
  })

  // Mobile menu functionality
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu-overlay")
  const closeMenu = document.querySelector(".close-menu")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
    document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
  })

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = "" // Re-enable scrolling
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // Back to top button functionality
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Toggle password visibility
  const togglePassword = document.getElementById("togglePassword")
  const passwordInput = document.getElementById("password")

  togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)
    this.classList.toggle("fa-eye")
    this.classList.toggle("fa-eye-slash")
  })

  // Form validation
  const loginForm = document.getElementById("loginForm")
  const emailInput = document.getElementById("email")
  const emailError = emailInput.nextElementSibling
  const passwordError = passwordInput.nextElementSibling.nextElementSibling

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let isValid = true

    // Reset error messages
    emailError.textContent = ""
    passwordError.textContent = ""

    // Validate email
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required"
      isValid = false
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address"
      isValid = false
    }

    // Validate password
    if (!passwordInput.value.trim()) {
      passwordError.textContent = "Password is required"
      isValid = false
    } else if (passwordInput.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters"
      isValid = false
    }

    if (isValid) {
      // Show loading state
      const loginButton = document.querySelector(".login-button")
      const originalText = loginButton.textContent
      loginButton.textContent = "Logging in..."
      loginButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        // Success - redirect to home page
        window.location.href = "home.html"

        // In case of error, you would do:
        // loginButton.textContent = originalText;
        // loginButton.disabled = false;
        // showErrorMessage("Invalid email or password");
      }, 1500)
    }
  })

  // Input validation on blur
  emailInput.addEventListener("blur", function () {
    if (this.value.trim() && !isValidEmail(this.value.trim())) {
      emailError.textContent = "Please enter a valid email address"
    } else {
      emailError.textContent = ""
    }
  })

  passwordInput.addEventListener("blur", function () {
    if (this.value.trim() && this.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters"
    } else {
      passwordError.textContent = ""
    }
  })

  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Social login buttons
  const googleBtn = document.querySelector(".google-btn")
  const facebookBtn = document.querySelector(".facebook-btn")

  googleBtn.addEventListener("click", () => {
    alert("Google login functionality will be implemented here")
  })

  facebookBtn.addEventListener("click", () => {
    alert("Facebook login functionality will be implemented here")
  })

  // Remember me functionality
  const rememberMeCheckbox = document.getElementById("rememberMe")

  // Check if there's a saved email in localStorage
  const savedEmail = localStorage.getItem("rememberedEmail")
  if (savedEmail) {
    emailInput.value = savedEmail
    rememberMeCheckbox.checked = true
  }

  rememberMeCheckbox.addEventListener("change", function () {
    if (this.checked) {
      localStorage.setItem("rememberedEmail", emailInput.value)
    } else {
      localStorage.removeItem("rememberedEmail")
    }
  })

  // Forgot password functionality
  const forgotPasswordLink = document.querySelector(".forgot-password")
  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault()

    // Create modal for password reset
    const modal = document.createElement("div")
    modal.className = "password-reset-modal"
    modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h3>Reset Password</h3>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
          <form id="resetPasswordForm">
            <div class="input-container">
              <i class="fas fa-envelope input-icon"></i>
              <input type="email" id="resetEmail" placeholder="Enter your email" required>
            </div>
            <button type="submit" class="reset-button">Send Reset Link</button>
          </form>
        </div>
      `

    document.body.appendChild(modal)

    // Add styles for the modal
    const style = document.createElement("style")
    style.textContent = `
        .password-reset-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          background-color: #1a1a1a;
          padding: 30px;
          border-radius: 8px;
          width: 90%;
          max-width: 400px;
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .close-modal {
          position: absolute;
          top: 15px;
          right: 15px;
          font-size: 24px;
          cursor: pointer;
          color: #a6a6a6;
        }
        
        .close-modal:hover {
          color: #e3d03a;
        }
        
        .modal-content h3 {
          margin-bottom: 15px;
          color: #fff;
        }
        
        .modal-content p {
          margin-bottom: 20px;
          color: #a6a6a6;
        }
        
        .reset-button {
          width: 100%;
          padding: 12px;
          background-color: #e3d03a;
          color: #1a1a1a;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 15px;
        }
        
        .reset-button:hover {
          background-color: #fff;
        }
      `

    document.head.appendChild(style)

    // Close modal functionality
    const closeModalBtn = document.querySelector(".close-modal")
    closeModalBtn.addEventListener("click", () => {
      document.body.removeChild(modal)
      document.head.removeChild(style)
    })

    // Handle reset password form submission
    const resetForm = document.getElementById("resetPasswordForm")
    resetForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const resetEmail = document.getElementById("resetEmail").value

      // Show loading state
      const resetButton = document.querySelector(".reset-button")
      resetButton.textContent = "Sending..."
      resetButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        document.body.removeChild(modal)
        document.head.removeChild(style)

        // Show success message
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.innerHTML = `
            <div class="success-content">
              <i class="fas fa-check-circle"></i>
              <h3>Reset Link Sent</h3>
              <p>We've sent a password reset link to ${resetEmail}</p>
              <button class="close-success">OK</button>
            </div>
          `

        document.body.appendChild(successMessage)

        // Add styles for success message
        const successStyle = document.createElement("style")
        successStyle.textContent = `
            .success-message {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.7);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1001;
              animation: fadeIn 0.3s ease;
            }
            
            .success-content {
              background-color: #1a1a1a;
              padding: 30px;
              border-radius: 8px;
              width: 90%;
              max-width: 400px;
              text-align: center;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            }
            
            .success-content i {
              font-size: 48px;
              color: #4CAF50;
              margin-bottom: 15px;
            }
            
            .success-content h3 {
              margin-bottom: 15px;
              color: #fff;
            }
            
            .success-content p {
              margin-bottom: 20px;
              color: #a6a6a6;
            }
            
            .close-success {
              padding: 10px 30px;
              background-color: #e3d03a;
              color: #1a1a1a;
              border: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            
            .close-success:hover {
              background-color: #fff;
            }
          `

        document.head.appendChild(successStyle)

        // Close success message
        const closeSuccessBtn = document.querySelector(".close-success")
        closeSuccessBtn.addEventListener("click", () => {
          document.body.removeChild(successMessage)
          document.head.removeChild(successStyle)
        })
      }, 1500)
    })
  })
})
