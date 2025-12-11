
const pub = 65537;
const mod = 9045231;
const priv = 5548337;

function enc(text) {
  
    let out = "";
  
  for (let i = 0; i < text.length; i++) {
 
    let c = text.charCodeAt(i);
  
    let e = 1;
 
    let base = c;
  
    
    let exp = pub;
    while (exp) {
      if (exp & 1) e = (e * base) % mod;
   
      
      base = (base * base) % mod;
      exp >>= 1;
    }
    out += e.toString(36) + " ";
  }
  return out.trim();
}

function dec(cipher) {
  let out = "";
  
  let parts = cipher.split(" ");
  for (let p of parts) {
    if (!p) continue;
    let c = parseInt(p, 36);
    
    let e = 1;
   
    let base = c;
   
    let exp = priv;
  
    while (exp) {
      if (exp & 1) e = (e * base) % mod;
   
      base = (base * base) % mod;
    
      exp >>= 1;
    
    }
    
    out += String.fromCharCode(e);
  }
  return out;
}

function sendA() {

  let msg = document.getElementById("msgA").value.trim();
  
  if (!msg) return;
  
  let encrypted = enc(msg);
//   console.log(encrypted)

  addEnc("A to B", encrypted);
  
  setTimeout(() => addMsg("chatB", "Person A", msg), 700);
 
  document.getElementById("msgA").value = "";
}

function sendB() {
  let msg = document.getElementById("msgB").value.trim();
 
  if (!msg) return;
 
  let encrypted = enc(msg);
  console.log(encrypted)
  addEnc("B to A", encrypted);

  setTimeout(() => addMsg("chatA", "Person B", msg), 700);
  document.getElementById("msgB").value = "";
}

function addEnc(dir, data) {
  let div = document.createElement("div");
 
  div.className = "enc";
 
  div.innerHTML = `<b>${dir} (encrypted):</b><br>${data.slice(0,140)}...`;
 
  document.getElementById("chatA").appendChild(div.cloneNode(true));

  document.getElementById("chatB").appendChild(div.cloneNode(true));
 
  div.scrollIntoView();
}

function addMsg(chatId, from, text) {
 
    let div = document.createElement("div");
  
    div.className = "msg";
  div.innerHTML = `<b>${from}:</b> ${text}`;
 
  document.getElementById(chatId).appendChild(div);
  
  div.scrollIntoView({behavior:"smooth"});
}



window.sendA = sendA;
window.sendB = sendB;