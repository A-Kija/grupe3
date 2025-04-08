import { useEffect, useState } from 'react';
import './App.css';
import './Components/050/forms.scss';
import useImage from './Components/052/useImage';
import useLocalStorage from './Components/052/useLocalStorage';


function App() {

    const { image, handleImage, removeImage, setImage } = useImage();
    const [title, setTitle] = useState('');
    const [save, clear, data] = useLocalStorage('titleImage');

    useEffect(_ => {
        if (null === data) {
            return;
        }
        // setTimeout(_ => {
        setTitle(data.title);
        setImage(data.image);
        // }, 2000);

    }, [data, setTitle, setImage]);

    const saveToLocalStorage = _ => {
        save({
            title: title,
            image: image
        });
    }

    const clearLocalStorage = _ => {
        removeImage();
        setTitle('');
        clear();
    }

    return (
        <>
            <h1>File & Local Storage</h1>
            <fieldset>
                <legend>IMAGE & TITLE</legend>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="file" onChange={handleImage} id="nice-image" />
                {
                    image === null
                        ?
                        <span>no image</span>
                        :
                        <div className="form-image">
                            <img src={image} alt="My picture" />
                        </div>
                }
                <div>
                    <label htmlFor="nice-image">add image</label>
                    <label onClick={removeImage}>-</label>
                </div>
                <div>
                    <button className="green" onClick={saveToLocalStorage}>save</button>
                    <button className="red" onClick={clearLocalStorage}>clear</button>
                </div>
            </fieldset>

        </>
    );
}

export default App;