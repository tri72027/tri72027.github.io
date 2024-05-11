function createNavigationBox() {
  // Create the container element
  const container = document.createElement('div');
  container.classList.add('container');

  // Create the inner container element
  const innerContainer = document.createElement('div');
  innerContainer.classList.add('inner-container');

  // Create the invisible box element
  const invisibleBox = document.createElement('div');
  invisibleBox.classList.add('invisible-box');

  // Create the token label element
  const tokenLabel = document.createElement('p');
  tokenLabel.classList.add('token-label', 'unselectable');
  tokenLabel.textContent = 'Move';

  // Create the input element
  const txtLand = document.createElement('input');
  txtLand.id = 'txtLand';
  txtLand.type = 'text';
  txtLand.spellcheck = false;
  txtLand.placeholder = 'Enter Land';

  // Create the buttons
  const buttons = [
    'Terravilla',
    'HQ',
    'Cave HQ',
    'Carnival',
    'Home Mission',
    'Post Office',
    'Space Walk',
    'BarneysFarm',
    'Move To Land'
  ].map(buttonText => {
    const button = document.createElement('button');
    button.id = `btn${buttonText.replace(/\s+/g, '')}`; // Generate unique IDs
    button.classList.add('unselectable', 'btn');
    button.textContent = buttonText;
    return button;
  });

  // Add elements to the invisible box
  invisibleBox.appendChild(tokenLabel);
  invisibleBox.appendChild(txtLand);
  buttons.forEach(button => invisibleBox.appendChild(button));

  // Add invisible box to inner container
  innerContainer.appendChild(invisibleBox);

  // Add inner container to container
  container.appendChild(innerContainer);

  // Add styles to the document (alternative approach)
  const styleElement = document.createElement('style');
  styleElement.textContent = `
   .container {
    color: white;
    height: 280px;
    width: 320px
    top: 20%;
    left: 80%;
    position: absolute;
    z-index: 999;
    opacity: 85%;

}

.inner-container {
    background-color: #36393e;
    border-radius: 4px;
    display: flex;
    height: 270px;
    width: 300px
}

.invisible-box {
    display: flex;
    flex-direction: column;
    height: 150px;
    margin-left: 15px;
    width: 270px
}

.token-label {
    color: #b9bbbd;
    font-family: 'Secular One', sans-serif;
    font-size: 15px;
    margin: 10px;
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
// document.body.appendChild(navigationBox); // Uncomment to append to body
