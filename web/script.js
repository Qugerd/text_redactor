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

function saveFile(){
    var content = document.getElementById("text-editor").innerHTML;
    console.log(content)
    eel.save_file(content)()
}


