var uploadForm = document.getElementById("upload-form");

uploadForm.addEventListener("dragover", function(event) {
    event.preventDefault();
    event.stopPropagation();
    uploadForm.classList.add("dragover");
});

uploadForm.addEventListener("dragleave", function(event) {
    event.preventDefault();
    event.stopPropagation();
    uploadForm.classList.remove("dragover");
});

uploadForm.addEventListener("drop", function(event) {
    event.preventDefault();
    event.stopPropagation();
    uploadForm.classList.remove("dragover");
    var file = event.dataTransfer.files[0];
    document.getElementById("file").files = file;
});
var fileInput = document.getElementById("file");
var previewImg = document.getElementById("preview-img");

fileInput.addEventListener("change", function() {
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        previewImg.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        previewImg.src = "";
    }
});