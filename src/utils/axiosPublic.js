import axios from "axios";

export const getData = async (path) => {
  try {
    const { data } = await axios(`${path}`);
    return data;
  } catch (err) {
    console.err(err);
    throw err;
  }
};

export const postData = async (url, payload) => {
  try {
    const res = await axios.post(url, payload);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
