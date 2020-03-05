import FollowCursor from "./app/CursorFollowing";
import InputValidation from "./app/InputValidation";

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

// submit form only on button click
submitBtn.addEventListener("click", e => {
  e.preventDefault();
  const form = [
    {
      input: name,
      validation: new InputValidation(name.value).minLength(4),
      feedback: nameFeedback
    },
    {
      input: email,
      validation: new InputValidation(email.value).emali().minLength(8),
      feedback: emailFeedback
    },
    {
      input: message,
      validation: new InputValidation(message.value).minLength(10),
      feedback: messageFeedback
    }
  ];

  form.forEach(({ input, validation, feedback }) => {
    if (!validation.isValid) {
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
});
