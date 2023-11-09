import axios from 'axios';

export interface ResponseError {
  errorCode: number;
  details: string;
}

export const uploadApiInstance = axios.create({
  baseURL: process.env.MFE_SCORM_REST_API_URL,
  headers: { Authorization: `Bearer ${window.localStorage.getItem('token')}` },
  responseType: 'json',
});

export const importStudentsApiInstance = axios.create({
  baseURL: process.env.MFE_IMPORT_STUDENTS_API_URL,
  responseType: 'json',
});

importStudentsApiInstance.interceptors.request.use((req) => {
  if (req.headers) {
    req.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
  }
  return req;
});
// TODO: Добавить сюда обработку ошибок сети и ошибок где нет стандартизованного ответа
// authApiInstance.interceptors.response.use(undefined, (error) => {
//   const { status, data } = error?.response ?? {};
//
//   const errorCode = data?.errorCode || status;
//
//   const responseError: ResponseError = {
//     errorCode,
//     details: data.message,
//   };
//
//   return Promise.reject(responseError);
// });
