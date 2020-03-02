import FollowCursor from "./app/CursorFollowing";

const text = document.querySelectorAll(".hero__text");
const header = document.querySelector("#home");

const a = new FollowCursor(text, header);
