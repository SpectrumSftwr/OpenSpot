const API_URL = process.env.REACT_APP_API_URL 
  ? process.env.REACT_APP_API_URL 
  : "http://localhost:5000";

const MODE = process.env.REACT_APP_MODE;

if (!API_URL && MODE == 'production') {
  throw new Error("Unable to get base api url");
}

export const BASE_URL = API_URL;

