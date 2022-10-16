export default function displayTooltip(event) {
  const element = event.target;
  const { screenX, screenY } = event;
  const data = element.getAttribute("data-tooltip");
  console.log(`displaying tooltip at (${screenX}, ${screenY})`);
  console.log(element);
}