const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const yearEl = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("show");
  });
}

if (contactForm) {
  const setError = (input, errorEl, message) => {
    input.classList.add("invalid");
    errorEl.textContent = message;
  };

  const clearError = (input, errorEl) => {
    input.classList.remove("invalid");
    errorEl.textContent = "";
  };

  const validateName = () => {
    const value = nameInput.value.trim();
    if (!value) {
      setError(nameInput, nameError, "Please enter your name.");
      return false;
    }
    if (value.length < 2) {
      setError(nameInput, nameError, "Name should be at least 2 characters.");
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setError(emailInput, emailError, "Please enter your email.");
      return false;
    }
    if (!emailPattern.test(value)) {
      setError(emailInput, emailError, "Please enter a valid email address.");
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  };

  const validateMessage = () => {
    const value = messageInput.value.trim();
    if (!value) {
      setError(messageInput, messageError, "Please enter your message.");
      return false;
    }
    if (value.length < 10) {
      setError(messageInput, messageError, "Message should be at least 10 characters.");
      return false;
    }
    clearError(messageInput, messageError);
    return true;
  };

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // EDIT: Add backend integration later if you want real submissions.
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      formStatus.style.color = "#ff9c9c";
      formStatus.textContent = "Please correct the highlighted fields.";
      return;
    }

    formStatus.style.color = "#7ee0a1";
    formStatus.textContent = "Message validated successfully. Ready to send.";
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}
