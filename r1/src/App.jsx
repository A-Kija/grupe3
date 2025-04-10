import './App.css';
import { useEffect, useState } from 'react';
import Create from './Components/inv/Create';
import List from './Components/inv/List';
import { store, read, update, destroy } from './Components/inv/ls';


const KEY = 'invoices';

function App() {

    const [dataStore, setDataStore] = useState(null); //CRUD store
    const [dataRead, setDataRead] = useState(null); //CRUD read

    useEffect(_ => {

        setDataRead(read(KEY));

    }, []);


    useEffect(_ => {
        if (null === dataStore) {
            return;
        }
        store(KEY, dataStore);

    }, [dataStore]);


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                            <div className="container-fluid">
                                <a className="navbar-brand">Practical Invoices Systems</a>
                                <div className="collapse navbar-collapse">
                                    <div className="navbar-nav">
                                        {/* <a className="nav-link">Features</a>
                                        <a className="nav-link">Pricing</a> */}
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6"><Create setDataStore={setDataStore} /></div>
                    <div className="col-6"><List dataRead={dataRead} /></div>
                </div>
            </div>
        </>
    );
}

export default App;