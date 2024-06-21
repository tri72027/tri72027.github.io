function menu() {
  const options = [
    { label: "Attack-Speed", checked: false },
    { label: "Speed", checked: false },
    { label: "Dame", checked: false },
    { label: "Crit", checked: false },
  ];
  // Create main container div
  const container = document.createElement("div");
  container.classList.add("containerBW");
  document.body.appendChild(container);

  var attackSpeed = localStorage.getItem("Attack-Speed") || false;
  var speed = localStorage.getItem("Speed") || false;
  var dame = localStorage.getItem("Dame") || false;
  var crit = localStorage.getItem("Crit") || false;
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

  container.appendChild(checkboxContainer);

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
            height: 200px;
            width: 200px;
            background-color: rgb(207, 248, 255);
             bottom: 3.5%;
            left: 0%;
            position: fixed;
            z-index: 999;
            opacity: 85%;
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
}
