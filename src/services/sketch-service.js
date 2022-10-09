import axios from "../services/axios";
import * as constants from "../constants";

export const saveSketch = async (imgData, token) => {
    
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
  
    const response = await axios.post(constants.SKETCH_SAVE_URL, {imgData}, config);

    return response;
}