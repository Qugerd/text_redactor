function insertImage() {
    const imageInput = document.getElementById("image-input");
    imageInput.value = "";
    imageInput.style.display = "block";
    imageInput.accept = "image/*"; // Разрешить выбор изображений
    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];
        if (file) {
            // Определите URL для изображения и создайте элемент <img>
            const imageUrl = URL.createObjectURL(file);
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.alt = "Изображение";
            imgElement.className = "inserted-image";
            // Вставьте изображение в редактируемую область
            document.getElementById("text-editor").appendChild(imgElement);
            imageInput.style.display = "none";
        }
    });
    imageInput.click();
}


function toggleBold(){
    document.execCommand("bold", false, null); // Включить или выключить жирное форматирование
}

function toggleItalic(){
    document.execCommand("italic", false, null); // Включить или выключить форматирование курсивного текста
}

function toggleUnderline(){
    document.execCommand("underline", false, null); // Включить или выключить форматирование подчекнутого текста
}

function changeFontSize(){
    const fontSizeSelector = document.getElementById("font-size-selector");
    const selectedFontSize = fontSizeSelector.value;
    document.execCommand("fontSize", false, selectedFontSize);
}

function changeTextColor(){
    const textColorInput = document.getElementById("color-input");
    const color = textColorInput.value;
    document.execCommand("foreColor", false, color);
}


function increaseFontSize(){
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        const $selectedElement = $('<span>').html(selectedText);
        $selectedElement.css('font-size', '1px'); // Устанавливаем начальный размер шрифта
        $selectedElement.css('font-size', function (index, value) {
            return (parseFloat(value) + 1) + 'px'; // Увеличиваем размер на 1px
        });
        window.getSelection().getRangeAt(0).deleteContents();
        window.getSelection().getRangeAt(0).insertNode($selectedElement[0]);
    }
}

function changeLineHeight(){
    var value = document.getElementById("line-height").value

    // Получаем первый диапазон (если есть несколько выделенных фрагментов)
    var range = window.getSelection().getRangeAt(0);


    // var currnetParent = range.commonAncestorContainer.parentNode.parentNode.tagName;
    var currnetParent = range.commonAncestorContainer;

    var fragment = range.extractContents();
    console.log(fragment);

    if (currnetParent.tagName === "SPAN"){
        console.log(currnetParent);
        console.log('обернут в тег <span>.');
        currnetParent.style.lineHeight = value;
        currnetParent.appendChild(fragment)

    }
    else{
        // Создаем элемент <span>
        var span = document.createElement('span');
        span.style.lineHeight = value
        console.log(currnetParent);
        console.log('не обернут в тег <span>.');
        span.appendChild(fragment);
        range.insertNode(span);
    }
}


function rightIndent(){
    document.execCommand("indent", false, null)
}

function leftIndent(){
    document.execCommand("outdent", false, null);
}

function toggleFont(){
    var fontName = document.getElementById("font-selector").value
    document.execCommand("fontName", false, fontName);
}

function insertLink(){
    var link = prompt("Введите ссылку !")
    if (link){
        document.execCommand("createLink", false, link);
    }
}



function check(){
    var range = window.getSelection().getRangeAt(0);
    console.log(window.getSelection().rangeCount);


    var startNode = range.startContainer;
    console.log(startNode);

    var endNode = range.endContainer;
    console.log(endNode);


    var currentNode = range.commonAncestorContainer ;
    console.log(currentNode);
    // $(currentNode).contents().unwrap();
}



function saveFile(){
    var content = document.getElementById("text-editor").innerHTML;
    console.log(content)
    eel.save_file(content)()
}




document.getElementById("text-editor").addEventListener("click", function(event) {
    if (event.target.tagName === "A") {
        event.preventDefault(); // Предотвращаем переход по ссылке по умолчанию
        const url = event.target.getAttribute("href");
        window.open(url, "_blank"); // Открываем ссылку в новой вкладке
    }
});


var pageCount = 1

document.addEventListener('DOMContentLoaded', function() {
    var containerTextInput = document.getElementById('conteiner-text-input');
    var textEditor = document.querySelector('.text-field');
    
    function createNewPage() {
        // Create a new page (in this example, just appending a new div)
        var newPage = document.createElement('div');
        newPage.classList.add('text-field');
        newPage.contentEditable = true;

        var conteinerPage = document.createElement('div')
        conteinerPage.classList.add('conteiner-page')
        conteinerPage.appendChild(newPage)

        pageCount = pageCount + 1
        var numberPage = document.createElement('div')
        numberPage.innerHTML = pageCount
        numberPage.classList.add('number-page')
        conteinerPage.appendChild(numberPage)

        containerTextInput.appendChild(conteinerPage);

        console.log(newPage.scrollHeight)
        console.log(newPage.clientHeight)
    
        // Attach the input event listener to the new page
        newPage.addEventListener('input', function() {
            if (newPage.scrollHeight > newPage.clientHeight) {
                // If the content height is still greater, create another new page
                createNewPage();
            }
        });
    }
    
    textEditor.addEventListener('input', function() {
        if (textEditor.scrollHeight  > textEditor.clientHeight) {
            createNewPage();
        }
    });
});


function DefaultStyle(){
    document.execCommand("fontName", false, 'Arial');
    document.execCommand("fontSize", false, 5);
    document.execCommand("foreColor", false, 'black');
}

function OpenPopUp(){
    var x = document.getElementById('pop-conteiner')
    x.classList.add('open')
}

function ClosePopUp(){
    var x = document.getElementById('pop-conteiner')
    x.classList.remove('open')
}

function CreateBtnStyle(){
    var conteinerStyle = document.getElementById('conteiner-style')

    var nameStyle = document.getElementById('nameStyle').value

    var nameFont = document.getElementById('nameFont').value

    var sizeFont = document.getElementById('sizeFont').value

    var colorFont = document.getElementById('sizeFont').value
    console.log(colorFont)

    var boldCheck = document.getElementById('boldCheck').value

    var italicCheck = document.getElementById('italicCheck').value

    var underlineCheck = document.getElementById('underlineCheck').value

    var newBtn = document.createElement('button')
    newBtn.innerHTML = nameStyle
    newBtn.classList.add('btn-style')
    newBtn.onclick = function(){
        btnStyle(nameFont, sizeFont, colorFont, boldCheck, italicCheck, underlineCheck)
    }

    var lastChild = conteinerStyle.lastElementChild

    conteinerStyle.insertBefore(newBtn, lastChild)
}

function btnStyle(nameFont, sizeFont, colorFont, boldCheck){
    document.execCommand("fontName", false, nameFont);
    document.execCommand("fontSize", false, sizeFont);
    document.execCommand("foreColor", false, colorFont);
    document.execCommand("bold", false, boldCheck);
    document.execCommand("italic", false, italicCheck);
    document.execCommand("underline", false, underlineCheck);
}

