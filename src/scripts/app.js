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
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submitBtn = document.querySelector("#contact-submit");

// submit form only on button click
submitBtn.addEventListener("click", e => {
  e.preventDefault();
  const validation = {
    name: new InputValidation(name.value).minLength(4),
    email: new InputValidation(email.value).emali().minLength(8),
    message: new InputValidation(message.value).minLength(10)
  };
  console.log(validation);
});
