function menu() {
  const options = [
    { label: "Attack-Speed", checked: false },
    { label: "Speed", checked: false },
    { label: "Dame", checked: false },
    { label: "Crit", checked: false },
    { label: "Immortal", checked: false },
    { label: "Clone-Weapons", checked: false },
  ];
  
  // Create main container div
  const container = document.createElement("div");
  container.classList.add("containerBW");
  document.body.appendChild(container);

  var attackSpeed = localStorage.getItem("Attack-Speed") || false;
  var speed = localStorage.getItem("Speed") || false;
  var dame = localStorage.getItem("Dame") || false;
  var crit = localStorage.getItem("Crit") || false;
  var immortal = localStorage.getItem("Immortal") || false;
  var cloneWeapons = localStorage.getItem("Clone-Weapons") || false;
  //Checkbox

  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("checkbox-containerBW");

  options.forEach((option, index) => {
    const row = document.createElement("div");
    row.classList.add("rowBW");

    const col = document.createElement("div");
    col.classList.add("colBW");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `checkbox-${index}`;
    switch (index) {
      case 0:
        input.checked = Boolean(attackSpeed);
        break;
      case 1:
        input.checked = Boolean(speed);
        break;
      case 2:
        input.checked = Boolean(dame);
        break;
      case 3:
        input.checked = Boolean(crit);
        break;
      case 4:
        input.checked = Boolean(immortal);
        break;
      case 5:
          input.checked = Boolean(cloneWeapons);
          break;
      default:
        break;
    }

    const toggleLabel = document.createElement("label");
    toggleLabel.htmlFor = `checkbox-${index}`;
    toggleLabel.classList.add("toggle");
    if (input.checked) {
      toggleLabel.classList.add("checked");
    }

    const spanLabel = document.createElement("span");
    spanLabel.textContent = option.label;
    spanLabel.classList.add('spanBW');
    input.addEventListener("change", function () {
      if (input.checked) {
        toggleLabel.classList.add("checked");
        localStorage.setItem(option.label, true);
      } else {
        localStorage.removeItem(option.label);
        toggleLabel.classList.remove("checked");
      }
    });


    col.appendChild(input);
    col.appendChild(toggleLabel);
    col.appendChild(spanLabel);
    row.appendChild(col);
    checkboxContainer.appendChild(row);
  });

  const weapons = [
      { value: "1", text: "1" },
      { value: "2", text: "2" },
      { value: "3", text: "3" },
      { value: "4", text: "4" },
  ];

  // Create the select element
  const select = document.createElement('select');
  select.name = "weapon";
  select.id = "weaponSelect";
  select.classList.add("selectWepon");

  // Create and append the options to the select element
  weapons.forEach(weapon => {
      const option = document.createElement('option');
      option.value = weapon.value;
      option.textContent = weapon.text;
      select.appendChild(option);
  });
  select.addEventListener("change", function () {
    localStorage.setItem("Quantity-Weapons", select.value);
    });

  checkboxContainer.appendChild(select);

  container.appendChild(checkboxContainer);


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

  // const btnTest = createOrUpdateButton("#btnTest");
  // checkboxContainer.appendChild(btnTest);


  const toggleBtn = document.createElement("button");

  toggleBtn.id = "myToggleBtn";

  const img = document.createElement("img");
  img.src = "https://app.backwoods.gg/favicon.ico";
  img.alt = "Toggle Button";
  document.body.appendChild(toggleBtn);
  toggleBtn.appendChild(img);
  // Create the buttons
  let isVisible = false;
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isVisible = !isVisible;

      if (isVisible) {
        container.classList.remove("hiddenBW");
      } else {
        container.classList.add("hiddenBW");
      }
    });
  }

  // Add styles
  const style = document.createElement("style");
  style.textContent = `
        .containerBW {
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: 3.5%;
            left: 0%;
            position: fixed;
            z-index: 9999;
            opacity: 80%;
        }
  
        .login-cardBW {
            display: flex;
            flex-direction: column;
            margin: 10px 10px;
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
            background-color: #ffffff;
            padding: 10px;
            border-radius: 10px;
            width: 100%;
  
        }
        .login-cardBW input {
            margin: 5px 0;
            background-color: #e2e2e2;
            border: none;
            outline: none;
            border-radius: 5px;
            padding: 10px;
            font-size: 10px;
            color: black;
        }
  
        .login-cardBW button {
            background-color: #4796ff;
            color: #ffffff;
            font-size: 10px;
            outline: none;
            border-radius: 5px;
            border: none;
            padding: 8px 15px;
            width: 100%;
        }
        .card-titleBW h1 {
            font-size: 20px;
            font-weight: bold;
            color: black;
        }
  
          :host {
              height: 50vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgb(207, 248, 255);
          }
  
          .checkbox-containerBW {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 20px;
              background: white;
              border-radius: 20px;
          }
  
          .rowBW {
              display: flex;
              justify-content: space-between;
              width: 100%;
          }
  
          .colBW {
              display: flex;
              align-items: center;
              justify-content: flex-start;
          }
  
          input[type="checkbox"] {
              display: none;
          }
  
          .toggle {
              display: inline-block;
              width: 30px;
              height: 18px;
              background-color: red;
              border-radius: 15px;
              position: relative;
              transition: background-color 0.3s;
              cursor: pointer;
              margin-right: 10px;
          }
  
          .toggle.checked {
              background-color: green;
          }
  
          .toggle::before {
              content: '';
              position: absolute;
              width: 13px;
              height: 13px;
              border-radius: 50%;
              background-color: white;
              top: 2px;
              left: 2px;
              transition: transform 0.3s;
          }
  
          input[type="checkbox"]:checked + .toggle::before {
              transform: translateX(13px);
          }
  
          .spanBW {
              font-size: 12px;
              color: black;
              line-height: 30px;
          }
          .hiddenBW {
              display: none;
          }
          .selectWepon{
              font-size: 12px;
              color: black;
              border: solid;
              width: 135px;
              border-radius: 10px;
              align-self: flex-start;
              height: 25px;
          }
           #myToggleBtn {
              position: fixed; 
              bottom: 3.5%; 
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
      `;
  document.head.appendChild(style);
  return container;
}
menu();
function removeLocalStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("Attack-Speed");
  localStorage.removeItem("Speed");
  localStorage.removeItem("Dame");
  localStorage.removeItem("Crit");
  localStorage.removeItem("Immortal");
  localStorage.removeItem("Clone-Weapons");
}
