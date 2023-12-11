var { token } = sessionStorage;
var socket = io.connect(window.location.origin, {
  query: { token }
});
var ip = "";
var username = "";
let userIdLocal = "";
let userNameLocal = "";
var bingoMess = "";
var contentNotification = "";
let userId = "BRYCENAD9999";
var verBingo = "ver75";
let adminFlag = false;
let loginFlag = false;
var bingoFlag = false;
var userDropList = [];
var randomeList = [];
var boardArray = [];
var idElmList = [];
var timeRemaining;
var countInterval = 0;

// Declaring GLOBAL vars for X and Y and Z
var X1 = 0;
var X2 = 0;
var X3 = 0;
var X4 = 0;
var X5 = 0;
var Y1 = 0;
var Y2 = 0;
var Y3 = 0;
var Y4 = 0;
var Y5 = 0;
var Z1 = 0;
var Z2 = 0;
var arrX1 = [];
var arrX2 = [];
var arrX3 = [];
var arrX4 = [];
var arrX5 = [];
var arrY1 = [];
var arrY2 = [];
var arrY3 = [];
var arrY4 = [];
var arrY5 = [];
var arrZ1 = [];
var arrZ2 = [];
$('body').keydown(function (e) {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        window.open('chrome://inspect/#devices', '_blank');
    }
});

// Xóa đoạn mã xử lý keydown cũ để tránh xung đột
$('body').off('keydown');

document.addEventListener('DOMContentLoaded', function () {
  //localStorage.clear() -- token lÆ°u trong storage nĂªn khĂ´ng clear. Ä‘á»ƒ cĂ³ thá»ƒ lÆ°u khĂ´ng cáº§n Ä‘Äƒng nháº­p láº¡i.
   const scriptTag = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/disable-devtool"]');
    if (scriptTag) {
        scriptTag.parentNode.removeChild(scriptTag);
    }
  var getTimeRestart = new Date(localStorage.getItem("timeRestart"));
  getTimeRestart.setMinutes(getTimeRestart.getMinutes() + 3);
  var getDate = new Date();
  timeRemaining = getTimeRestart.getTime() - getDate.getTime();
  if (timeRemaining > 0) {
    $("#auto-progress").removeClass("hidden");
    var seconds = Math.floor((timeRemaining) / 1000);
    countAutoProgress(seconds, seconds, $('#auto-progress'));
  } else {
    $("#auto-progress").addClass("hidden");
  }
}, false);

$(document).on('keyup', function (e) {
  if (e.key == "Escape") {
    closeModalImage();
    hiddenEmojiList();
  }
});

$(document).ready(function () {
  let mouse_is_inside;
  $('.dropdown').hover(function () {
    mouse_is_inside = true;
  }, function () {
    mouse_is_inside = false;
  });
  $("body").mouseup(function () {
    if (!mouse_is_inside) {
      document.getElementById("myDropdown").classList.remove("show");
      if ($("#myInput").val() == '') {
        $("#myInput").val(localStorage.getItem("key"));
      }
    }
  });
});

//listen connect -- LUC MOI BAT DAU
socket.on("connect", function (data) {
  socket.emit("join", "User connect: ");
  if (localStorage.getItem('key')) {
    socket.emit("check-token")
  }
});

//listen on server-status
socket.on("server-status", function (status) {
  bingoFlag = status.bingoFlag;
  bingoMess = "ChĂºc má»«ng báº¡n<br>" + status.bingoMess.data + "Ä‘Ă£ chiáº¿n tháº¯ng!<br>Sá»‘ trĂºng thÆ°á»Ÿng: " + status.bingoMess.numberList + "<br>ChĂºc cĂ¡c báº¡n may máº¯n láº§n sau !";
  if (bingoFlag) {
    $(".text-complete").html("")
    $(".text-complete").removeClass("animate__animated animate__tada");
    $(".text-complete").html(bingoMess);
    $(".text-complete").addClass("animate__animated animate__tada");
  }
});

//listen on update status
socket.on("update-status", function (serverStatus) {
  verBingo = serverStatus.version;
  if (verBingo == "ver75") {
    $("#ver75").prop("checked", true);
  }
  $(".user-length").text(serverStatus.onlineUser)
  if (serverStatus.notifiMess != "" && serverStatus.notifiMess != undefined) {
    content = "<marquee>" + serverStatus.notifiMess + "</marquee>";
    $(".notification-marquee").html("");
    $(".notification-marquee").html(content);
  }
});

//listen on update winner
socket.on("update-winner", function (bingoMess, restartAutoFlag) {
  bingoFlag = true;
  let content = "ChĂºc má»«ng báº¡n<br>" + bingoMess.data + " Ä‘Ă£ chiáº¿n tháº¯ng!<br>Sá»‘ trĂºng thÆ°á»Ÿng: " + bingoMess.numberList + "<br>ChĂºc cĂ¡c báº¡n may máº¯n láº§n sau !";
  $(".text-complete").html(content);
  $(".text-complete").addClass("animate__animated animate__tada");
  $("#bingo-content").text(bingoMess.data);
  const el = document.querySelector('#modal-bingo');
  const cl = el.classList;
  cl.add('show-modal');
  if (restartAutoFlag) {
    localStorage.setItem("timeRestart", new Date());
    getAutoProgress();
  }
});

socket.on("run-client", function (flag) {
  if (flag) {
    const elPlay = document.querySelector('#modal-play');
    const clPlay = elPlay.classList;
    clPlay.add('show-modal');
  } else {
    const elPause = document.querySelector('#modal-pause');
    const clPause = elPause.classList;
    clPause.add('show-modal');
  }
})

//listen on restart
socket.on("restart", function (updTime, restartFlag, version) {
  if (restartFlag) {
    const el = document.querySelector('#modal-mess');
    const cl = el.classList;
    cl.add('show-modal');
    bingoFlag = false;
    randomeList = [];
    $("#now-number").text("GO !");
    $("#list-number").html("");
    $("#count-number").text("...");
    $(".text-complete").html("");
    $("#container-count-down").addClass("hidden");
    $("#auto-progress").addClass("hidden");
    clearBingo();
    verBingo = version;
    if (verBingo == "ver75") {
      $("#ver75").prop("checked", true);
    }
    let userId = $("#myInput").val().split("-", 2);
    socket.emit("reset-bingo-card", userId[1].trim(), localStorage.getItem('key'));
    localStorage.setItem("timeRestart", "timeRestart");
  } else {
    $("#container-count-down").removeClass("hidden");
    $("#count-down").text(updTime);
  }
});

//listen on admin send notificaton to all user
socket.on("notificate-all", function (notifiMess) {
  let content;
  if (notifiMess != "") {
    if (notifiMess == "chatoff") {
      document.getElementById('message').disabled = true;
      document.getElementById('messageFile').disabled = true;
      content = "<marquee>Chá»©c nÄƒng chat táº¡m thá»i Ä‘ang táº¡m khĂ³a.</marquee>";
    } else if (notifiMess == "chaton") {
      document.getElementById('message').disabled = false;
      document.getElementById('messageFile').disabled = false;
      content = "<marquee>HĂ£y cĂ¹ng nhau trĂ² chuyá»‡n nĂ o.</marquee>";
    } else {
      content = "<marquee>" + notifiMess + "</marquee>";
    }

  } else {
    content = "<marquee>&nbsp;</marquee>";
  }
  $(".notification-marquee").html("");
  $(".notification-marquee").html(content);
});

//emoji-animation
socket.on("send-emoji-list", function (emojiAniList) {
  let list;
  let countEmoji = 1;
  for (let i = 0; i < emojiAniList.length; i++) {
    countEmoji == 1 ? list += '<tr>' : null;
    list += '<td><img onclick="selectEmoji(event)" id="emoji ' + emojiAniList[i].id + '" src="' + emojiAniList[i].src + '"></td>'
    countEmoji++;
    if (countEmoji == 8) {
      list += '</tr>';
      countEmoji = 1;
    }
  }
  $("#tblEmojiList").html(list);
});

//listen message result
socket.on("send-mess-list", function (messList, loginFlag) {
  let li = '';
  let fullName = "";
  if ($("#myInput").val().split("-", 1) != "") {
    fullName = $("#myInput").val().split("-", 1);
    fullName = fullName[0].trim();
  }
  messList.forEach((mess) => {
    if (mess.data == "") return;
    let emojiImg = false;
    if (mess.data) {
      //náº¿u cĂ³ 1 emoji
      if (mess.data.indexOf('img onclick="selectEmoji(event)"') == 1) {
        //chá»‰ cĂ³ emoji khĂ´ng cĂ³ vÄƒn báº£n
        let content = mess.data.split('.gif">');
        if (content.length <= 2 && content[1] == "") {
          let con = content[0].split('<img');
          if (con[0] == "") {
            emojiImg = true;
          }
        }
      }
    }
    if (mess.mineType) {
      let src = `data:${mess.mineType};base64,${mess.data}`;
      if (mess.user == '') {
        return;
        // li += mess + mess.time + '</div>' + '<img class="img-mess" src="' + src + '" onClick="swipe(\'' + src + "','" + mess.ip + '\')"></li>';
        // $("#send-mess-list").html(li);
      } else {
        if (mess.user.trim() == fullName && loginFlag) {
          li += '<li style="margin: 0 18px 0 0;"><div style="text-align: end;">' + mess.time + '</div>' + '<img class="img-mess-right" src="' + src + '" onClick="swipe(\'' + src + "','" + mess.user + '\')"></li>';
          $("#send-mess-list").html(li);
        } else {
          li += '<li style="margin: 0 18px 0 0;"><div><b>' + mess.user + '</b> &nbsp;&nbsp;&nbsp;' + mess.time + '</div>' + '<img class="img-mess" src="' + src + '" onClick="swipe(\'' + src + "','" + mess.user + '\')"></li>';
          $("#send-mess-list").html(li);
        }
      }
    }
    //trÆ°á»ng há»£p lĂ  tin nháº¯n vÄƒn báº£n
    else {
      //chÆ°a Ä‘Äƒng nháº­p
      if (mess.user == '') {
        return;
        //khĂ´ng pháº£i lĂ  sticker
        // if (mess.src == undefined) {
        //   //nhiá»u hÆ¡n 1 emoji
        //   if (!emojiImg) {
        //     li += "<li style='margin: 0 18px 0 0;'><div><b>KhĂ¡ch</b> &nbsp;&nbsp;&nbsp;" + mess.time + "</div><div class='box-mess'>" + mess.data + "</div></li>";
        //     $("#send-mess-list").html(li);
        //   } else {
        //     li += "<li style='margin: 0 18px 0 0;'><div><b>KhĂ¡ch</b> &nbsp;&nbsp;&nbsp;" + mess.time + "</div><div class='box-emoji'>" + mess.data + "</div></li>";
        //     $("#send-mess-list").html(li);
        //   }
        // }
        // //lĂ  sticker
        // else {
        //   li += "<li style='margin: 0 18px 0 0;'><div><b>KhĂ¡ch</b> &nbsp;&nbsp;&nbsp;" + mess.time + '</div>' + '<img class="sticker-mess" src="' + mess.src + '" onClick="swipe(\'' + mess.src + "','" + mess.user + '\')"></li>';
        //   $("#send-mess-list").html(li);
        // }
      }
      //Ä‘Ă£ Ä‘Äƒng nháº­p
      else {
        //khĂ´ng pháº£i lĂ  sticker
        if (mess.src == undefined) {
          if (mess.user.trim() == fullName && loginFlag) {
            //nhiá»u hÆ¡n 1 emoji
            if (!emojiImg) {
              li += "<li style='margin: 0 18px 0 0;'><div style='text-align: end;'>" + mess.time + "</div><div class='box-mess-right'>" + mess.data + "</div></li>";
              $("#send-mess-list").html(li);
            } else {
              li += "<li style='margin: 0 18px 0 0;'><div style='text-align: end;'>" + mess.time + "</div><div class='box-emoji-right'>" + mess.data + "</div></li>";
              $("#send-mess-list").html(li);
            }
          } else {
            if (!emojiImg) {
              li += "<li style='margin: 0 18px 0 0;'><div><b>" + mess.user + '</b> &nbsp;&nbsp;&nbsp;' + mess.time + "</div><div class='box-mess'>" + mess.data + "</div></li>";
              $("#send-mess-list").html(li);
            } else {
              li += "<li style='margin: 0 18px 0 0;'><div><b>" + mess.user + '</b> &nbsp;&nbsp;&nbsp;' + mess.time + "</div><div class='box-emoji-left'>" + mess.data + "</div></li>";
              $("#send-mess-list").html(li);
            }
          }
        } else {
          if (mess.user.trim() == fullName && loginFlag) {
            //right
            li += '<li style="margin: 0 18px 0 0;"><div style="text-align: end;">' + mess.time + '</div>' + '<img class="sticker-mess-right" src="' + mess.src + '" onClick="swipe(\'' + mess.src + "','" + mess.user + '\')"></li>';
            $("#send-mess-list").html(li);
          } else {
            //left
            li += '<li style="margin: 0 18px 0 0;"><div><b>' + mess.user + '</b> &nbsp;&nbsp;&nbsp;' + mess.time + '</div>' + '<img class="sticker-mess" src="' + mess.src + '" onClick="swipe(\'' + mess.src + "','" + mess.user + '\')"></li>';
            $("#send-mess-list").html(li);
          }
        }
      }
    }
  });
  const view = document.getElementById("send-mess-list");
  view.scrollTop = view.scrollHeight;
});

socket.on("send-next-number", function (data, delaySecond, status) {
  //delaySecond = 10
  ip = data.ip;
  if (data.version != null) {
    verBingo = data.version;
  }
  if ((verBingo == "ver75" && data.randomeList.length == 75) || (verBingo == "ver50" && data.randomeList.length == 50)) {
    $("#count-progress").addClass("hidden");
    $("#count-progress-mobile").addClass("hidden");
  } else {
    if (status != 'init') {
      $("#count-progress").removeClass("hidden");
      $("#count-progress-mobile").removeClass("hidden");
      countProgress(delaySecond, delaySecond, $('#count-progress-mobile'));
      countProgress(delaySecond, delaySecond, $('#count-progress'));
    }
  }
  if (data.randomeList.length > 0) {
    if (verBingo == "ver75") {
      $("#now-number").text(getFullNumberVer75(data.randomeList));
    } else {
      $("#now-number").text(getFullNumberVer50(data.randomeList));
    }
  } else {
    $("#now-number").text("");
  }
  $("#dial-time").text(delaySecond);
  randomeList = [];
  let strNum = '';
  let strNumMob = '';
  let maxNum = verBingo.split('ver');
  if (verBingo == "ver75") {
    $("#count-number").text(data.randomeList.length + ' / ' + maxNum[1]);
    data.randomeList.forEach((element) => {
      randomeList.push(element);
      let num = element;
      if (num <= 15) {
        strNum = strNum.replace(/^/, "<li class='curent-number-b'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-b'>" + num + "</span>,&nbsp;");
      } else if (num > 15 && num <= 30) {
        strNum = strNum.replace(/^/, "<li class='curent-number-i'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-i'>" + num + "</span>,&nbsp;");
      } else if (num > 30 && num <= 45) {
        strNum = strNum.replace(/^/, "<li class='curent-number-n'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-n'>" + num + "</span>,&nbsp;");
      } else if (num > 45 && num <= 60) {
        strNum = strNum.replace(/^/, "<li class='curent-number-g'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-g'>" + num + "</span>,&nbsp;");
      } else if (num > 60 && num <= 75) {
        strNum = strNum.replace(/^/, "<li class='curent-number-o'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-o'>" + num + "</span>,&nbsp;");
      }
      $("#list-number-mobile").html(strNumMob);
      $("#list-number").html(strNum);
    });
  } else {
    $("#count-number").text(data.randomeList.length + ' / ' + maxNum[1]);
    data.randomeList.forEach((element) => {
      randomeList.push(element);
      let num = element;
      if (num <= 10) {
        strNum = strNum.replace(/^/, "<li class='curent-number-b'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-b'>" + num + "</span>,&nbsp;");
      } else if (num > 10 && num <= 20) {
        strNum = strNum.replace(/^/, "<li class='curent-number-i'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-i'>" + num + "</span>,&nbsp;");
      } else if (num > 20 && num <= 30) {
        strNum = strNum.replace(/^/, "<li class='curent-number-n'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-n'>" + num + "</span>,&nbsp;");
      } else if (num > 30 && num <= 40) {
        strNum = strNum.replace(/^/, "<li class='curent-number-g'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-g'>" + num + "</span>,&nbsp;");
      } else if (num > 40 && num <= 50) {
        strNum = strNum.replace(/^/, "<li class='curent-number-o'>" + num + "</li>");
        strNumMob = strNumMob.replace(/^/, "<span class='child-number curent-number-mobile-o'>" + num + "</span>,&nbsp;");
      }
      $("#list-number-mobile").html(strNumMob);
      $("#list-number").html(strNum);
    });
  }
});

socket.on("send-user-list", function (userList) {
  let options = "<option value=''></option>";
  let options2 = '';
  userList.forEach(user => {
    options += '<option value="' + user.id + '">' + user.name + '</option>';
    options2 += '<a href="#" data-parent="' + user.user + '" id="' + user.id + '" value="' + user.user + '" onclick="selectUser(this.id, event)">' + user.name + '</a>';
    userDropList.push(user.name);
  });
  $("#user-select").html(options);
  $("#myDropdown").html(options2);

  let tmpUserIdLocal = $("#myInput").val();
  if (tmpUserIdLocal !== '')
    userIdLocal = $("#myInput").val();
});

socket.on("login-error", function () {
  loginFlag = false;
  $("#login-notification").text("Máº­t kháº©u khĂ´ng Ä‘Ăºng!");
});

socket.on("login-success", function (userIdResult, userNameResult, token, formLogin) {
  loginFlag = true;
  if (formLogin) {
    sessionStorage.setItem('token', token);
  }
  localStorage.setItem('key', userNameResult + ' - ' + userIdResult);
  if (document.getElementById("myInput").value == '') {
    document.getElementById("myInput").value = userNameResult + ' - ' + userIdResult;
  }
  userNameLocal = userNameResult;
  $("#login-notification").text("");
  $("#form-login").addClass("hidden");
  $("#bingo-card").removeClass("field-disabled");
  $("#clear").removeClass("hidden");
  //Role Admin
  if (userId == userIdResult) {
    if (verBingo == "" || verBingo == "ver50") {
      $("#ver75").prop("checked", true);
      $("#ver50").prop("checked", false);
    }
    toggleMobile(maxWidth);
    maxWidth.addListener(toggleMobile);
  }
});
//get bingoCard on Server
socket.on("bingo-card-receive", function (bingoCard) {
  if (bingoCard) {
    boardArray = [];
    delete bingoCard['staffid'];
    for (let x in bingoCard) {
      for (let y in bingoCard[x]) {
        boardArray.push(bingoCard[y][x]);
      }
    }
  }

  bingoCard = {
    0: [bingoCard[0][0], bingoCard[1][0], bingoCard[2][0], bingoCard[3][0], bingoCard[4][0]],
    1: [bingoCard[0][1], bingoCard[1][1], bingoCard[2][1], bingoCard[3][1], bingoCard[4][1]],
    2: [bingoCard[0][2], bingoCard[1][2], bingoCard[2][2], bingoCard[3][2], bingoCard[4][2]],
    3: [bingoCard[0][3], bingoCard[1][3], bingoCard[2][3], bingoCard[3][3], bingoCard[4][3]],
    4: [bingoCard[0][4], bingoCard[1][4], bingoCard[2][4], bingoCard[3][4], bingoCard[4][4]]
  }
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.classList.add('table');
  var thead = document.createElement('thead');
  var tbdy = document.createElement('tbody');
  var trhead = document.createElement('tr');
  for (var i = 0; i <= 4; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j <= 4; j++) {
      if (i == 0) {
        var th = document.createElement('th');
        if (j == 0) {
          th.classList.add('b-color');
          th.textContent = 'B';
        }
        if (j == 1) {
          th.classList.add('i-color');
          th.textContent = 'I';
        }
        if (j == 2) {
          th.classList.add('n-color');
          th.textContent = 'N';
        }
        if (j == 3) {
          th.classList.add('g-color');
          th.textContent = 'G';
        }
        if (j == 4) {
          th.classList.add('o-color');
          th.textContent = 'O';
        }
        trhead.appendChild(th);
        thead.appendChild(trhead);
      }
      var td = document.createElement('td');
      td.style.cursor = 'pointer';
      var tdId = [i] + '-' + j + '-' + bingoCard[i][j];
      td.innerHTML = '<div class = "td-content" id = "' + tdId + '">' + bingoCard[i][j] + '</div>';
      td.onclick = function (e) {
        if (bingoFlag) return;
        let numberFm = parseInt(e.target.innerText);
        const button = document.getElementById(e.target.id);
        const elEr = document.querySelector('#modal-error');
        const clEr = elEr.classList;
        idElmList.push(e.target.id);
        if (randomeList.includes(numberFm)) {
          if (!checked(button.innerHTML)) {
            button.innerHTML = numberFm + '<span style="display: none;">âŒ</span>';
            button.style.borderRadius = "90px";
            button.style.backgroundColor = "#7bbe35";
            button.style.color = "white";
            button.style.opacity = "1";
          } else {
            button.innerHTML = numberFm;
            button.style.borderRadius = "";
            button.style.backgroundColor = "";
            button.style.color = "black";
            button.style.opacity = "0.4";
          };
        } else {
          clEr.add('show-modal');
        }

        let dataBingo = {
          data: userNameLocal,
          token: sessionStorage.getItem("token"),
          time: formatDate(new Date()),
          numberList: []
        };
        // Handling X1  
        if (button.id == `0-0-${numberFm}` || button.id == `0-1-${numberFm}` || button.id == `0-2-${numberFm}` || button.id == `0-3-${numberFm}` || button.id == `0-4-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrX1 = arrX1.filter(function (item) {
                return item !== numberFm
              })
              X1--;
            } else {
              X1++;
              arrX1.push(numberFm);
            }
          }
          if (X1 == 5) {
            dataBingo.numberList = arrX1;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling X2 
        if (button.id == `1-0-${numberFm}` || button.id == `1-1-${numberFm}` || button.id == `1-2-${numberFm}` || button.id == `1-3-${numberFm}` || button.id == `1-4-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrX2 = arrX2.filter(function (item) {
                return item !== numberFm
              })
              X2--;
            } else {
              arrX2.push(numberFm);
              X2++;
            }
          }
          if (X2 == 5) {
            dataBingo.numberList = arrX2;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling X3
        if (button.id == `2-0-${numberFm}` || button.id == `2-1-${numberFm}` || button.id == `2-3-${numberFm}` || button.id == `2-4-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrX3 = arrX3.filter(function (item) {
                return item !== numberFm
              })
              X3--;
            } else {
              arrX3.push(numberFm);
              X3++;
            }
          }
          if (X3 == 4) {
            dataBingo.numberList = arrX3;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling X4    
        if (button.id == `3-0-${numberFm}` || button.id == `3-1-${numberFm}` || button.id == `3-2-${numberFm}` || button.id == `3-3-${numberFm}` || button.id == `3-4-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrX4 = arrX4.filter(function (item) {
                return item !== numberFm
              })
              X4--;
            } else {
              arrX4.push(numberFm);
              X4++;
            }
          }
          if (X4 == 5) {
            dataBingo.numberList = arrX4;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling X5  
        if (button.id == `4-0-${numberFm}` || button.id == `4-1-${numberFm}` || button.id == `4-2-${numberFm}` || button.id == `4-3-${numberFm}` || button.id == `4-4-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrX5 = arrX5.filter(function (item) {
                return item !== numberFm
              })
              X5--;
            } else {
              arrX5.push(numberFm);
              X5++;
            }
          }
          if (X5 == 5) {
            dataBingo.numberList = arrX5;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling Y1 
        if (button.id == `0-0-${numberFm}` || button.id == `1-0-${numberFm}` || button.id == `2-0-${numberFm}` || button.id == `3-0-${numberFm}` || button.id == `4-0-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrY1 = arrY1.filter(function (item) {
                return item !== numberFm
              })
              Y1--;
            } else {
              arrY1.push(numberFm);
              Y1++;
            }
          }
          if (Y1 == 5) {
            dataBingo.numberList = arrY1;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling Y2
        if (button.id == `0-1-${numberFm}` || button.id == `1-1-${numberFm}` || button.id == `2-1-${numberFm}` || button.id == `3-1-${numberFm}` || button.id == `4-1-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrY2 = arrY2.filter(function (item) {
                return item !== numberFm
              })
              Y2--;
            } else {
              arrY2.push(numberFm);
              Y2++;
            }
          }
          if (Y2 == 5) {
            dataBingo.numberList = arrY2;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling Y3 
        if (button.id == `0-2-${numberFm}` || button.id == `1-2-${numberFm}` || button.id == `3-2-${numberFm}` || button.id == `4-2-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrY3 = arrY3.filter(function (item) {
                return item !== numberFm
              })
              Y3--;
            } else {
              arrY3.push(numberFm);
              Y3++;
            }
          }
          if (Y3 == 4) {
            dataBingo.numberList = arrY3;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling Y4   
        if (button.id == `0-3-${numberFm}` || button.id == `1-3-${numberFm}` || button.id == `2-3-${numberFm}` || button.id == `3-3-${numberFm}` || button.id == `4-3-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrY4 = arrY4.filter(function (item) {
                return item !== numberFm
              })
              Y4--;
            } else {
              arrY4.push(numberFm);
              Y4++;
            }
          }
          if (Y4 == 5) {
            dataBingo.numberList = arrY4;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling Y5
        if (button.id == `0-4-${numberFm}` || button.id == `1-4-${numberFm}` || button.id == `2-4-${numberFm}` || button.id == `3-4-${numberFm}` || button.id == `4-4-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrY5 = arrY5.filter(function (item) {
                return item !== numberFm
              })
              Y5--;
            } else {
              arrY5.push(numberFm);
              Y5++;
            }
          }
          if (Y5 == 5) {
            dataBingo.numberList = arrY5;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling Z1  
        if (button.id == `0-0-${numberFm}` || button.id == `1-1-${numberFm}` || button.id == `3-3-${numberFm}` || button.id == `4-4-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrZ1 = arrZ1.filter(function (item) {
                return item !== numberFm
              })
              Z1--;
            } else {
              arrZ1.push(numberFm);
              Z1++;
            }
          }
          if (Z1 == 4) {
            dataBingo.numberList = arrZ1;
            socket.emit("bingo-user", dataBingo);
          }
        }

        // Handling Z2    
        if (button.id == `4-0-${numberFm}` || button.id == `3-1-${numberFm}` || button.id == `1-3-${numberFm}` || button.id == `0-4-${numberFm}`) {
          if (randomeList.includes(numberFm)) {
            if (!checked(button.innerHTML)) {
              arrZ2 = arrZ2.filter(function (item) {
                return item !== numberFm
              })
              Z2--;
            } else {
              arrZ2.push(numberFm);
              Z2++;
            }
          }
          if (Z2 == 4) {
            dataBingo.numberList = arrZ2;
            socket.emit("bingo-user", dataBingo);
          }
        }
      }
      if (i == 2 && j == 2) {
        td.innerHTML = '<div class="td-content"><img alt="..." class="img-fluid" src="./image/logobrc.png"></div>';
        td.style.cursor = 'default';
        td.style.pointerEvents = 'none';
      }
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);
  }
  tbl.style.backgroundColor = '#feef86'
  tbl.appendChild(thead);
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
  $("#bingo-card").html(tbl);
});

function swipe(src, name) {
  // Get the modal
  var modal = document.getElementById("moda-image");
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var modalImg = document.getElementById("image-content");
  var captionText = document.getElementById("caption");
  modal.style.display = "block";
  modalImg.src = src;
  captionText.textContent = name;
}

function checked(s) {
  return s.indexOf('âŒ') >= 0;
}

function selectUser(idUser, event) {
  event.preventDefault();
  document.getElementById("myInput").value = document.getElementById(idUser).innerHTML;
  username = document.querySelector("#" + idUser).dataset.parent;
  userSelect(idUser);
  fnHiddenValue();
}

var userSelect = function (userIdLocal) {
  logout();
  $(".login-notification").removeClass("hidden");
  $("#login-notification").text("");
  socket.emit("change-user", userIdLocal);
};

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}
//-----------------------FUNCTION----------------------------------
// Get file from event copy, drag
const fileInput = document.getElementById("messageFile");
window.addEventListener('paste', e => {
  if (e.clipboardData.files.length > 0) {
    fileInput.files = e.clipboardData.files;
    document.getElementById('message').textContent = e.clipboardData.files[0].name;
  }
});

const holder = document.getElementById('send-mess-list');
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
  this.className = '';
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  document.getElementById('message').textContent = e.dataTransfer.files[0].name;
}

// listen form submit
function clickSendMess() {
  var localTime = formatDate(new Date());
  var message = document.getElementById('message').innerHTML;
  const file = fileInput.files[0];
  if (!loginFlag) {
    const modalErrChat = document.querySelector('#modal-error-chat');
    modalErrChat.classList.add('show-modal');
  }
  if (file && document.getElementById('message').textContent == file.name && loginFlag) {
    let filename = file.name;
    let ext = getExtension(filename);
    let mimeType;
    switch (ext.toLowerCase()) {
      case 'jpg': mimeType = 'image/JPG'; break;
      case 'jpeg': mimeType = 'image/jpeg'; break;
      case 'gif': mimeType = 'image/GIF'; break;
      case 'png': mimeType = 'image/PNG'; break;
      default: mimeType = 'NoSupport';
    }
    const reader = new FileReader();
    reader.onload = function () {
      const base64 = reader.result.replace(/.*base64,/, '');
      let messImg = {
        user: loginFlag ? userNameLocal : '',
        base64: base64,
        type: mimeType,
        time: localTime
      }
      socket.emit("chat-messages", messImg);
    };
    reader.readAsDataURL(file);
  } else if (message != "" && loginFlag) {
    let messObj = {
      user: loginFlag ? userNameLocal : '',
      mess: message,
      time: localTime
    }
    socket.emit("chat-messages", messObj);
  }
  document.getElementById('message').textContent = '';
  event.preventDefault();
  return false;
};

function enterSendMess(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    clickSendMess();
  }
}

function checkValueMessage() {
  if (document.getElementById('message').textContent.length == 0) {
    document.getElementById('message').innerHTML = '';
  }
}

var getFullNumberVer75 = function (data) {
  let n = data[data.length - 1];
  switch (true) {
    case n <= 15:
      return "B - " + n;
    case n <= 30:
      return "I - " + n;
    case n <= 45:
      return "N - " + n;
    case n <= 60:
      return "G - " + n;
    default:
      return "O - " + n;
  }
}

var getFullNumberVer50 = function (data) {
  let n = data[data.length - 1];
  switch (true) {
    case n <= 10:
      return "B - " + n;
    case n <= 20:
      return "I - " + n;
    case n <= 30:
      return "N - " + n;
    case n <= 40:
      return "G - " + n;
    default:
      return "O - " + n;
  }
}

function getAutoProgress() {
  var getTimeRestart = new Date(localStorage.getItem("timeRestart"));
  getTimeRestart.setMinutes(getTimeRestart.getMinutes() + 3);
  var getDate = new Date();
  timeRemaining = getTimeRestart.getTime() - getDate.getTime();
  if (timeRemaining > 0) {
    $("#auto-progress").removeClass("hidden");
    var seconds = Math.floor((timeRemaining) / 1000);
    countAutoProgress(seconds, seconds, $('#auto-progress'));
  } else {
    $("#auto-progress").addClass("hidden");
  }
};

function closeModal() {
  const el = document.querySelector('#modal-bingo');
  el.classList.remove('show-modal')
}

function closeModalError() {
  const el = document.querySelector('#modal-error');
  el.classList.remove('show-modal')
}

function closeModalErrorChat() {
  const el = document.querySelector('#modal-error-chat');
  el.classList.remove('show-modal')
}

function closeModalMess() {
  const el = document.querySelector('#modal-mess');
  el.classList.remove('show-modal')
}

function closeModalPlay() {
  const el = document.querySelector('#modal-play');
  el.classList.remove('show-modal')
}

function closeModalPause() {
  const el = document.querySelector('#modal-pause');
  el.classList.remove('show-modal')
}

function closeModalImage() {
  const el = document.querySelector('#moda-image');
  el.style.display = 'none';
}

function restartServer() {
  // Set the date we're counting down to
  localStorage.setItem("timeRestart", "timeRestart");
  var delaySecondClient = $("#second").val();
  var hourCount = $("#hour").val();
  var minuteCount = $("#minute").val();
  var countDownDate = new Date();
  countDownDate.setHours(hourCount);
  countDownDate.setMinutes(minuteCount);
  countDownDate.setSeconds(0);
  var countDownTime = countDownDate.getTime();
  var version;
  var chat;
  var radioVer = document.getElementsByName('radioVer');
  var chatFlag = document.getElementsByName('chatFlag');
  for (var x of radioVer) {
    if (x.checked) {
      version = x.value
    }
  }
  for (var y of chatFlag) {
    if (y.checked) {
      chat = y.value
    }
  }
  socket.emit("restart-server", countDownTime, delaySecondClient, version, chat, sessionStorage.getItem('token'));
}

function pressLogin(e) {
  if (e.keyCode === 13) {
    e.preventDefault(); // Ensure it is only this code that runs
    login();
  }
}

var login = function () {
  let userId = [];
  userId = $("#myInput").val().split("-", 2);
  if (userId == "") {
    $("#login-notification").text("Vui lĂ²ng chá»n tĂªn Ä‘Äƒng nháº­p!");
  } else {
    $("#login-notification").text("");
    if (userId[1] == '' || userId[1] == undefined) {
      if (userId[0].trim() == "ISHII MANABU") {
        userId = "BRYCENVN000";
      } else if (userId[0].trim() == "Game Admin") {
        userId = "BRYCENTV9999";
      }
    } else {
      userId = userId[1].trim();
    }
    let pass = $("#pass").val();
    let [username1] = $("#myInput").val().split("-", 1);
    socket.emit("check-login", userId, pass, username1.trim());
  }
}

function logout() {
  clearInfo();
  $("#clear").addClass("hidden");
  localStorage.removeItem('key');
  sessionStorage.removeItem('token');
}

function clearInfo() {
  loginFlag = false;
  clearBingo();
  $("#pass").val("");
  $("#form-login").removeClass("hidden");
  $("#refesh").addClass("hidden");
  $(".notification").addClass("hidden");
  $("#bingo-card").addClass("field-disabled");
}

function clearBingo() {
  if (idElmList.length > 0) {
    idElmList.forEach(e => {
      let number = e.length == 5 ? e.slice(-1) : e.slice(-2);
      document.getElementById(e).innerHTML = number;
      document.getElementById(e).style.borderRadius = "";
      document.getElementById(e).style.backgroundColor = "";
      document.getElementById(e).style.color = "#212529";
      document.getElementById(e).style.opacity = "1";
    })
  }
  idElmList = [];
  clearProgess();
}

function clearProgess() {
  X1 = 0;
  X2 = 0;
  X3 = 0;
  X4 = 0;
  X5 = 0;
  Y1 = 0;
  Y2 = 0;
  Y3 = 0;
  Y4 = 0;
  Y5 = 0;
  Z1 = 0;
  Z2 = 0;
  arrX1 = [];
  arrX2 = [];
  arrX3 = [];
  arrX4 = [];
  arrX5 = [];
  arrY1 = [];
  arrY2 = [];
  arrY3 = [];
  arrY4 = [];
  arrY5 = [];
  arrZ1 = [];
  arrZ2 = [];
}

function fnShowValue() {
  $("#myInput").val("");
  document.getElementById("myDropdown").classList.toggle("show");
}
function fnHiddenValue() {
  document.getElementById("myDropdown").classList.remove("show");
}

function filterFunction() {
  document.getElementById("myDropdown").classList.add("show");
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function enterNotifi(e) {
  if (e.keyCode == 13) {
    notification();
  }
}

function notification() {
  notifiMess = $("#notifi").val();
  $("#notifi").val("");
  socket.emit("admin-notificate-all", notifiMess, sessionStorage.getItem('token'));
}

//--------------- response admin -------------------
var maxWidth = window.matchMedia("(max-width: 700px)");
function toggleMobile(maxWidth) {
  if (maxWidth.matches) {
    //mobile
    $(".adminPC").addClass("hidden");
    $(".adminMobile").removeClass("hidden");
    $(".notifiMobile").removeClass("hidden");
    $(".refeshMobile").removeClass("hidden");
  } else {
    //pc
    $(".adminMobile").html("");
    $(".adminMobile").addClass("hidden");
    $(".adminPC").removeClass("hidden");
    $("#refesh").removeClass("hidden");
    $(".notification").removeClass("hidden");
  }
}

function clearElementDuplicate(maxWidth) {
  if (maxWidth.matches) {
    $(".adminPC").html("");
  } else {
    $(".adminMobile").html("");
  }
}
clearElementDuplicate(maxWidth);
maxWidth.addListener(clearElementDuplicate);

function countProgress(timeleft, timetotal, $element) {
  var progressBarWidth = timeleft * $element.width() / timetotal;
  $element.find('div').animate({ width: progressBarWidth }, 500).html(timeleft % 60);
  if (timeleft > 1) {
    var timerProgress = setTimeout(function () {
      countProgress(timeleft - 1, timetotal, $element);
    }, 1000);
  } else {
    clearTimeout(timerProgress);
  }
};

function countAutoProgress(timeleft, timetotal, $element) {
  var progressBarWidth = timeleft * $element.width() / timetotal;
  let timeRestart = localStorage.getItem("timeRestart");
  $element.find('div').animate({ width: progressBarWidth }, 500).html(Math.floor(timeleft / 60) + ":" + timeleft % 60);
  if (timeleft > 1 && timeRestart !== "timeRestart") {
    var timerProgress = setTimeout(function () {
      countAutoProgress(timeleft - 1, timetotal, $element);
    }, 1000);
  } else {
    $("#auto-progress").addClass("hidden");
    clearTimeout(timerProgress);
  }
};

//---------emoji-------------
function hiddenEmojiList() {
  $(".emotion").css("display", "none");
}

function showEmojiList() {
  $(".emotion").css("display", "block");
}

function toggleEmoji() {
  document.getElementById("defaultOpen").click();
  $(".emotion").toggle();
  let element = $("#icon-smile");
  if (element.hasClass("bi-emoji-smile")) {
    element.removeClass("bi-emoji-smile");
    element.addClass("bi-arrow-down-circle");
  } else {
    element.addClass("bi-emoji-smile");
    element.removeClass("bi-arrow-down-circle");
  }
}

function selectEmoji(e) {
  if (e.target.tagName.toLowerCase() === 'img' && e.target.parentElement.id == "" && e.target.parentElement.offsetParent.className == "emotion") {
    document.querySelector('[contenteditable]').appendChild(e.target.cloneNode(true));
    toggleEmoji();
    hiddenEmojiList();
  } else {
    e.preventDefault();
  }
}

function openTabEmotion(elemnt) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  if (elemnt == "emojiList") {
    $(".bi-emoji-smile-fill").css("color", "#529135");
    $(".bi-stickies-fill").css("color", "#6fc149");
  } else {
    $(".bi-stickies-fill").css("color", "#529135");
    $(".bi-emoji-smile-fill").css("color", "#6fc149");
  }
  $("." + elemnt).css("display", "block");
}

function sendSticker(id) {
  var localTime = formatDate(new Date());
  var file = {
    name: "stiker_loveBRC.png",
    type: "image/png",
    src: $("#" + id).attr('src')
  }
  let filename = file.name;
  let ext = getExtension(filename);
  let mimeType;
  switch (ext.toLowerCase()) {
    case 'jpg': mimeType = 'image/JPG'; break;
    case 'jpeg': mimeType = 'image/jpeg'; break;
    case 'gif': mimeType = 'image/GIF'; break;
    case 'png': mimeType = 'image/PNG'; break;
    default: mimeType = 'NoSupport';
  }
  let messImg = {
    user: loginFlag ? userNameLocal : '',
    type: mimeType,
    time: localTime,
    src: file.src
  }
  toggleEmoji();
  hiddenEmojiList();
  socket.emit("chat-messages", messImg);
}

function playBingo() {
  $("#pauseBingo").removeClass("hidden");
  $("#playBingo").addClass("hidden");
  socket.emit("run-server", true, sessionStorage.getItem('token'));
}

function pauseBingo() {
  $("#pauseBingo").addClass("hidden");
  $("#playBingo").removeClass("hidden");
  socket.emit("run-server", false, sessionStorage.getItem('token'));
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
