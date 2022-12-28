//قائمة استدعاء العناصر
let bar = document.getElementById("bar");
let cancel_bar = document.getElementById("cancel-bar");
let aside_hide = document.querySelector(".aside");
let input = document.querySelectorAll(".input");
let label = document.querySelector(".label");
let account = document.getElementById("account_name");
let number = document.getElementById("number");
let birth = document.getElementById("birth");
let username = document.getElementById("username");
let prog_select = document.getElementById("prog-select");
let spin = document.getElementById("spin");
let show = document.getElementById("show");
let tt = document.querySelector(".tt");
let copy = document.querySelector(".copy");
let captcha = new Array();
const activeCaptcha = document.getElementById("captcha");
let cap = document.getElementById("cap");
var id = document.getElementById("id");
let signupbtn = document.getElementById("account_name");
let form = document.getElementById("sheetdb-form");
var signup = document.getElementById("signupbtn");
signup.disabled = true;

//عند الضغط على حقل ادخال التاريخ يتحول نوعه من نص لتاريخ
birth.addEventListener("focus", function () {
  birth.type = "date";
});
//عند الخروج اذا كانت قيمته فارغة يعود لنوع النص غير ذلك يبقى تاريخ
birth.addEventListener("blur", function () {
  if (birth.value == "") {
    birth.type = "text";
  } else {
    birth.type = "date";
  }
});

//عند تغيير قيمة الرقم اذا كانت بدايته +963
//يتغير شكل البيانات المسموحة
number.addEventListener("input", function () {
  if (number.value == "+963") {
    number.setAttribute("pattern", "[+][0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}");
  }
});
//عند الضغط على حقل الرقم يظهر نص مساعد
number.addEventListener("focus", function () {
  number.placeholder = "+963-932-264-458";
});
//عند الخروج من حقل الرقم اذا كان فارغا يزول النص المساعد
number.addEventListener("blur", function () {
  if (number.value == "") {
    number.placeholder = " ";
  }
});

//في اجهزة المحمول عند الضغط على زر اظهار النافذة الجانبية جعلناها تستغرق وقتا لتظهر كنوع من الانميشن
bar.onclick = function () {
  setTimeout(() => {
    aside_hide.style.opacity = 1;
  }, 200);
};

// عند النقر على زر اغلاها تختفي بعد وقت كذلك
cancel_bar.onclick = function () {
  setTimeout(() => {
    aside_hide.style.opacity = 0;
  }, 200);
};
//عند الضغط على زر اظهار الجدول نستدعي الدالة ويكون ليس هناك اي sort
show.onclick = function () {
  fet(null);
};

var x = "";
//عند مايكون اسم الحقل sort
if (document.querySelector('input[name="sort"]')) {
  //تحديد جميع الحقول بهذا الاسم
  document.querySelectorAll('input[name="sort"]').forEach((elem) => {
    //عند تغيير الحقل تتغير قيمة ال sort ونرسلها لتظهر في الجدول
    elem.addEventListener("change", function (event) {
      //ونظهر انميشن الانتظار
      spin.style.opacity = 1;
      spin.classList.add("spin");
      x = event.target.value;
      fet(x);
    });
  });
}
//لتوليد الكاباتشا
function createCaptcha() {
  activeCaptcha.style.textDecoration = "line-through";
  for (q = 0; q < 6; q++) {
    if (q % 2 == 0) {
      //استخدمنا دالة العشاوئية و التقريب
      //واستخدمنا نص من احرف عشوائية وارقام عشوائية
      captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    } else {
      captcha[q] = Math.floor(Math.random() * 10 + 0);
    }
  }
  var theCaptcha = captcha.join(""); //قمنا بضمهم لبعض لتوليد الكلمة
  activeCaptcha.innerHTML = `${theCaptcha}`; //واظهارها
}

cap.addEventListener("input", function () {
  //للتحقق ما اذا كانت كتابت الكاباتشا صحيحة
  if (activeCaptcha.innerHTML == cap.value && id != "") {
    signup.disabled = false; //الغاء تعطيل الزر
  } else {
    signup.disabled = true; //تعطيل الزر
  }
});
let svu = [];
form.addEventListener("submit", (e) => {
  e.preventDefault(); //اسقاف افتراضي الارسال
  id.value = svu.length; //جنريت لل id
  let fd = new FormData(form); //عمل نسخة م الفورم
  let obj = Object.fromEntries(fd); //عمل اوبجيكت من عناصر الفورم
  svu.push(obj); //و حشره بالمصفوفة وتصبحة مصفوفة من عدة اوبجيكت
  alert("تمت الاضافة بنجاح !!!"); //رسالة
  document.getElementById("reset").click(); //الضغط على ريسيت لافراغ الحقول
  activeCaptcha.click();//لتغيير الكاباتشا
  //اعادة النوع الافتراصي للحقول
  if (birth.value == "") {
    birth.type = "text";
  } else {
    birth.type = "date";
  }
  if (number.value == "") {
    number.placeholder = " ";
  }
  signup.disabled = true; //تعطيل الزر
});
//لاظهار البيانات
function fet(x) {
  var temp = ""; //جسم الجدول
  tt.innerHTML = "";
  var z = false;
  var json_data = {}; //json array
  svu = svu.sort(function (a, b) {
    //التصفية
    //حيث X هي ازرار الاختيار
    if (x != "" && x == "id") {
      //تصفية حسب الرقم
      if (a.id < b.id) {
        return -1; //اذا كان الثاني اكبر يقوم بترتيبهم
      }
    } else if (x != "" && x == "username") {
      //حسب الاسم
      if (a.username < b.username) {
        return -1; //اذا كان اكبر بمعنى بعده بترتيب الحروف
      }
    } else if (x != "" && x == "account_name") {
      //حسب الحساب
      if (a.account_name < b.account_name) {
        return -1;
      }
    } else if (x != "" && x == "program") {
      //حسب البرنامج
      if (a.program < b.program) {
        return -1;
      }
    } else if (x == null) {
      data = data;
    }
  });
  setTimeout(() => {
    //انمشن الدوران
    spin.classList.remove("spin");
    spin.style.opacity = 0;
  }, 1000);
  svu.forEach((itemData) => {
    //فور على كل العناصر بعد الترتيب
    if (itemData.program == prog_select.value && prog_select.value != "") {
      z = true; //تم ايجاده
      //اضافتهم للجدول
      temp += "<tr>";
      temp += "<td>" + itemData.id + "</td>";
      temp += "<td>" + itemData.program + "</td>";
      temp += "<td>" + itemData.account_name + "</td>";
      temp += "<td>" + itemData.username + "</td>";
      temp += "<td>" + itemData.number + "</td>";
      temp += "<td>" + itemData.birth + "</td></tr>";
      document.getElementById("data").innerHTML = temp;
      json_data = {
        //وضعهم ب json array
        id: itemData.id,
        program: itemData.program,
        account: itemData.account_name,
        username: itemData.username,
        birth: itemData.birth,
      };
      tt.textContent += JSON.stringify(json_data, null, 4); //تحويلها لنص  وطباعتها على الشاشة
      //نفس الامر هنا ولكن بدون تحديد برنامج معن
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
    } else if (
      itemData.program != prog_select.value &&
      prog_select.value != "" && z != true
    ) {
      //اذا لم يجد مايبحث عنه يصبح الجدول فارغ
      document.getElementById("data").innerHTML = "";
    }
  });
}
copy.onclick = function () {
  //عند الضغط على ايقونة النسخ تنسخ
  navigator.clipboard.writeText(tt.value);
  alert("تم النسخ للحافظة");
};
