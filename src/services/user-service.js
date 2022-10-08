import axios from "../services/axios";
import * as constants from "../constants";

export const loginService = async (credentials) => {

    const response = await axios.post(constants.LOGIN_URL, credentials);
    return response;
};

export const signupService = async (values) => {
    
    const response = await axios.post(constants.SIGNUP_URL, values);
    return response; 
}