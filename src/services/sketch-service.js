import axios from "./axios";
import * as constants from "../constants";

export const saveSketch = async (imgData, token) => {
    
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(constants.SKETCH_SAVE_URL, imgData, config);

    return response;
}