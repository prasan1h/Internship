const txt = document.getElementById('content');
const op = document.getElementById('output');
const btn = document.getElementById('btn');
const dataOp = document.getElementById('data-output');
const paste = document.getElementById('paste');
var data = '';

txt.onchange = function() {
    data = this.value;
    window.navigator.clipboard.readText(data)
}

btn.onclick = function() {
    console.log("d : ",data);
    window.navigator.clipboard.writeText(data);
}