var icon = document.getElementById('icon');
var list = document.getElementById('list');

icon.onclick = function ()
{
  if (list.style.display === "none")
  {
    list.style.display = "block";
  }
  else
  {
    list.style.display = "none";
  }
}

function encrypt(text, key)
{
  key = Math.abs(key) % 26;
  let result = "";
  for (let i = 0; i < text.length; i++)
  {
    if (/[a-zA-Z]/.test(text.charAt(i)))
    {
      const base = (text.charAt(i) === text.charAt(i).toUpperCase()) ? 65 : 97;
      const alphabeticIndexing = text.charAt(i).charCodeAt(0) - base;
      const before = (alphabeticIndexing + key) % 26;
      const after = before + base;
      result += String.fromCharCode(after);
    }
    else
    {
      result += text.charAt(i);
    }
  }
  return result;
}

function decrypt(text, key)
{
  key = Math.abs(key) % 26;
  let result = "";
  for (let i = 0; i < text.length; i++)
  {
    if(/[a-zA-Z]/.test(text.charAt(i)))
    {
      const base = (text.charAt(i) === text.charAt(i).toUpperCase()) ? 65 : 97;
      const alphabeticIndexing = text.charAt(i).charCodeAt(0) - base;
      const before = (alphabeticIndexing - key + 26) % 26;
      const after = before + base;
      result += String.fromCharCode(after);
    }
    else 
    {
      result += text.charAt(i);
    }
  }
  return result;
}

var encryptButton = document.getElementById('encrypt');
var decryptButton = document.getElementById('decrypt');
var inputTextElement = document.getElementById('inputText');
var outputTextElement = document.getElementById('outputText');
var key = document.getElementById('key');

encryptButton.onclick = function()
{
  var inputText = inputTextElement.value;
  var keyValue = parseInt(key.value);
  if (isNaN(keyValue))
  {
    alert("Invalid Input");
  }
  var encryptedText = encrypt(inputText, keyValue);
  outputTextElement.value = encryptedText;
}

decryptButton.onclick = function()
{
  var inputText = inputTextElement.value;
  var keyValue = parseInt(key.value);
  if (isNaN(keyValue))
    {
      alert("Invalid Input");
    }
  var decryptedText = decrypt(inputText, keyValue);
  outputTextElement.value = decryptedText;
}