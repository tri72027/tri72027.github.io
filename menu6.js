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

  // Create the token label element
  const tokenLabel = document.createElement("p");
  tokenLabel.classList.add("mx-10", "unselectable");
  tokenLabel.textContent = "Move";

  // Create the input element
  const txtLand = document.createElement("input");
  txtLand.id = "txtLand";
  txtLand.type = "text";
  txtLand.spellcheck = false;
  tokenLabel.classList.add("label");
  txtLand.placeholder = "Enter Land";

  // Create the buttons
  const buttons = [
    "Move To Land",
    "Terravilla",
    "HQ",
    "Cave HQ",
    "Carnival",
    "Home Mission",
    "Post Office",
    "Space Walk",
    "BarneysFarm",
  ].map((buttonText) => {
    const button = document.createElement("button");
    button.id = `btn${buttonText.replace(/\s+/g, "")}`; // Generate unique IDs
    button.classList.add("unselectable", "btn");
    if (button == "Move To Land") {
      button.classList.add("unselectable", "btn");
    }
    button.textContent = buttonText;
    return button;
  });

  // Add elements to the invisible box
  invisibleBox.appendChild(tokenLabel);
  invisibleBox.appendChild(txtLand);
  buttons.forEach((button) => invisibleBox.appendChild(button));

  // Add invisible box to inner container
  innerContainer.appendChild(invisibleBox);

  // Add inner container to containerlabel
  container.appendChild(innerContainer);
 
  // Add styles to the document (alternative approach)
  const styleElement = document.createElement("style");
  styleElement.textContent = `
   .container {
    color: white;
    height: 320px;
    width: 200px;
    bottom: 0%;
    left: 0%;
    position: absolute;
    z-index: 999;
    opacity: 85%;

}

.inner-container {
    background-color: #36393e;
    border-radius: 25px;
    display: flex;
    height: 320px;
    width: 390px;
}

.invisible-box {
    display: flex;
    flex-direction: column;
    height: 150px;
    margin-left: 15px;
    width: 170px
}

.label {
    color: #b9bbbd;
    font-family: 'Secular One', sans-serif;
    font-size: 15px;
}

.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

.btn {
    background-color: #8eeed1;
    border: none;
    border-radius: 4px;
    color: #a768a7;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    height: 35px;
    margin-top: 5px;
    transition: all .1s ease-in
}
.mb-15{
    margin-bottom: 15 !important; 
}
.mx-10{
    margin-top: 10 !important; 
    margin-bottom: 10 !important; 
}

    /* ... other styles omitted for brevity ... */
  `;
  document.head.appendChild(styleElement);

  // Append the container element to the body (optional)
  // document.body.appendChild(container);

  // You can return the container element if needed for further manipulation
  return container;
}
// Example usage (optional):
const navigationBox = createNavigationBox();
createNavigationBox();
// document.body.appendChild(navigationBox); // Uncomment to append to body
