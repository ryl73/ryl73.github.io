const upperCaseBtn = document.getElementById("upper-case");
const lowerCaseBtn = document.getElementById("lower-case");
const properCaseBtn = document.getElementById("proper-case");
const sentenceCaseBtn = document.getElementById("sentence-case");
const saveBtn = document.getElementById("save-text-file");

const download = (filename, text) => {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const mouseOver = (id) => {
    document.getElementById(id).style.background = 'orange';
}

const mouseOut = (id) => {
    document.getElementById(id).style.background = '';
}

upperCaseBtn.addEventListener("click", () => {
    let text = document.getElementById("textarea").value;
    document.getElementById("textarea").value = text.toUpperCase();
});

lowerCaseBtn.addEventListener("click", () => {
    let text = document.getElementById("textarea").value;
    document.getElementById("textarea").value = text.toLowerCase();
});

properCaseBtn.addEventListener("click", () => {
    let text = document.getElementById("textarea").value;
    text = text.toLowerCase();
    text = text.replace(/(^|\s)\S/g, (a) => { return a.toUpperCase()});
    document.getElementById("textarea").value = text;
});

sentenceCaseBtn.addEventListener("click", () => {
    let text = document.getElementById("textarea").value;
    text = text.toLowerCase();
    text = text.replace(/(^|\.\s)\S/g, (a) => { return a.toUpperCase()});
    document.getElementById("textarea").value = text;
});

saveBtn.addEventListener("click", () => {
    let text = document.getElementById("textarea").value;
    download("text.txt", text);
});
