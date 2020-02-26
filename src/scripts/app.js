import FollowCursor from "./app/CursorFollowing";

const circles = document.querySelectorAll(".circle-box ");
const header = document.querySelector("#welcome");

const a = new FollowCursor(circles, header);
