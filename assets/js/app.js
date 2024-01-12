"use strict";

// Import the TextCarousel class from the 'utils.js' file
import { TextCarousel } from './utils.js';

// Initialize an instance of the TextCarousel class with the specified element reference
const textCarousel = new TextCarousel("#feature-text");

// Function to track the number of clicks and redirect to a YouTube link after 10 clicks
const trackAndRedirect = (() => {
  let clicks = 0;

  return () => {
    // Increment the click count
    clicks++;

    // Check if the click count has reached 10
    if (clicks === 10) {
      // Redirect to the specified YouTube link
      clicks = 0;
      window.location.href = "https://www.youtube.com/watch?v=QaMySFc-Rec";
    } else {
      // Log the current click count if less than 10
      console.log(clicks);
    }
  };
})();

// Add a click event listener to the entire body, triggering the trackAndRedirect function on each click
document.body.addEventListener("click", trackAndRedirect);
