let bar = document.getElementById("bar");
let cancel_bar = document.getElementById("cancel-bar");
let aside_hide = document.querySelector(".aside");
let input = document.querySelectorAll(".input");
let label = document.querySelector("label");

let account = document.getElementById("account_name");
let number = document.getElementById("number");
let birth = document.getElementById("birth");
let username = document.getElementById("username");

let prog_select = document.getElementById("prog-select");
let spin = document.getElementById("spin");

birth.addEventListener("focus", function () {
  birth.type = "date";
});
birth.addEventListener("blur", function () {
  if (birth.value == "") {
    birth.type = "text";
  } else {
    birth.type = "date";
  }
});

number.addEventListener("input", function () {
  if (number.value == "+963") {
    number.setAttribute("pattern", "[+][0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}");
  }
});
number.addEventListener("focus", function () {
  number.placeholder = "+963-932-264-458";
});
number.addEventListener("blur", function () {
  if (number.value == "") {
    number.placeholder = " ";
  }
});

bar.onclick = function () {
  setTimeout(() => {
    aside_hide.style.opacity = 1;
  }, 200);
};

cancel_bar.onclick = function () {
  setTimeout(() => {
    aside_hide.style.opacity = 0;
  }, 200);
};
let show = document.getElementById("show");
show.onclick = function () {
  fet(null); 
};
let tt = document.querySelector(".tt");
let copy = document.querySelector(".copy");
copy.onclick = function () {
  navigator.clipboard.writeText(tt.value);
  alert("تم النسخ للحافظة");
};
var x = "";
if (document.querySelector('input[name="sort"]')) {
  document.querySelectorAll('input[name="sort"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      spin.style.opacity = 1;
      spin.classList.add("spin");
      x = event.target.value;
      fet(x);
    });
  });
}
let captcha = new Array();
const activeCaptcha = document.getElementById("captcha");
function createCaptcha() {
  activeCaptcha.style.textDecoration = "line-through";
  for (q = 0; q < 6; q++) {
    if (q % 2 == 0) {
      captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    } else {
      captcha[q] = Math.floor(Math.random() * 10 + 0);
    }
  }
  var theCaptcha = captcha.join("");
  activeCaptcha.innerHTML = `${theCaptcha}`;
}
let cap = document.getElementById("cap");

var id = document.getElementById("id");
let signupbtn = document.getElementById("account_name");

let form = document.getElementById("sheetdb-form");
var signup = document.getElementById("signupbtn");
signup.disabled = true;
cap.addEventListener("input", function () {
  if (activeCaptcha.innerHTML == cap.value && id != "") {
    signup.disabled = false;
  } else {
    signup.disabled = true;
  }
});
let svu = []
form.addEventListener("submit", (e) => {
  e.preventDefault();
  id.value = svu.length;
  let fd = new FormData(form);
  let obj = Object.fromEntries(fd);
  svu.push(obj);
  input.forEach((e) => {
    e.value = "";
    if (birth.value == "") {
      birth.type = "text";
    } else {
      birth.type = "date";
    }
    if (number.value == "") {
      number.placeholder = " ";
    }
  });
});

function fet(x) {
  var temp = "";
  tt.innerHTML = "";
  var json_data = {};
      svu = svu.sort(function (a, b){
        if (x != "" && x == "id") {
          if (a.id < b.id) {
            return -1;
          }
        } else if (x != "" && x == "username") {
          if (a.username < b.username) {
            return -1;
          }
        } else if (x != "" && x == "account_name") {
          if (a.account_name < b.account_name) {
            return -1;
          }
        } else if (x != "" && x == "program") {
          if (a.program < b.program) {
            return -1;
          }
        } else if (x == null) {
          data = data;
        }
      });
      setTimeout(() => {
        spin.classList.remove("spin");
        spin.style.opacity = 0;
      }, 1000);
      svu.forEach((itemData) => {
        if (itemData.program == prog_select.value && prog_select.value != "") {
          temp += "<tr>";
          temp += "<td>" + itemData.id + "</td>";
          temp += "<td>" + itemData.program + "</td>";
          temp += "<td>" + itemData.account_name + "</td>";
          temp += "<td>" + itemData.username + "</td>";
          temp += "<td>" + itemData.number + "</td>";
          temp += "<td>" + itemData.birth + "'" + "</td></tr>";
          document.getElementById("data").innerHTML = temp;
          json_data = {
            id: itemData.id,
            program: itemData.program,
            account: itemData.account_name,
            username: itemData.username,
            birth: itemData.birth,
          };
          tt.textContent += JSON.stringify(json_data, null, 4);
        } else if (prog_select.value == "") {
          temp += "<tr>";
          temp += "<td>" + itemData.id + "</td>";
          temp += "<td>" + itemData.program + "</td>";
          temp += "<td>" + itemData.account_name + "</td>";
          temp += "<td>" + itemData.username + "</td>";
          temp += "<td>" + itemData.number + "</td>";
          temp += "<td>" + itemData.birth + "'" + "</td></tr>";
          document.getElementById("data").innerHTML = temp;
          json_data = {
            id: itemData.id,
            program: itemData.program,
            account: itemData.account_name,
            username: itemData.username,
            birth: itemData.birth,
          };
          tt.textContent += JSON.stringify(json_data, null, 4);
        }else if(itemData.program != prog_select.value && prog_select.value != ""){
          document.getElementById("data").innerHTML = "";
        }
      });
}