import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials: true,
    headers: {
        'Content-Type':"application/json"
    },
});
export const createDoctor = async (data) => {
    try {
      const response = await api.post("/doc/doctors", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error in createDoctor:", error);
      return error.response;
    }
  };
  
// export const createDoctor = async({data}) => {
//     let response;
//     try{
//         response = await api.post('/doc/doctors',data,{
//             headers: {
//                 "Content-Type": "multipart/form-data", // Necessary for FormData
//             },
//         });
//     }
//     catch(error){
//         return error;
//     }
//     return response;
// }
export const visitDoctor = async() => {
    let response;
    try {
        // Make a GET request to fetch the doctor by ID
        response = await api.get(`/doc/getalldoctors`);
    } catch (error) {
        // Handle error and return it
        return error;
    }
    return response;
}
export const delDoctor = async(id) => {
    let response;
    try {
        // Make a GET request to fetch the doctor by ID
        response = await api.delete(`/doc/deletedoctor/${id}`);
    } catch (error) {
        // Handle error and return it
        return error;
    }
    return response;
}
export const updatingDoctor = async(id) => {
    let response;
    try {
        // Make a GET request to fetch the doctor by ID
        response = await api.put(`/doc/updatedoctor/${id}`);
    } catch (error) {
        // Handle error and return it
        return error;
    }
    return response;
}
export const login = async(data) => {
    let response;
    try{
        response = await api.post('/api/login',data);
    }
    catch(error){
        return error.message;
    }
    return response;
}

export const signup = async(data) => {
    let response;
    try{
        response = await api.post('/api/users',data);
    }
    catch(error){
        return error;
    }
    return response;
}

export const signout = async() => {
    let response;
    try {
        response = await api.post('/api/logout');
        localStorage.removeItem('adminAuth'); // Remove from localStorage
    } catch (error) {
        return error;
    }
    return response;
}

export const googleAuthLogin = (code) => api.get(`/api/google-login?code=${code}`);
export const googleAuthRegister = (code) => api.get(`/api/google-register?code=${code}`);