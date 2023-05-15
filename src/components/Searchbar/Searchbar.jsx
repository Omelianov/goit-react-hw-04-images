import React, { Component } from 'react'
import Select from 'react-select'
import { fetchImages } from '../api'


export class Searchbar extends Component {
    state = {
        images:[]
    }
    async componentDidMount() {
        try {
            const fetchedImages = await fetchImages()
            this.setState({ images: fetchedImages });
        } catch (error) {
            
        }
    }
    render() {
        const options = this.state.images.map(image => {
            return {
                value: image.id,
                label: image.webformatURL,
            };
        });
        console.log(options);

        return <div>
            <Select options={options} onChange={option => {
                console.log(option);
            }} />

        </div>
    }
}