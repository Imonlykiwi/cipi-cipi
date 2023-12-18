class TextCarousel {
  constructor(elementRef) {
    // Create an instance of TextCarousel
    this.carouselText = [
      { text: "Cipi Cipi", color: "white" },
      { text: "Chapa Chapa", color: "orange" },
      { text: "Dubi Dubi", color: "white" },
      { text: "Daba Daba", color: "orange" },
      { text: "Magico Mi", color: "white" },
      { text: "Dubi Dubi", color: "orange" },
      { text: "BOOM BOOM!", color: "yellow" },
      { text: "BOOM BOOM!", color: "yellow" },
    ];
    this.elementRef = elementRef;
    this.init(); //initialize animation
  }

  async typeSentence(sentence, delay = 30) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
      await this.waitForMs(delay);
      document.querySelector(this.elementRef).innerHTML += letters[i];
      i++;
    }
  }

  async deleteSentence() {
    const sentence = document.querySelector(this.elementRef).innerHTML;
    const letters = sentence.split("");
    while (letters.length > 0) {
      await this.waitForMs(30);
      letters.pop();
      document.querySelector(this.elementRef).innerHTML = letters.join("");
    }
  }

  async startCarousel() {
    let i = 0;
    while (true) {
      this.updateFontColor(this.carouselText[i].color);
      await this.typeSentence(this.carouselText[i].text);
      await this.waitForMs(350);
      await this.deleteSentence();
      await this.waitForMs(200);
      i = (i + 1) % this.carouselText.length; // Use modulo to loop back to the beginning
    }
  }

  updateFontColor(color) {
    document.querySelector(this.elementRef).style.color = color;
  }

  waitForMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  init() {
    // Trigger the carousel when the DOM content is loaded
    document.addEventListener("DOMContentLoaded", () => {
      this.startCarousel();
    });
  }
}

const textCarousel = new TextCarousel("#feature-text");

// Track the number of clicks and redirect to a YouTube link after 10 clicks
document.body.addEventListener("click", (clicks = 0) => {
  clicks++;
  if (this.clicks === 10) {
    window.location.href = "https://www.youtube.com/watch?v=QaMySFc-Rec";
  }
});

