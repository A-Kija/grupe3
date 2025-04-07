import { useState } from 'react';
import './App.css';
import './Components/050/forms.scss';
import useImage from './Components/052/useImage';
import useLocalStorage from './Components/052/useLocalStorage';


function App() {

    const { image, handleImage, removeImage } = useImage();
    const [title, setTitle] = useState('');
    const [ save, clear, data ] = useLocalStorage();

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
                    <button className="green">save</button>
                    <button className="red">clear</button>
                </div>
            </fieldset>

        </>
    );
}

export default App;