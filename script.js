const passwordOutput = document.getElementById("passwordOutput");
const passwordLength = document.getElementById("passwordLength");
const lengthValue = document.getElementById("lengthValue");
const includeUppercase = document.getElementById("includeUppercase");
const includeLowercase = document.getElementById("includeLowercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const copiedFeedback = document.createElement("div");
copiedFeedback.className = "copied-feedback";
copiedFeedback.textContent = "COPIADO!";
document.querySelector(".container").appendChild(copiedFeedback);

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_-+=<>?/{}[]|";

passwordLength.addEventListener("input", () => {
  lengthValue.textContent = passwordLength.value;
});

function generatePassword() {
  let chars = "";
  let generatedPassword = "";
  const length = parseInt(passwordLength.value);

  if (includeUppercase.checked) chars += uppercaseChars;
  if (includeLowercase.checked) chars += lowercaseChars;
  if (includeNumbers.checked) chars += numberChars;
  if (includeSymbols.checked) chars += symbolChars;

  if (includeUppercase.checked) {
    generatedPassword +=
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  }
  if (includeLowercase.checked) {
    generatedPassword +=
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  }
  if (includeNumbers.checked) {
    generatedPassword +=
      numberChars[Math.floor(Math.random() * numberChars.length)];
  }
  if (includeSymbols.checked) {
    generatedPassword +=
      symbolChars[Math.floor(Math.random() * symbolChars.length)];
  }

  if (chars.length === 0) {
    passwordOutput.value = "Selecione pelo menos um tipo de caractere!";
    generateBtn.disabled = true;
    copyBtn.disabled = true;
    return;
  }

  for (let i = generatedPassword.length; i < length; i++) {
    generatedPassword += chars[Math.floor(Math.random() * chars.length)];
  }

  if (generatedPassword.length > length) {
    generatedPassword = generatedPassword.substring(0, length);
  }

  generatedPassword = generatedPassword
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  passwordOutput.value = generatedPassword;
  copyBtn.disabled = false;
}

async function copyPassword() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(passwordOutput.value);
      copiedFeedback.classList.add("show");
      setTimeout(() => {
        copiedFeedback.classList.remove("show");
      }, 1200);
    } catch (err) {
      console.error("Falha ao copiar (Clipboard API):", err);
      fallbackCopyTextToClipboard();
    }
  } else {
    fallbackCopyTextToClipboard();
  }
}

function fallbackCopyTextToClipboard() {
  passwordOutput.select();
  passwordOutput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  copiedFeedback.textContent = "COPIADO (Fallback)!";
  copiedFeedback.classList.add("show");
  setTimeout(() => {
    copiedFeedback.classList.remove("show");
    copiedFeedback.textContent = "COPIADO!"; // Reseta o texto
  }, 1500);
}

function updateGenerateButtonState() {
  const anyCheckboxChecked =
    includeUppercase.checked ||
    includeLowercase.checked ||
    includeNumbers.checked ||
    includeSymbols.checked;
  generateBtn.disabled = !anyCheckboxChecked;
}

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

const checkboxes = [
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
];
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateGenerateButtonState);
});

document.querySelectorAll(".checkbox-group").forEach((group) => {
  group.addEventListener("click", (event) => {
    if (event.target === group) {
      const checkbox = group.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event("change"));
      }
    }
  });
});

copyBtn.disabled = true;
updateGenerateButtonState();
