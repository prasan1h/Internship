const login_btn = document.getElementById("login-btn");
const sign_msg = document.getElementById("sign-msg");
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const form_name = document.getElementById("formName");
const form_password = document.getElementById("formPassword");
const submit_p = document.getElementById('submit-p');

let yescount = 0;
let nocount = 0;
login_btn.onclick = function(){
    console.log("login-btn clicked");
    console.log(document.getElementById("btn"));
}

window.addEventListener("load", function(){
  console.log("hi");
});


function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

yesBtn.onclick = function(){
    yescount++;
    if(yescount == 1){yesBtn.innerHTML = 'I knew it, Get lost'}
    if(yescount == 2){yesBtn.innerHTML = 'click on "No"'}
    if(yescount == 3){yesBtn.innerHTML = 'ok, Byee!!'}
}

noBtn.onclick = function(){
  nocount++;
  if(nocount == 1){noBtn.innerHTML = 'dont click here if you dont want to signup'}
  if(nocount == 2){window.location.href ="http://127.0.0.1:5501/worst-ui/signin.html";}
}

