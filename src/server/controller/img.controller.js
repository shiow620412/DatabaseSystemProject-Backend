import imgModule from "../module/img.module.js";
import imgur from 'imgur-node-api';
import multer  from 'multer';
const upload = multer({ dest: 'img_temp/' })
const IMGUR_CLIENT_ID = "df0e1d6a465c8dc"

const uploadImg = (req, res, next) => {
        const { file } = req
    if (file) {
        // 設定 app ID
        imgur.setClientID(IMGUR_CLIENT_ID)
        // 取得檔案目錄，上傳至 imgur
        imgur.upload(file.path, (err, image) => {
            if (err) return console.error(err)
        // 連結放在 image.data.link 裡
        // do something
        res.send(image.data.link)
    })
    } else {
    // 沒有上傳圖片
        console.log("上傳失敗")
    }
    }
export default
{
    uploadImg
}