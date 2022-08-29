const express = require("express");
const router = express.Router();
const multer = require("multer");
var fs = require('fs');

router.post('/uploadfiles', (req, res) => {

    let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");	// 콜백 함수로 업로드 파일의 저장 위치를 설정한다.
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);	// 콜백 함수로 파일이 저장될 때 이름을 설정한다.
    },
    fileFilter: (req, file, cb) => {	// 파일 필터로 여기서는 파일의 확장자가 .png 혹은 .jpg 인 이미지 파일만 저장되도록 하였다.
            const ext = path.extname(file.originalname);
            if(ext !== '.png' || ext !== '.jpg'){
                return cb(res.status(400).end('only png, jpg are allowed'), false);
            } 
            cb(null, true);
        }
    });

    const upload = multer({ storage: storage }).single("file");

    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err});
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.fileName });
    })

})

router.get('/getimg/uploads/:uri', (req, res) => {
    const filePath = `/../uploads/${req.params.uri}`
    // fs.readFile(filePath, (err, data) => {
    // if(err) { res.send('No Such File of Directory') }
    // // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.send(data)
    var path = require('path');
    res.sendFile(path.resolve(__dirname + filePath));
//   })
})
module.exports = router;