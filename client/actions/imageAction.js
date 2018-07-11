import axios from 'axios';
import * as actionTypes from './types';
import { addCenter, modifyCenter } from './centerActions';
import { updateUserDetails } from './userActions';

/**
 * @param {object} info
 * @param {object} image'0-=
 * @param {object} type
 * @returns {object} url of image uploaded
 */
export default function uploadImage(info, image, type) {
  console.log(info, image, type, '@@@@@@@@@@@@@@@@@@')
  return (dispatch) => {
    dispatch({ type: actionTypes.ADD_IMAGE });
    delete axios.defaults.headers.common['x-access-token'];
    return axios
      .post('https://api.cloudinary.com/v1_1/kalel/image/upload', image)
      .then((response) => {
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
        info.imageUrl = response.data.secure_url;
        dispatch({ type: actionTypes.ADD_IMAGE_SUCCESS });
        if (type === 'center') {
          dispatch(addCenter(info));
        } else if (type === 'modify-center') {
          dispatch(modifyCenter(info));
        } else {
          dispatch(updateUserDetails(info));
        }
      })
      .catch((err) => {
        const { data } = err.response;
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
        dispatch({
          type: actionTypes.ADD_IMAGE_FAILS,
          payload: data
        });
      });
  };
}
