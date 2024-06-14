function menu() {
    var isLogin = localStorage.getItem('isLogin') === 'true';
    const options = [
      { label: 'Attack-Speed', checked: false },
      { label: 'Speed', checked: false },
      { label: 'Dame', checked: false },
      { label: 'Crit', checked: false }
    ];
    // Create main container div
    const container = document.createElement('div');
    container.classList.add('containerbw');
    document.body.appendChild(container);
  
  
    //Checkbox
  
    const checkboxContainer = document.createElement('div');
      checkboxContainer.classList.add('checkbox-container');
  
      options.forEach((option, index) => {
        const row = document.createElement('div');
        row.classList.add('row');
  
        const col = document.createElement('div');
        col.classList.add('col');
  
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `checkbox-${index}`;
        input.checked = option.checked;
  
        const toggleLabel = document.createElement('label');
        toggleLabel.htmlFor = `checkbox-${index}`;
        toggleLabel.classList.add('toggle');
        if (option.checked) {
          toggleLabel.classList.add('checked');
        }
  
        const spanLabel = document.createElement('span');
        spanLabel.textContent = option.label;
  
        input.addEventListener('change', function () {
          if (input.checked) {
            toggleLabel.classList.add('checked');
            localStorage.setItem(option.label, 'true');
          } else {
            localStorage.setItem(option.label, 'false');
            toggleLabel.classList.remove('checked');
          }
        });
  
        col.appendChild(input);
        col.appendChild(toggleLabel);
        col.appendChild(spanLabel);
        row.appendChild(col);
        checkboxContainer.appendChild(row);
      });
  
  
  
    if (isLogin) {
      fetch('http://localhost:8000/api/user', {
        method: 'GET',
          credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
             var message = data['message'] || ""
             if(message=='success')
              {
                container.appendChild(checkboxContainer);
              }
              else{
                isLogin = false
                localStorage.removeItem('accessToken');
              }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  
    } else {
      // Create login card div
      const loginCard = document.createElement('div');
      loginCard.classList.add('login-card');
  
      // Create and append card title
      const cardTitle = document.createElement('div');
      cardTitle.classList.add('card-title');
      const title = document.createElement('h1');
      title.textContent = 'Login';
      cardTitle.appendChild(title);
  
      // Create form element
      const form = document.createElement('form');
      form.classList.add('form-group');
      form.id = 'loginForm';
  
      // Create and append username input
      const userNameInput = document.createElement('input');
      userNameInput.name = 'userName';
      userNameInput.type = 'userName';
      userNameInput.id = 'userName';
      userNameInput.placeholder = 'User Name';
      userNameInput.required = true;
  
      // Create and append password input
      const passwordInput = document.createElement('input');
      passwordInput.type = 'password';
      passwordInput.id = 'password';
      passwordInput.placeholder = 'Password';
      passwordInput.required = true;
  
      // Create and append submit button
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.textContent = 'Submit';
  
      // Append inputs and button to form
      form.appendChild(userNameInput);
      form.appendChild(passwordInput);
      form.appendChild(submitButton);
  
      // Append card title and form to login card
      loginCard.appendChild(cardTitle);
      loginCard.appendChild(form);
  
      // Append login card to container
      container.appendChild(loginCard);
  
      // Form submission handler
      form.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const userName = document.getElementById('userName').value;
        const password = document.getElementById('password').value;
        console.log(userName)
        console.log(password)
        const data = {
          userName: userName,
          password: password
        };
  
        fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            var message = data['message'] || ""
            if (message != "") {
              alert(message);
              isLogin = false
              window.location.href = ""
              localStorage.removeItem('accessToken');
            }
            else {
              isLogin = true
              localStorage.setItem('isLogin', 'true');
              localStorage.setItem('accessToken', data['accessToken']);
              document.cookie = `accessToken=${data.accessToken}; path=/`;
              localStorage.setItem('user', JSON.stringify({
                id: data.id,
                userName: data.userName
              }));
  
              container.replaceChild(checkboxContainer,loginCard)
            }
  
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
    }
  
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .containerbw {
        height: 320px;
         width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 250px;
            width: 250px;
            background-color: rgb(207, 248, 255);
             bottom: 0%;
            left: 0%;
            position: absolute;
            z-index: 999;
            opacity: 85%;
        }
  
        .login-card {
            display: flex;
            flex-direction: column;
            margin: 10px 10px;
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
            background-color: #ffffff;
            padding: 10px;
            border-radius: 10px;
            width: 100%;
  
        }
        .login-card input {
            margin: 5px 0;
            width: 100%;
            background-color: #e2e2e2;
            border: none;
            outline: none;
            border-radius: 4px;
            padding: 10px;
            font-size: 10px;
        }
  
        .login-card button {
            background-color: #4796ff;
            color: #ffffff;
            font-size: 10px;
            outline: none;
            border-radius: 5px;
            border: none;
            padding: 8px 15px;
            width: 100%;
        }
        .card-title h1 {
            font-size: 20px;
            font-weight: bold;
            color: black;
        }
        * {
              box-sizing: border-box;
          }
  
          :host {
              height: 50vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgb(207, 248, 255);
          }
  
          .checkbox-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 10px;
              background: white;
              border-radius: 20px;
          }
  
          .row {
              display: flex;
              justify-content: space-between;
              width: 100%;
          }
  
          .col {
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
  
          span {
              font-size: 12px;
              color: black;
              line-height: 30px;
          }
      `;
    document.head.appendChild(style);
    return container;
  }
  
