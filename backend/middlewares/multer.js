import multer from "multer";


//creating multer middleware for handling for parsing the form data '

const storage = multer.diskStorage({

    filename :function(re , file , callback){
        callback(null , `${DataTransfer.now}_${file.originalname}`)
    }
})

const upload  = multer({storage});


export default upload;
