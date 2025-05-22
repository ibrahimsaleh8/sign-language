document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !navbar.classList.contains("scroll-down")
    ) {
      // Scroll Down
      navbar.classList.remove("scroll-up");
      navbar.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      navbar.classList.contains("scroll-down")
    ) {
      // Scroll Up
      navbar.classList.remove("scroll-down");
      navbar.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;
  const smallNavLinks = document.getElementById("small-nav-links");

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    smallNavLinks.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      body.style.overflow = "";
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
      }
    });
  });

  // Existing converter functionality
  const textInput = document.getElementById("textInput");
  const convertBtn = document.querySelector(".animated-button");
  const signLanguageDisplay = document.getElementById("signLanguageDisplay");

  // Arabic to Sign Language mapping
  const signLanguageMap = {
    ا: "👋",
    ب: "✋",
    ت: "🤲",
    ث: "👌",
    ج: "✌️",
    ح: "🤟",
    خ: "🤘",
    د: "🤙",
    ذ: "👈",
    ر: "👉",
    ز: "👆",
    س: "👇",
    ش: "👈",
    ص: "👉",
    ض: "👌",
    ط: "✋",
    ظ: "🤲",
    ع: "👋",
    غ: "✌️",
    ف: "🤟",
    ق: "🤘",
    ك: "🤙",
    ل: "👈",
    م: "👉",
    ن: "👆",
    ه: "👇",
    و: "👈",
    ي: "👉",
    ة: "👌",
    ء: "✋",
    " ": "  ",
  };

  function convertToSignLanguage(text) {
    return text.split("").map((char) => {
      return signLanguageMap[char] || char;
    });
  }

  function displaySignLanguage(signs) {
    signLanguageDisplay.innerHTML = "";
    signs.forEach((sign) => {
      if (sign !== " ") {
        const signElement = document.createElement("div");
        signElement.className = "sign-character";
        signElement.textContent = sign;
        signLanguageDisplay.appendChild(signElement);
      } else {
        const spaceElement = document.createElement("div");
        spaceElement.style.width = "20px";
        signLanguageDisplay.appendChild(spaceElement);
      }
    });
  }

  function animateSigns() {
    const signs = document.querySelectorAll(".sign-character");
    signs.forEach((sign, index) => {
      setTimeout(() => {
        sign.style.transform = "scale(1.2)";
        setTimeout(() => {
          sign.style.transform = "scale(1)";
        }, 200);
      }, index * 300);
    });
  }

  convertBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    if (text) {
      const signs = convertToSignLanguage(text);
      displaySignLanguage(signs);
      animateSigns();
    }
  });

  // Allow conversion on Enter key
  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      convertBtn.click();
    }
  });

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector(".submit-button");
      const originalButtonContent = submitButton.innerHTML;

      // Add loading state
      submitButton.innerHTML = `
                <div class="loading-spinner"></div>
                <span>جاري الإرسال...</span>
            `;
      submitButton.disabled = true;

      // Get form data
      const formData = {
        name: contactForm.querySelector("#name").value,
        email: contactForm.querySelector("#email").value,
        subject: contactForm.querySelector("#subject").value,
        message: contactForm.querySelector("#message").value,
      };

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message
        showNotification(
          "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً",
          "success"
        );

        // Reset form
        contactForm.reset();
      } catch (error) {
        // Show error message
        showNotification(
          "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى",
          "error"
        );
      } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonContent;
        submitButton.disabled = false;
      }
    });
  }

  // Notification System
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;

    const icon = getNotificationIcon(type);

    notification.innerHTML = `
            <div class="notification-content">
                ${icon}
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

    document.body.appendChild(notification);

    // Add show class after a small delay for animation
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);

    // Close button functionality
    const closeButton = notification.querySelector(".notification-close");
    closeButton.addEventListener("click", () => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
  }

  function getNotificationIcon(type) {
    switch (type) {
      case "success":
        return '<i class="fas fa-check-circle"></i>';
      case "error":
        return '<i class="fas fa-exclamation-circle"></i>';
      case "warning":
        return '<i class="fas fa-exclamation-triangle"></i>';
      default:
        return '<i class="fas fa-info-circle"></i>';
    }
  }

  // Add notification styles
  const style = document.createElement("style");
  style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            background: white;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            transform: translateX(-120%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .notification i {
            font-size: 1.2rem;
        }

        .notification.success i {
            color: #4caf50;
        }

        .notification.error i {
            color: #f44336;
        }

        .notification.warning i {
            color: #ff9800;
        }

        .notification.info i {
            color: #2196f3;
        }

        .notification-close {
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s ease;
        }

        .notification-close:hover {
            color: #333;
        }

        .loading-spinner {
            width: 20px;
            height: 20px;
            border: 3px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: button-loading-spinner 1s linear infinite;
        }

        @keyframes button-loading-spinner {
            from {
                transform: rotate(0turn);
            }
            to {
                transform: rotate(1turn);
            }
        }
    `;
  document.head.appendChild(style);

  // Handle active state for home link
  const homeLink = document.getElementById("homeLink");

  // Set home link as active by default
  homeLink.classList.add("active");

  // Handle scroll events to update active state
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    // If we're at the top of the page or in the hero section
    if (scrollPosition < window.innerHeight * 0.8) {
      homeLink.classList.add("active");
    } else {
      homeLink.classList.remove("active");
    }
  });

  // Image Scan Functionality
  const scanArea = document.getElementById("scanArea");
  const imageFile = document.getElementById("imageFile");
  const imagePreview = document.getElementById("imagePreview");
  const scannedText = document.getElementById("scannedText");
  const scanStatus = document.querySelector(".scan-status");
  const progress = document.querySelector(".scan-status .progress");
  const statusText = document.querySelector(".scan-status .status-text");
  const scanConvertBtn = document.querySelector(".convert-btn");
  const copyBtn = document.querySelector(".copy-btn");

  // Handle drag and drop
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    scanArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    scanArea.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    scanArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    scanArea.classList.add("dragover");
  }

  function unhighlight(e) {
    scanArea.classList.remove("dragover");
  }

  scanArea.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }

  // Handle file input change
  imageFile.addEventListener("change", function (e) {
    handleFiles(this.files);
  });

  function handleFiles(files) {
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        displayImage(file);
        processImage(file);
      } else {
        alert("الرجاء اختيار ملف صورة صالح");
      }
    }
  }

  function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      document.querySelector(".preview-placeholder").style.display = "none";
    };
    reader.readAsDataURL(file);
  }

  function processImage(file) {
    showScanStatus();
    // Simulate image processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      updateProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        // Simulate text extraction
        setTimeout(() => {
          hideScanStatus();
          // This is where you would integrate with an actual OCR service
          scannedText.value = "نموذج النص المستخرج من الصورة";
        }, 500);
      }
    }, 200);
  }

  function showScanStatus() {
    scanStatus.style.display = "block";
    statusText.textContent = "جاري معالجة الصورة...";
  }

  function hideScanStatus() {
    scanStatus.style.display = "none";
    progress.style.width = "0%";
  }

  function updateProgress(value) {
    progress.style.width = value + "%";
  }

  // Convert button click handler
  scanConvertBtn.addEventListener("click", function () {
    if (scannedText.value) {
      // Here you would integrate with your sign language conversion logic
      alert("جاري تحويل النص إلى لغة الإشارة...");
    } else {
      alert("الرجاء تحميل صورة أولاً");
    }
  });

  // Copy button click handler
  copyBtn.addEventListener("click", function () {
    if (scannedText.value) {
      scannedText.select();
      document.execCommand("copy");
      alert("تم نسخ النص بنجاح");
    }
  });
});
