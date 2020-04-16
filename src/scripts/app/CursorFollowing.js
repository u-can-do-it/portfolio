import { throttle } from "./utils";

class FollowCursor {
  constructor(elements, window) {
    this.elements = elements;
    this.window = window;

    this.setMoveEvent();
  }

  setMoveEvent() {
    this.window.addEventListener("mousemove", (event) => {
      throttle(
        this.elements.forEach((el) => {
          this.move(el, event);
        }),
        50
      );
    });
  }

  move(element, event) {
    const offsetY = this.window.clientHeight / 2;
    const offsetX = this.window.clientWidth / 2;

    const transitionX = Math.floor((event.clientX - offsetX) / 5);
    const transitionY = Math.floor((event.clientY - offsetY) / 5);

    element.style.transform = `translate(${transitionX}px, ${transitionY}px)`;
  }
}
export default FollowCursor;
