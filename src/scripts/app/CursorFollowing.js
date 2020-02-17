const debounce = (fn, time) => {
  let timeout;
  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

class FollowCursor {
  constructor(elements, window) {
    this.elements = elements;
    this.window = window;
    this.window.addEventListener("mousemove", event => {
      this.elements.forEach(el => this.move(el, event));
    });
  }

  move(element, event) {
    debounce(() => {
      element.setAttribute(
        "style",
        `transform: translate(${event.clientX / 10}px, ${event.clientY /
          10}px);`
      );
    }, 5);
  }
}
export default FollowCursor;
