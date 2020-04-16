import { throttle } from "./utils";

export default class VisibleDetect {
  constructor(
    trackedSelector,
    hiddenClassName = "hidden",
    visibleClassName = "active"
  ) {
    this.visibleItemsCount = 0;
    this.trackedItems = document.querySelectorAll(trackedSelector);
    this.hiddenClass = hiddenClassName;
    this.activeClass = visibleClassName;
    this.trackedItems.forEach((item) => {
      item.classList.add(this.hiddenClass);
    });

    this.scrollEvent = window.addEventListener(
      "scroll",
      this.checkVisibility.bind(this)
    );
  }

  checkVisibility(e) {
    throttle(
      this.trackedItems.forEach((item) => {
        const toScreenTop = item.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        if (toScreenTop.y - (screenHeight - toScreenTop.height * 0.4) < 0) {
          item.classList.add(this.activeClass);
          item.classList.remove(this.hiddenClass);
        }
      }),
      100
    );
  }
}
