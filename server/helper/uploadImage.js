import axios from 'axios';

/**
 * @param  {object} data
 * @returns {String} the url of the image
 */
export default function uploadImage(data) {
  return axios
    .post('https://api.cloudinary.com/v1_1/kalel/image/upload', data)
    .then(response => response.data.secure_url)
    .catch((err, res) =>
      res.status(500).send({
        message: 'Error while uploading image'
      }));
}
