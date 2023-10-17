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
