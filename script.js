const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");    
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        
        if (x >= 8 && x <= 36) {
            e.target.classList.toggle("checked");
            saveData();
        } else {
            makeEditable(e.target);
        }
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function makeEditable(li) {
    if (li.isContentEditable || li.querySelector('input')) {
        return;
    }
    
    const span = li.querySelector('span');
    const currentText = li.textContent.replace(span.textContent, '').trim();
    
    const originalHTML = li.innerHTML;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = '80%';
    input.style.border = 'none';
    input.style.outline = 'none';
    input.style.backgroundColor = 'transparent';
    input.style.fontSize = 'inherit';
    input.style.fontFamily = 'inherit';
    
    li.innerHTML = '';
    li.appendChild(input);
    li.appendChild(span);
    
    input.focus();

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            finishEditing();
        } else if (e.key === 'Escape') {
            li.innerHTML = originalHTML;
        }
    });
    
    input.addEventListener('blur', finishEditing);
    
    function finishEditing() {
        const newText = input.value.trim();
        if (newText) {
            li.innerHTML = newText;
            li.appendChild(span);
            saveData();
        } else {
            li.innerHTML = originalHTML;
        }
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}