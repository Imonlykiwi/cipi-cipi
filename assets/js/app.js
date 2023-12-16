const carouselText = [
  { text: "Cipi Cipi", color: "white" },
  { text: "Chapa Chapa", color: "orange" },
  { text: "Dubi Dubi", color: "white" },
  { text: "Daba Daba", color: "orange" },
  { text: "Magico Mi", color: "white" },
  { text: "Dubi Dubi", color: "orange" },
  { text: "BOOM BOOM!", color: "yellow" },
  { text: "BOOM BOOM!", color: "yellow" },
];

document.addEventListener("DOMContentLoaded", async function () {
  carousel(carouselText, "#feature-text");
});

async function typeSentence(sentence, eleRef, delay = 30) {
  const letters = sentence.split("");
  let i = 0;
  while (i < letters.length) {
    await waitForMs(delay);
    document.querySelector(eleRef).innerHTML += letters[i];
    i++;
  }
  return;
}

async function deleteSentence(eleRef) {
  const sentence = document.querySelector(eleRef).innerHTML;
  const letters = sentence.split("");
  while (letters.length > 0) {
    await waitForMs(30);
    letters.pop();
    document.querySelector(eleRef).innerHTML = letters.join("");
  }
}

async function carousel(carouselList, eleRef) {
  var i = 0;
  while (true) {
    updateFontColor(eleRef, carouselList[i].color);
    await typeSentence(carouselList[i].text, eleRef);
    await waitForMs(350);
    await deleteSentence(eleRef);
    await waitForMs(200);
    i++;
    if (i >= carouselList.length) {
      i = 0;
    }
  }
}

function updateFontColor(eleRef, color) {
  document.querySelector(eleRef).style.color = color;
}

function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

    let clicks = 0;

    document.body.addEventListener('click', () => {
        clicks++;
        if (clicks === 10) window.location.href = 'https://www.youtube.com/watch?v=QaMySFc-Rec';
    });
