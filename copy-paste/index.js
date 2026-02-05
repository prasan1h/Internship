const txt = document.getElementById('content');
const op = document.getElementById('output');
const btn = document.getElementById('btn');
const btnp = document.getElementById('btnp');
const btnn = document.getElementById('btnn');
const dataOp = document.getElementById('data-output');
const paste = document.getElementById('paste');
var data = '';

txt.onchange = function() {
    data = this.value;
}

btn.onclick = function() {
    window.navigator.clipboard.writeText(data);
}

btnp.onclick = function() {
   navigator.clipboard.readText(data).then(txt => {
        paste.value += data;
    });
}

btnn.onclick = function() {
   navigator.clipboard.readText(data).then(txt => {
        paste.value = data;
    });
}