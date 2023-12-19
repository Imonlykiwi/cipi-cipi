"use strict";

//import class
import { TextCarousel } from './utils.js';

//initialize class
const textCarousel = new TextCarousel("#feature-text");

// Track the number of clicks and redirect to a YouTube link after 10 clicks
const trackAndRedirect = (() => {
  let clicks = 0;

  return () => {
    clicks++;

    clicks === 10
      ? (window.location.href = "https://www.youtube.com/watch?v=QaMySFc-Rec")
      : console.log(clicks);
  };
})();

document.body.addEventListener("click", trackAndRedirect);
