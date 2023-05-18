import axios from "axios";


export async function fetchImages(text, page) {
    const searchParams = new URLSearchParams ({
        key: '34760614-c151dedd5f6572838af89f3cc',
        q: text,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 12,
        page,
    });
    const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);
    return images.data;
};



