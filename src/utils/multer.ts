import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as aws from 'aws-sdk';
// import { Request } from 'express';
import 'dotenv/config';

// aws.config.update({
//   "accessKeyId": process.env.S3_ACCESS_ID,
//   "secretAccessKey": process.env.S3_SECRET_KEY,
//   "region": process.env.S3_REGION
// })

// const s3 = new aws.S3();

// export const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     bucket: 'code-high-image',
//     acl: 'public-read',
//     key: (req: Request, file, cb) => {
//       cb(null, Date.now() + '.' + file.originalname.split('.').pop());
//     }
//   }),
//   limits: { fileSize: 1000 * 1000 * 10 }
// });