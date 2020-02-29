class FollowCursor {
  constructor(elements, window, delay = 30) {
    this.elements = elements;
    this.window = window;
    this.delay = delay;
    this.delayClock = 0;
    this.setMoveEvent();
  }

  setMoveEvent() {
    this.window.addEventListener("mousemove", event => {
      if (this.delayClock < this.delay) {
        this.delayClock++;
        return;
      }
      this.delayClock = 0;
      this.elements.forEach(el => {
        this.move(el, event);
      });
    });
  }

  move(element, event) {
    const transitionX = Math.floor(event.clientX / 10);
    const transitionY = Math.floor(event.clientY / 10);

    element.setAttribute(
      "style",
      `transform: translate(${transitionX}px, ${transitionY}px);`
    );
  }
}
export default FollowCursor;
