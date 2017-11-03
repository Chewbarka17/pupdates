import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer } from 'buffer';
import awsmobile from '../../../../../config/aws-exports';

/**
  Save user images to Amazon S3.

  @param AWS credentials, an id, an image to upload, and a callback
  @return AWS S3 obj
*/
const uploadProfilePicture = (awsSauce, id, image, callback) => {
  const s3 = new AWS.S3({
    accessKeyId: awsSauce.accessKeyId,
    secretAccessKey: awsSauce.secretAccessKey,
    sessionToken: awsSauce.sessionToken
  });

  photoKey = 'public/' + id + '/' + image.filename;
  RNFetchBlob.fs.readFile(image.path, 'base64').then(data => {
    let buf = Buffer.from(data, 'base64');
    const params = {
      Bucket: awsmobile.aws_user_files_s3_bucket,
      Key: photoKey,
      ACL: 'public-read',
      ContentType: image.mime,
      Body: buf,
    }

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('could not upload profile pic to s3', err);
        callback(err);
      }
      callback(null, data);
    });
  }).catch(err => {
    console.log('Could not read file', err);
  });
}

export default uploadProfilePicture;