"use strict";

export class TextCarousel {
  constructor(elementRef) {
    // Create an instance of TextCarousel
    this.carouselText = [
      { text: "Cipi Cipi", color: "white", time: 300, timeout: false },
      { text: "Chapa Chapa", color: "orange", time: 300, timeout: false },
      { text: "Dubi Dubi", color: "white", time: 300, timeout: false },
      { text: "Daba Daba", color: "orange", time: 300, timeout: false },
      { text: "Magico Mi", color: "white", time: 300, timeout: false },
      { text: "Dubi Dubi", color: "orange", time: 300, timeout: false },
      { text: "BOOM BOOM!", color: "yellow", time: 600, timeout: true },
    ];
    this.elementRef = elementRef;
    this.init(); //initialize animation
  }

  async typeSentence(sentence, delay = 30) {
    const letters = sentence.split("");
    let i = 0;

    // Create a span element with the class 'text-cont'
    const spanElement = document.createElement("span");
    spanElement.className = "text-cont";

    // Append the span element to the specified elementRef
    document.querySelector(this.elementRef).appendChild(spanElement);

    while (i < letters.length) {
      await this.waitForMs(delay);
      spanElement.textContent += letters[i];
      i++;
    }
  }

  async deleteSentence() {
    const sentence = document.querySelector(this.elementRef).querySelector('span').innerHTML;
    const letters = sentence.split("");
    while (letters.length > 0) {
      await this.waitForMs(30);
      letters.pop();
      document.querySelector(this.elementRef).innerHTML = letters.join("");
    }
  }

  async startCarousel() {
    console.log("startCarousel called");
    let i = 0;
    while (true) {
      this.updateFontColor(this.carouselText[i].color);
      await this.typeSentence(this.carouselText[i].text);

      if (this.carouselText[i].timeout) {
        // Display text2 twice with a 50ms delay in between
        for (let j = 1; j < 2; j++) {
          await this.waitForMs(50);
          await this.typeSentence(this.carouselText[i].text);
        }
      }

      await this.waitForMs(this.carouselText[i].time);
      await this.deleteSentence();
      await this.waitForMs(this.carouselText[i].time - 50);
      i = (i + 1) % this.carouselText.length; // Use modulo to loop back to the beginning
    }
  }

  updateFontColor(color) {
    document.querySelector(this.elementRef).style.color = color;
  }

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

  init() {
    // Trigger the carousel when the DOM content is loaded
    document.addEventListener("DOMContentLoaded", () => {
      this.startCarousel();
    });
  }
}
