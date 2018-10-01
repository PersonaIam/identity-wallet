// import axios from 'axios';
//
// const http = axios.create({
//   baseURL: `${API_URL}/api`,
// });
//
// http.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error && error.response && error.response.data) {
//       return Promise.reject(error.response.data.message ? error.response.data.message : error.response.data);
//     } else {
//       return Promise.reject({ message: 'Server error' });
//     }
//   }
//   );
//
// export default http;
