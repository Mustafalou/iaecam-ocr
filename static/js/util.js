// var uploadForm = document.getElementById("upload-form");

// uploadForm.addEventListener("dragover", function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     uploadForm.classList.add("dragover");
// });

// uploadForm.addEventListener("dragleave", function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     uploadForm.classList.remove("dragover");
// });

// uploadForm.addEventListener("drop", function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     uploadForm.classList.remove("dragover");
//     var file = event.dataTransfer.files[0];
//     document.getElementById("file").files = file;
// });
// var fileInput = document.getElementById("file");
// var previewImg = document.getElementById("preview-img");

// fileInput.addEventListener("change", function() {
//     var file = fileInput.files[0];
//     var reader = new FileReader();

//     reader.onloadend = function() {
//         previewImg.src = reader.result;
//     }

//     if (file) {
//         reader.readAsDataURL(file);
//     } else {
//         previewImg.src = "";
//     }
// });
// var loadFile = function(event) {
    
//     if (file.type.match('image.*')) {
//         var img = document.createElement("img");
//         img.src = URL.createObjectURL(file);
//         img.onload = function() {
//             URL.revokeObjectURL(img.src);
//         }
//         document.getElementById("output").appendChild(img);
//     } else if (file.type === 'application/pdf') {
//         var iframe = document.createElement("iframe");
//         iframe.src = URL.createObjectURL(file);
//         document.getElementById("output").appendChild(iframe);
//     } else {
//         console.log("Invalid file type");
//     }
// };


var loadFile = function(event) {
    var file = event.target.files[0];
    var outputpdf = document.getElementById('outputpdf');
     var outputimg = document.getElementById('outputimage');
    if (file.type.match('image.*')){
   
    outputimg.src = URL.createObjectURL(event.target.files[0]);
    outputimg.hidden = false
    outputpdf.hidden= true
    outputimg.onload = function() {
      URL.revokeObjectURL(outputimg.src) // free memory
    }

    }
    
    else if (file.type === 'application/pdf'){
    
    outputpdf.src = URL.createObjectURL(event.target.files[0]);
    outputpdf.hidden = false
    outputimg.hidden= true
    outputpdf.onload = function() {
    URL.revokeObjectURL(outputimg.src) // free memory
        
    }
   
  }}
