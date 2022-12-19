
const BASE_URL = 'https://randomuser.me/api/';


const get = async (endpoint) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return await response.json();
};

export const apiProvider = {
    get
};
