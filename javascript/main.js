let modeBtn = document.querySelector(".back");
let modeBtnCircle = document.querySelector(".circle");

// Check for the the "theme" key in the local storage
if (window.localStorage.getItem("theme")) {
  [
    ...document.querySelectorAll(
      "main .container, main button, header, .landing, main, .name, .headline p, .main p, .icon span"
    ), modeBtnCircle
  ].forEach((el) => el.classList.toggle(window.localStorage.getItem("theme")));
}

// A Dark Mode Function To Give The Class 'dark' To A Certain Elements
function darkMode() {
  let isDark = modeBtnCircle.classList.toggle("dark"); 
  modeBtnCircle.classList.toggle("light");

  if (modeBtnCircle.classList.contains("dark")) {
    window.localStorage.setItem("theme", "dark");
  }
  else {
    window.localStorage.setItem("theme", "light");
  }

  [
    ...document.querySelectorAll(
      "main .container, main button, header, .landing, main, .name, .headline p, .main p, .icon span"
    ),
  ].forEach((el) => el.classList.toggle("dark", isDark));
}

modeBtn.addEventListener("click", darkMode);

let list = document.getElementById("list");
let icon = document.getElementsByClassName("icon")[0];

icon.addEventListener("click", function (e) {
  list.classList.toggle("clicked");
  e.stopPropagation();
});

document.addEventListener("click", function (e) {
  if (!icon.contains(e.target) && !list.contains(e.target)) {
    list.classList.remove("clicked");
  }
});

const englishChars = 26;
const arabicChars = 42;

// Function To Encrypt The English Letter
function englishEncryption(char, key) {
  key %= englishChars;
  const base = char === char.toUpperCase() ? 65 : 97;
  const alphabeticIndexing = char.charCodeAt(0) - base;
  const newIndex = (alphabeticIndexing + key) % englishChars;
  const newLetter = newIndex + base;
  return String.fromCharCode(newLetter);
}

// Function To Encrypt The Arabic Letter
function arabicEncryption(char, key) {
  key %= arabicChars;
  const base = 1569;
  const alphabeticIndexing = char.charCodeAt(0) - base;
  const newIndex = (alphabeticIndexing + key) % arabicChars;
  const newLetter = newIndex + base;
  return String.fromCharCode(newLetter);
}

// A Function To Encrypt The Comming Message From The User
function encrypt(text, key) {
  key = Math.abs(key); // to Get The Absolute Value Of The Key Number To Enable Using Nigative Values
  let result = "";
  for (let i = 0; i < text.length; i++) {
    // Check For The English Letters
    if (/[a-zA-Z]/.test(text.charAt(i))) {
      result += englishEncryption(text.charAt(i), key);
    }
    // Check For The Arabic Letters
    else if (text.charAt(i).charCodeAt(0) >= 1569 && text.charAt(i).charCodeAt(0) <= 1610) {
      result += arabicEncryption(text.charAt(i), key);
    }
    // If The Character Is Not Valid
    else {
      result += text.charAt(i);
    }
  }
  return result;
}

// Function To Decrypt The English Letter
function englishDecryption(char, key) {
  key %= englishChars;
  const base = char === char.toUpperCase() ? 65 : 97;
  const alphabeticIndexing = char.charCodeAt(0) - base;
  const newIndex = (alphabeticIndexing - key + englishChars) % englishChars;
  const newLetter = newIndex + base;
  return String.fromCharCode(newLetter);
}

// Function To Decrypt The Arabic Letter
function arabicDecryption(char, key) {
  key %= arabicChars;
  const base = 1569;
  const alphabeticIndexing = char.charCodeAt(0) - base;
  const newIndex = (alphabeticIndexing - key + arabicChars) % arabicChars;
  const newLetter = newIndex + base;
  return String.fromCharCode(newLetter);
}

// A Function To Decrypt The Comming Message From The User
function decrypt(text, key) {
  key = Math.abs(key);
  let result = "";
  for (let i = 0; i < text.length; i++) {
    // Check For The English Letters
    if (/[a-zA-Z]/.test(text.charAt(i))) {
      result += englishDecryption(text.charAt(i), key);
    }
    // Check For The Arabic Letters
    else if (text.charAt(i).charCodeAt(0) >= 1569 && text.charAt(i).charCodeAt(0) <= 1610) {
      result += arabicDecryption(text.charAt(i), key);
    }
    // If The Character Is Not A Valid
    else {
      result += text.charAt(i);
    }
  }
  return result;
}

// Loop On The Input Area, Key Area And The Output Area And Give Them A Session Storage
document.querySelectorAll("[name='input-text'], [name='key'], [name='output-text']")
.forEach(function (el) {
  let storageKey = `session-${el.getAttribute("name")}`;

  if (sessionStorage.getItem(storageKey)) {
    el.value = sessionStorage.getItem(storageKey);
  }

  el.addEventListener("input", (_) =>
    sessionStorage.setItem(storageKey, el.value)
  );
});

// A Function To Convert The Other Languages Numbers To The English Numbers
function toEnglishNumbers(key) {
  let result = "";
  for (let i = 0; i < key.length; i++) {
    if ("٠١٢٣٤٥٦٧٨٩".includes(key.charAt(i))) {
      let englishNumber = key.charAt(i).charCodeAt(0) - 1584;
      result += String.fromCharCode(englishNumber);
    }
    else {
      result += key.charAt(i);
    }
  }
  return result;
}

function getInputs() {
  // Get The Given Text And Key From The User
  let inputFeild = document.querySelector("[name=input-text]").value;
  let key = document.querySelector("[name='key']").value;
  key = toEnglishNumbers(key);
  key = parseInt(key);

  // Show Popup If The Given Key Is Not A Number
  if (isNaN(key)) {
    // Select The Current Theme
    let theme = modeBtnCircle.classList.contains("dark") ? "dark" : "light";
    swal.fire({
      icon: "error",
      title: "Invalid input",
      text: "You can only write numbers on the key field",
      theme: theme
    });
    return;
  }

  // Return The Inputs In An Array
  return [inputFeild, key];
}

// A Function To Encrypt The Comming Message From The User When He Clicks The Encryption Button
function encryptBtn() {
  let inputs = getInputs();
  let encryptedText = encrypt(inputs.at(0), inputs.at(1));
  let outputField = document.querySelector("[name=output-text]");
  outputField.value = encryptedText;
  window.sessionStorage.setItem("session-output-text", encryptedText);
}

// Encrypt The Message When The User Click The Encryption Button
document.getElementById("encrypt").addEventListener("click", encryptBtn);

// A Function To Decrypt The Comming Message From The User When He Clicks The Decryption Button
function decryptBtn() {
  let inputs = getInputs();
  let decryptedText = decrypt(inputs.at(0), inputs.at(1));
  let outputField = document.querySelector("[name=output-text]");
  outputField.value = decryptedText;
  window.sessionStorage.setItem("session-output-text", decryptedText);
}

// Decrypt The Message When The User Click The Decryption Button
document.getElementById("decrypt").onclick = decryptBtn;

// Up Button
let upBtn = document.querySelector(".up")

function handleScroll() {
  console.log(scrollY);
  if (scrollY >= 500) {
    upBtn.classList.add("appear");
    if (window.innerWidth <= 690) {
      if (scrollY >= 895 && scrollY <= 1050) {
        upBtn.classList.add("top-footer");
      }
      else {
        upBtn.classList.remove("top-footer");
      }
    }
    else {
      if (scrollY >= 830 && scrollY <= 980) {
        upBtn.classList.add("top-footer");
      } else {
        upBtn.classList.remove("top-footer");      
      }
    }
  } else {
    upBtn.classList.remove("appear");
  }
}

window.addEventListener("scroll", handleScroll)

function goUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

upBtn.addEventListener("click", goUp);

// Get The Current Year
document.querySelectorAll(".copyright .container span")[1].innerHTML = new Date().getFullYear();