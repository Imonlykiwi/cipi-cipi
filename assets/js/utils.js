"use strict";

// Class definition for TextCarousel
export class TextCarousel {
  // Constructor takes an element reference as a parameter
  constructor(elementRef) {
    // Array of text objects with properties: text, color, time, timeout
    this.carouselText = [
      { text: "Cipi Cipi", color: "white", time: 300, timeout: false },
      { text: "Chapa Chapa", color: "orange", time: 300, timeout: false },
      { text: "Dubi Dubi", color: "white", time: 300, timeout: false },
      { text: "Daba Daba", color: "orange", time: 300, timeout: false },
      { text: "Magico Mi", color: "white", time: 300, timeout: false },
      { text: "Dubi Dubi", color: "orange", time: 300, timeout: false },
      { text: "BOOM BOOM!", color: "yellow", time: 750, timeout: true },
    ];
    
    // Reference to the HTML element where the text will be displayed
    this.elementRef = elementRef;
    
    // Initialize the text carousel animation
    this.init();
  }

  // Type a sentence with optional delay between each letter
  async typeSentence(sentence, delay = 30) {
    const letters = sentence.split("");
    let i = 0;

    // Create a span element with the class 'text-cont'
    const spanElement = document.createElement("span");
    spanElement.className = "text-cont";

    // Append the span element to the specified elementRef
    document.querySelector(this.elementRef).appendChild(spanElement);

    // Type each letter with a delay
    while (i < letters.length) {
      await this.waitForMs(delay);
      spanElement.textContent += letters[i];
      i++;
    }
  }

  // Delete the currently displayed sentence
  async deleteSentence() {
    // Get the current sentence from the HTML element
    const sentence = document.querySelector(this.elementRef).querySelector('span').innerHTML;
    const letters = sentence.split("");

    // Delete each letter with a delay
    while (letters.length > 0) {
      await this.waitForMs(30);
      letters.pop();
      document.querySelector(this.elementRef).innerHTML = letters.join("");
    }
  }

  // Start the text carousel animation
  async startCarousel() {
    let i = 0;

    // Continuously loop through the carouselText array
    while (true) {
      // Update the font color based on the current text object
      this.updateFontColor(this.carouselText[i].color);

      // Type the current sentence
      await this.typeSentence(this.carouselText[i].text);

      // If timeout is true, display the text twice with a delay
      if (this.carouselText[i].timeout) {
        for (let j = 1; j < 2; j++) {
          await this.waitForMs(100);
          await this.typeSentence(this.carouselText[i].text);
        }
      }

      // Wait for a specified time, then delete the sentence
      await this.waitForMs(this.carouselText[i].time);
      await this.deleteSentence();

      // Wait for a short time before moving to the next sentence
      await this.waitForMs(this.carouselText[i].time - 50);

      // Use modulo to loop back to the beginning of the array
      i = (i + 1) % this.carouselText.length;
    }
  }

  // Update the font color of the text element
  updateFontColor(color) {
    document.querySelector(this.elementRef).style.color = color;
  }

  // Helper function to wait for a specified number of milliseconds
  async waitForMs(ms) {
    return new Promise((resolve) => {
      const start = performance.now();
      const delay = () => {
        if (performance.now() - start >= ms) {
          resolve();
        } else {
          requestAnimationFrame(delay);
        }
      };
      delay();
    });
  }

  // Initialize the text carousel when the DOM content is loaded
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.startCarousel();
    });
  }
}
