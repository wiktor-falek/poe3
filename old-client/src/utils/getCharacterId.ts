export default function getCharacterId() {
  // Why is the data grabbed from the route? - you may ask.
  // And the answer is because thats how I did it in the very early stage of 
  // development many years ago, when I was completely clueless.
  // Also I didn't feel like touching the legacy code, neither did I want to rewrite the whole thing.
  // This is why you see /game/${id} in the url after you select a character.
  const location = window.location.href;
  const elements = location.split("/");
  const idx = elements.indexOf("game") + 1;
  return elements[idx];
}