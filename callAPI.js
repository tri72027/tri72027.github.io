function createNavigationBox() {
  // Create the container element
  const container = document.createElement("div");
  container.classList.add("container");

  // Create the inner container element
  const innerContainer = document.createElement("div");
  innerContainer.classList.add("inner-container");

  // Create the invisible box element
  const invisibleBox = document.createElement("div");
  invisibleBox.classList.add("invisible-box");


const buttonSelectors = [
    "#btnMoveToLand",
    "#btnTerravilla",
  ];

  function createOrUpdateButton(selector) {
    const existingButton = document.querySelector(selector);
  
    // Declare the button variable (even before checking for element)
    let buttonElement = null;
  
    if (existingButton) {
      // Element exists, remove it
      existingButton.parentNode.removeChild(existingButton);
    }
    // Create a new button element (replace with your actual button creation logic)
    buttonElement = document.createElement("button");
    buttonElement.id = selector; // Generate unique IDs
    buttonElement.classList.add("unselectable", "btn");
    const regex = /#btn(.+)/;
    const match = regex.exec(selector);

    if (selector == "#btnMoveToLand") {
        buttonElement.classList.add("unselectable", "mb-15");
    }
    buttonElement.textContent = match[1];
    // Append the new button to the document (replace with your desired location)
    return buttonElement; // Return the created button element
  }
  const btnTerravilla = createOrUpdateButton(buttonSelectors[1]);

  invisibleBox.appendChild(btnTerravilla);

  // Add invisible box to inner container
  innerContainer.appendChild(invisibleBox);

  // Add inner container to containerlabel
  container.appendChild(innerContainer);
  if (btnTerravilla) {
    btnTerravilla.addEventListener("click", () => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    });
  }

  // You can return the container element if needed for further manipulation
  return container;
}
createNavigationBox();
// document.body.appendChild(navigationBox); // Uncomment to append to body
