from flask import Flask, request, render_template
import cv2
# import pytesseract
import glob
import boto3
import json


with open("pass.json","r")as f:
    data = json.load(f)
    ACCESS_KEY_ID = data["ACCESS_KEY_ID"]
    ACCESS_SECRET_KEY=data["ACCESS_SECRET_KEY"]
#pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

app = Flask(__name__)
textract = boto3.client('textract',
                        aws_access_key_id=ACCESS_KEY_ID,
                        aws_secret_access_key = ACCESS_SECRET_KEY, region_name='us-east-1')
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files.get('file')
        if file:
            # Vérifie que le fichier est une image ou un pdf
            if file.mimetype.startswith('image/') or file.mimetype == 'application/pdf':
                # Enregistrer le fichier
                images = glob.glob("static/images/*")
                number = str(len(images))
                file.save('static/images/'+number+".png")
                image = "static/images/"+number+".png"
                image = cv2.imread(image)

                #text = pytesseract.image_to_string(image)
                with open('static/images/'+number+'.png', 'rb') as file:
                    img_test = file.read()
                    bytes_test = bytearray(img_test)
                response = textract.analyze_document(Document={'Bytes': bytes_test},
                                                    FeatureTypes = ['TABLES'])
                blocks = response['Blocks']
                text = ""
                for block in blocks:
                    if block['BlockType'] == 'WORD':
                        text += block['Text']+" "
                with open("static/results/"+number+".txt", 'w')as f:
                    f.write(text)
                return render_template('image_text.html', image=number, ext="png")
            else:
                return 'Invalid file format. Only accept image or pdf'
    return render_template("form.html")
@app.route("/history", methods=["GET"])
def show_history():
    image_files = glob.glob("static/images/*")
    result_files = glob.glob("static/results/*")
    for i in range(len(result_files)):
        result_files[i] = result_files[i].replace("\\","/")
        image_files[i] = image_files[i].replace("\\","/")
    return render_template("history.html", images = image_files, results = result_files) 
    


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=80)
