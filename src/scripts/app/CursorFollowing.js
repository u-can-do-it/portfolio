class FollowCursor {
  constructor(elements, window) {
    this.elements = elements;
    this.window = window;
    this.delay = 20;
    this.delayClock = 0;
    this.initialElementsPosition = [...this.elements].map(el => {
      const { top, left } = el.getBoundingClientRect();
      return [left, top];
    });

    this.window.addEventListener("mousemove", event => {
      if (this.delayClock < this.delay) {
        this.delayClock++;
        return;
      }
      this.delayClock = 0;
      this.elements.forEach((el, index) => {
        this.move(el, this.initialElementsPosition[index], event);
      });
    });
  }

  move(element, initialPosition, event) {
    const [top, left] = initialPosition;

    const transitionX = (event.clientX - left) / 10;
    const transitionY = (event.clientY - top) / 10;

    element.setAttribute(
      "style",
      `transform: translate(${transitionX}px, ${transitionY}px);`
    );
  }
}
export default FollowCursor;
