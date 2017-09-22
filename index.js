const express = require('express');
const bodyParser= require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended : false}));

app.post('/makePDF', function (req, res) {

    var PDFDocument, doc;
    PDFDocument = require('pdfkit');
    doc = new PDFDocument;

    var myObj = req.body.jsonObject

    var flag = 0
    var currImageString = ''

    for (var i in myObj){
        
        if (myObj[i] == ','){
            var bitmap = new Buffer(currImageString, 'base64');
            fs.writeFileSync("images/photo.jpg", bitmap);

            doc.image('images/photo.jpg', 0, 0, {width: 625, height: 900});
            doc.addPage()

            fs.unlink('./images/photo.jpg',function(err){
                if(err) return console.log(err);
            });

            currImageString = ''
        }

        else if (myObj[i] == '}'){
            flag = 0
            var bitmap = new Buffer(currImageString, 'base64');
            fs.writeFileSync("images/photo.jpg", bitmap);

            doc.image('images/photo.jpg', 0, 0, {width: 625, height: 900});

            fs.unlink('./images/photo.jpg',function(err){
                if(err) return console.log(err);
            });
        }

        else if (flag == 1){
            currImageString += myObj[i]
        }

        else if (myObj[i] == '{'){
            flag = 1
        }

    }

    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.end();

    res.send('hogya bhai')

})

app.listen(5211,function(){
    console.log("Server started on http://localhost:5211");
})