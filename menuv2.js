function createNavigationBox() {
 // Tạo container chính
const container = document.createElement("div");
container.classList.add("container", "hidden"); // Ẩn container ban đầu

// Tạo innerContainer
const innerContainer = document.createElement("div");
innerContainer.classList.add("inner-container");

// Tạo phần tử tabs
const tabs = document.createElement("div");
tabs.classList.add("tabs");

// Tạo tab 1 và tab 2
const tab1 = document.createElement("button");
tab1.classList.add("tab", "active");
tab1.dataset.tab = "tab1";
tab1.textContent = "Tab 1";

const tab2 = document.createElement("button");
tab2.classList.add("tab");
tab2.dataset.tab = "tab2";
tab2.textContent = "Tab 2";

// Thêm các tab vào phần tử tabs
tabs.appendChild(tab1);
tabs.appendChild(tab2);

// Tạo nội dung cho tab 1 (tab1Content)
const tab1Content = document.createElement("div");
tab1Content.id = "tab1";
tab1Content.classList.add("tab-content", "active");

// Tạo invisibleBox và các phần tử con cho tab 1
const invisibleBox = document.createElement("div");
invisibleBox.classList.add("invisible-box");

const tokenLabel = document.createElement("p");
tokenLabel.classList.add("mx-10", "unselectable");
tokenLabel.textContent = "Move";

const txtLand = document.createElement("input");
txtLand.id = "txtLand";
txtLand.type = "text";
txtLand.spellcheck = false;
txtLand.placeholder = "Enter Land";

// ... (tạo các nút btnMoveToLand, btnTerravilla, etc.) ...

// Thêm các phần tử vào invisibleBox
invisibleBox.appendChild(tokenLabel);
invisibleBox.appendChild(txtLand);
invisibleBox.appendChild(btnMoveToLand);
// ... (thêm các nút còn lại vào invisibleBox) ...

// Thêm invisibleBox vào tab1Content
tab1Content.appendChild(invisibleBox);

// Tạo nội dung cho tab 2 (tab2Content)
const tab2Content = document.createElement("div");
tab2Content.id = "tab2";
tab2Content.classList.add("tab-content");

// Tạo nút toggleBtn cho tab 2
const toggleBtn = document.createElement('button');
toggleBtn.id = 'myToggleBtn';
const img = document.createElement('img');
img.src = '/favicon/android-icon-36x36.png';
img.alt = 'Toggle Button';
toggleBtn.appendChild(img);

// Thêm toggleBtn vào tab2Content
tab2Content.appendChild(toggleBtn);

// Thêm các phần tử vào innerContainer
innerContainer.appendChild(tabs);
innerContainer.appendChild(tab1Content);
innerContainer.appendChild(tab2Content);

// Thêm innerContainer vào container
container.appendChild(innerContainer);

// Thêm container vào body của trang
document.body.appendChild(container);

// Xử lý sự kiện click vào tab
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    tab.classList.add('active');
    const targetTabContent = document.querySelector(`#${tab.dataset.tab}`);
    targetTabContent.classList.add('active');
  });
});
  
  // Create the buttons
//   const buttons = [
//     "Move To Land",
//     "Terravilla",
//     "HQ",
//     "Cave HQ",
//     "Carnival",
//     "Home Mission",
//     "Post Office",
//     "Space Walk",
//     "BarneysFarm",
//  ].map((buttonText) => {
//     const button = document.createElement("button");
//     button.id = `btn${buttonText.replace(/\s+/g, "")}`; // Generate unique IDs
//     button.classList.add("unselectable", "btn");
//     if (buttonText == "Move To Land") {
//       button.classList.add("unselectable", "btn");
//     }
//     button.textContent = buttonText;
//     return button;
//   });

const buttonSelectors = [
    "#btnMoveToLand",
    "#btnTerravilla",
    "#btnHQ", // Assuming this is the ID for btnCHinterior
    "#btnCaveHQ",
    "#btnCarnival",
    "#btnHomeMission",
    "#btnPostOffice",
    "#btnSpaceWalk",
    "#btnBarneysFarm",
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
  const btnMoveToLand = createOrUpdateButton(buttonSelectors[0]);
  const btnTerravilla = createOrUpdateButton(buttonSelectors[1]);
  const btnCHinterior = createOrUpdateButton(buttonSelectors[2]);
  const btnMiningDungeon = createOrUpdateButton(buttonSelectors[3]);
  const btbCarnival = createOrUpdateButton(buttonSelectors[4]);
  const btnGuildhallinterior = createOrUpdateButton(buttonSelectors[5]);
  const btnPostOfficeInterior = createOrUpdateButton(buttonSelectors[6]);
  const btnSpaceWalk = createOrUpdateButton(buttonSelectors[7]);
  const btnBarneysFarm = createOrUpdateButton(buttonSelectors[8]);
  // Add elements to the invisible box
  invisibleBox.appendChild(tokenLabel);
  invisibleBox.appendChild(txtLand);

  invisibleBox.appendChild(btnMoveToLand);
  invisibleBox.appendChild(btnTerravilla);
  invisibleBox.appendChild(btnCHinterior);
  invisibleBox.appendChild(btnMiningDungeon);
  invisibleBox.appendChild(btbCarnival);
  invisibleBox.appendChild(btnGuildhallinterior);
  invisibleBox.appendChild(btnPostOfficeInterior);
  invisibleBox.appendChild(btnSpaceWalk);
  invisibleBox.appendChild(btnBarneysFarm);
  // Add invisible box to inner container
  innerContainer.appendChild(invisibleBox);

  // Add inner container to containerlabel
  container.appendChild(innerContainer);
  if (btnTerravilla) {
    btnTerravilla.addEventListener("click", () => {
      localStorage.setItem('mapIDS', 'terravilla');
      clickTelevila();
    });
  }
  
  if (btnCHinterior) {
    btnCHinterior.addEventListener("click", () => {
      localStorage.setItem('mapIDS', 'CHinterior');
      clickTelevila();
    });
  }
  
  if (btnMiningDungeon) {
    btnMiningDungeon.addEventListener("click", () => {
      localStorage.setItem('mapIDS', 'MiningDungeon');
      clickTelevila();
    });
  }
  
  if (btbCarnival) {
    btbCarnival.addEventListener("click", () => {
      localStorage.setItem('mapIDS', 'carnival');
      clickTelevila();
    });
  }
  if (btnGuildhallinterior) {
    btnGuildhallinterior.addEventListener("click", () => {
      localStorage.setItem('mapIDS', 'guildhallinterior');
      clickTelevila();
    });
  }
  
  if (btnPostOfficeInterior) {
    btnPostOfficeInterior.addEventListener("click", () => {
      localStorage.setItem('mapIDS', 'PostOfficeInterior');
      clickTelevila();
    });
  }
  
  if (btnSpaceWalk) {
    btnSpaceWalk.addEventListener("click", () => {
      localStorage.setItem('mapIDS', 'SpaceWalk');
      clickTelevila();
    });
  }
  
  if (btnBarneysFarm) {
    btnBarneysFarm.addEventListener("click", () => {
      localStorage.setItem('mapIDS', 'barneysFarm');
      clickTelevila();
    });
  }
  if (btnMoveToLand) {
    btnMoveToLand.addEventListener("click", () => {
      land = document.querySelector("#txtLand").value;
      if (land != "") {
        localStorage.setItem('mapIDS', 'pixelsNFTFarm-'+land);
        clickTelevila();
      }
    });
  }
  function clickTelevila() {
    document.querySelector("#__next > div > div.room-layout > div > div:nth-child(1) > div > div.Hud_top__nZRRz.Hud_left__mQoqW > div > button:nth-child(4)").click();
    setTimeout(()=>{
        document.querySelector("#__next > div > div.room-layout > div > div.LandAndTravel_container__WCM6U.commons_uikit__Nmsxg > div.LandAndTravel_customHeader__goUPo > button").click();
    }, 300);
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
