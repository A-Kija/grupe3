import { useState } from 'react';

export default function useImage() {

    const [image, setImage] = useState(null);


    const imageReader = img => {
        return new Promise((myResolve, myReject) => {
            const myReader = new FileReader();
            myReader.readAsDataURL(img);
            myReader.onload = _ => myResolve(myReader.result);
            myReader.onerror = error => myReject(error);
        });
    }

    const handleImage = e => {
        const img = e.target.files[0];
        imageReader(img)
        .then(res => setImage(res))
        .catch(error => {
            // console.log(error);
            // setImage(null);
        });
    } 

    const removeImage = _ => {
        setImage(null);
    }

    return {
        image, handleImage, removeImage
    }
}