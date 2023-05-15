import axios from "axios";

const API_KEY = '34760614-c151dedd5f6572838af89f3cc';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(queryValue = 'house', page = 1, per_page = 12) {
    try {
        const response = await axios.get(
            `${BASE_URL}?key=${API_KEY}&q=${queryValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
}





