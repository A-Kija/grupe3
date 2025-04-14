import './App.css';
import { useEffect, useState } from 'react';
import Create from './Components/inv/Create';
import List from './Components/inv/List';
import { store, read, update, destroy } from './Components/inv/ls';
import Delete from './Components/inv/Delete';
import Edit from './Components/inv/Edit';


const KEY = 'invoices';

function App() {

    const [updateTime, setUpdateTime] = useState(Date.now()); // milisekundes nuo 1970.01.01
    const [dataStore, setDataStore] = useState(null); //CRUD store
    const [dataRead, setDataRead] = useState(null); //CRUD read

    const [dataDelete, setDataDelete] = useState(null);
    const [dataDestroy, setDataDestroy] = useState(null);

    const [dataEdit, setDataEdit] = useState(null);

    // Saraso uzkrovimas
    useEffect(_ => {

        setDataRead(read(KEY));

    }, [updateTime]);


    useEffect(_ => {
        if (null === dataStore) {
            return;
        }
        store(KEY, dataStore);
        setUpdateTime(Date.now());
    }, [dataStore, setUpdateTime]);


    useEffect(_ => {
        if (null === dataDestroy) {
            return;
        }
        destroy(KEY, dataDestroy.id);
        setUpdateTime(Date.now());
        setDataDelete(null);
    }, [dataDestroy, setUpdateTime]);


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
                    <div className="col-6"><List dataRead={dataRead} setDataDelete={setDataDelete} /></div>
                </div>
            </div>
            <Edit dataEdit={dataEdit} />
            <Delete dataDelete={dataDelete} setDataDelete={setDataDelete} setDataDestroy={setDataDestroy} />
        </>
    );
}

export default App;