import FollowCursor from "./scripts/CursorFollowing";
import InputValidation from "./scripts/InputValidation";
import VisibleDetect from "./scripts/VisibleDetect";

import { throttle } from "./utils/Throttle";

// manage active class in the navigaion
(function () {
  const navButton = document.querySelector("#page-navigation > .hamburger");
  const navLinks = document.querySelectorAll(".nav__link");
  const nav = document.querySelector("#page-navigation");

  navButton.addEventListener("click", (event) => {
    event.stopPropagation();
    navButton.classList.toggle("active");
    nav.classList.toggle("active");
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      navButton.classList.remove("active");
    })
  );
})();

// hide nav
(function () {
  const nav = document.querySelector(".nav");
  nav.style.opacity = "0";
  window.addEventListener(
    "scroll",
    throttle(() => {
      if (window.scrollY > window.innerHeight) {
        nav.style.opacity = "1";
      } else {
        nav.style.opacity = "0";
      }
    }, 50)
  );
})();
// manage active classes on scroll
const tracked = new VisibleDetect(".card", "invisible", "active");
const tracked2 = new VisibleDetect(".section-underline", "hidden", "active");

// hide preloader and unlock scroll
window.addEventListener("load", () => {
  document.querySelector(".preloader-wrapper").remove();
  document.querySelector("body").classList.remove("lock-scroll");
});

// set current year
document.querySelector(".year").innerHTML = new Date().getFullYear();

// follow cursor
const text = document.querySelectorAll(".hero__text");
const header = document.querySelector("#home");
const movingText = new FollowCursor(text, header);

// contact form validation and submit

const name = document.querySelector("#name");
const nameFeedback = document.querySelector("#name-feedback");
const email = document.querySelector("#email");
const emailFeedback = document.querySelector("#email-feedback");
const message = document.querySelector("#message");
const messageFeedback = document.querySelector("#message-feedback");
const submitBtn = document.querySelector("#contact-submit");
const form = document.querySelector("#contact-form");

// submit form only on button click
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let isFormValid = true;
  const formInputs = [
    {
      input: name,
      validation: new InputValidation(name.value).minLength(4),
      feedback: nameFeedback,
    },
    {
      input: email,
      validation: new InputValidation(email.value).emali().minLength(8),
      feedback: emailFeedback,
    },
    {
      input: message,
      validation: new InputValidation(message.value).minLength(10),
      feedback: messageFeedback,
    },
  ];

  // print feedback if form is invalid
  formInputs.forEach(({ validation, feedback }) => {
    if (!validation.isValid) {
      isFormValid = false;
      const message = validation.errMessage.reduce(
        (acc, err) => `${acc} ${err}`,
        ""
      );
      feedback.innerHTML = message;
      feedback.classList.add("active");
    } else {
      feedback.innerHTML = "";
      feedback.classList.remove("active");
    }
  });

  if (!isFormValid) return;

  submitBtn.innerHTML = "Sending...";
  submitBtn.disabled = true;

  const data = {
    service_id: "default_service",
    template_id: "template_uiZeerd0",
    user_id: "user_zgrAmoTgIVfso7NZc6uZN",
    template_params: {
      reply_to: email.value,
      from_name: name.value,
      message_html: message.value,
    },
  };

  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Try again later");
      submitBtn.innerHTML = "Message sent";
    })
    .catch((error) => {
      submitBtn.innerHTML = error.message;
    })
    .finally(() => delayedClearForm());

  function clearForm() {
    form.reset();
    submitBtn.innerHTML = "Submit";
    submitBtn.disabled = false;
  }

  function delayedClearForm(delay = 1800) {
    setTimeout(() => {
      clearForm();
    }, delay);
  }
});

console.log("test");
