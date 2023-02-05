const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")

const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY


const s3 = new S3Client({ 
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
})

const aws = {
    uploadFile: async (fileName, fileData) => {
        const uploadParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: fileName,
            Body: fileData
        }
        const command = new PutObjectCommand(uploadParams)
        await s3.send(command)
        return `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
    },
    deleteFile: async (fileName) => {
        const deleteParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: fileName
        }
        const command = new DeleteObjectCommand(deleteParams)
        await s3.send(command)
    }
}

module.exports = aws
