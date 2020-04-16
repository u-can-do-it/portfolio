export function toggleClass(element, className, eventType = "click") {
  element.addEventListener(eventType, () =>
    element.classList.toggle(className)
  );
}
