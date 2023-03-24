const BTN_TYPE_SAVE = "SAVE";
const BTN_TYPE_PROMPT = "PROMPT";
const STORAGE_KEY = "Prompts";

function saveInputText() {
  const inputElements = document.querySelectorAll(
    'input[type="text"], textarea'
  );

  const main = document.querySelectorAll("main");
  const thirdChild = main[0].children[1];
  const button = document.createElement("button");

  for (let input of inputElements) {
    let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const newItem = { value: input.value };
    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    // Set the button text and any other attributes
    button.textContent = input.value;
    button.id = "prompt-button";
    // Attach a click event listener to the button
  }

  button.addEventListener("click", function (event) {
    // Your event handling code goes here
    for (let input of inputElements) {
      input.value = button.textContent;
      input.innerHTML = button.textContent;
    }
  });

  setButtonStyle(button, BTN_TYPE_PROMPT);
  thirdChild.appendChild(button);
}

function setButtonStyle(button, type) {
  button.style.backgroundColor = "gray";
  button.style.margin = "10px 10px";
  button.style.color = "white";
  button.style.fontSize = "16px";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.borderRadius = "5px";
  button.style.padding = "5px 10px";

  if (type === BTN_TYPE_SAVE) {
    button.style.backgroundColor = "#629E38";
  }
}

function loadPrompts() {
  let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const main = document.querySelectorAll("main");
  const thirdChild = main[0].children[1];

  const inputElements = document.querySelectorAll(
    'input[type="text"], textarea'
  );

  for (let i = 0; i < items.length; i++) {
    const button = document.createElement("button");

    // Set the button text and any other attributes
    button.textContent = items[i].value;
    button.id = "prompt-button";

    // Attach a click event listener to the button
    button.addEventListener("click", function (event) {
      // Your event handling code goes here
      for (let input of inputElements) {
        input.value = items[i].value;
        input.innerHTML = items[i].value;
      }
    });

    setButtonStyle(button, BTN_TYPE_PROMPT);
    thirdChild.appendChild(button);
  }
}

function addButtonBesideForm() {
  // Find the form element
  const main = document.querySelectorAll("main");
  const thirdChild = main[0].children[1];

  if (main) {
    // Create a new button element
    const button = document.createElement("button");
    button.textContent = "Save Prompt";
    button.id = "prompt-save-button";

    button.addEventListener("click", function (event) {
      saveInputText();
    });

    // Insert the button after the form element
    setButtonStyle(button, BTN_TYPE_SAVE);
    thirdChild.appendChild(button);
  } else {
    console.error("Form element not found.");
  }
}

// Add a message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addButtonBesideForm") {
    addButtonBesideForm();
    loadPrompts();
  }
});

document.getElementById("prompt-save-button").addEventListener("click", () => {
  saveInputText();
});
