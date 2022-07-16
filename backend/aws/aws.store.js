import aws from 'aws-sdk'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

const { S3 } = aws

const magic = {
  jpg: 'ffd8ffe0',
  png: '89504e47',
}

const s3 = new S3({
  accessKeyId: process.env.AWSACCESSKEYID,
  secretAccessKey: process.env.AWSACCESSKEY
})

const params = {
  Bucket: process.env.AWSS3BUCKET
}

export const prepareAWSBucket = () => {
  s3.createBucket(params, (err, data) => {
    if (err) {
      console.log(err, err.stack)
    } else {
      console.log('Bucket created successfully', data.Location)
    }
  })
}

export const uploadFile = (fileName) => {
  const content = fs.readFileSync(fileName)

  //console.log(Object.keys(magic).find(key => content.toString('hex', 0, 4).startsWith(magic[key])))

  const params = {
    Bucket: process.env.AWSS3BUCKET,
    Key: uuidv4() + Object.keys(magic).find(key => magic[key].startsWith(content)),
    Body: content
  }

  // s3.upload(params, (err, data) => {
  //   if (err) {
  //     throw err
  //   }
  //   console.log(`file uploaded successfully ${data.Location}`)
  // })
}

export default { 
  prepareAWSBucket,
  uploadFile
}
