function createNavigationBox() {
    const container = document.createElement("div");
    container.classList.add("container");
  
    // Create the inner container element
    const innerContainer = document.createElement("div");
    innerContainer.classList.add("inner-container");
  
    // Create the invisible box element
    const invisibleBox = document.createElement("div");
    invisibleBox.classList.add("invisible-box");
    const toggleBtn = document.createElement('button');
  
    toggleBtn.id = 'myToggleBtn';
  
    const img = document.createElement('img');
    img.src = '/favicon/android-icon-36x36.png';
    img.alt = 'Toggle Button';
    document.body.appendChild(toggleBtn);
    toggleBtn.appendChild(img);
    if (toggleBtn) {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    }
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
      width: 200px;
  }
  
  .invisible-box {
      display: flex;
      flex-direction: column;
      height: 150px;
      margin-left: 15px;
      width: 170px
  }
  
  #myToggleBtn {
      position: absolute; 
      bottom: 10%; 
      right: 0px; /
      transform: translateX(-10%); 
      opacity: 80% !important;
      border: none; 
      background-color: transparent; 
      cursor: pointer; 
  }
  #myToggleBtn img {
      width: 100%; 
      height: 100%;
      opacity: 80% !important;
  }
  
  .hidden {
      display: none;
  }
      /* ... other styles omitted for brevity ... */
    `;
    document.head.appendChild(styleElement);
  
    // You can return the container element if needed for further manipulation
    return container;
  }
