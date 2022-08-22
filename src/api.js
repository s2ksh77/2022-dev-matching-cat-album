const API_KEY = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';


export const api = async (url) => {
    try {
      const res = await fetch(url);
      if (res?.ok) {
        const data = await res?.json();
        return data;
      } else {
        const errData = await res?.json();
        throw errData;
      }
    } catch (e) {
      throw {
        message: e.message,
        status: e.status,
      };
    }
};

export const fetchPhoto = async (nodeId) => api(!nodeId ? `${API_KEY}` : `${API_KEY}/${nodeId}`); 
