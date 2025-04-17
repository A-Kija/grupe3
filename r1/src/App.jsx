import './App.css';
import { useEffect, useState, useCallback } from 'react';
import Create from './Components/inv/Create';
import List from './Components/inv/List';
import Delete from './Components/inv/Delete';
import Edit from './Components/inv/Edit';
import Messages from './Components/inv/Messages';
import { v4 } from 'uuid';
import axios from 'axios';


const URL = 'http://localhost:3000/';

function App() {

    const [updateTime, setUpdateTime] = useState(Date.now()); // milisekundes nuo 1970.01.01
    const [dataStore, setDataStore] = useState(null); //CRUD store
    const [dataRead, setDataRead] = useState(null); //CRUD read

    const [dataDelete, setDataDelete] = useState(null);
    const [dataDestroy, setDataDestroy] = useState(null);

    const [dataEdit, setDataEdit] = useState(null);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [messages, setMessages] = useState([]);

    /*
    [
        {id, text, type},
        {id, text, type},
        {id, text, type},
    ]
    */

    const msg = useCallback((text, type) => {
        const id = v4();
        setMessages(m => [{ id, text, type }, ...m]);
        setTimeout(_ => {
            setMessages(m => m.filter(msg => msg.id !== id));
        }, 5000);
    }, [setMessages]);

    const remMsg = id => {
        setMessages(m => m.filter(msg => msg.id !== id));
    }


    // Saraso uzkrovimas
    useEffect(_ => {

        axios.get(URL + 'inv')
        .then(res => {
            console.log(res)
            setDataRead(res.data.list)
        })
        .catch(error => {
            console.log(error)
        });


    }, [updateTime]);


    useEffect(_ => {
        if (null === dataStore) {
            return;
        }

        axios.post(URL + 'inv', dataStore)
        .then(res => {
            console.log(res);
            setUpdateTime(Date.now());
        })
        .catch(error => {
            console.log(error)
        });

    }, [dataStore, setUpdateTime, msg]);


    useEffect(_ => {
        if (null === dataDestroy) {
            return;
        }

    }, [dataDestroy, setUpdateTime, msg]);


    useEffect(_ => {
        if (null === dataUpdate) {
            return;
        }

    }, [dataUpdate, setUpdateTime]);


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
                    <div className="col-6"><Create
                        msg={msg}
                        setDataStore={setDataStore}
                    /></div>
                    <div className="col-6"><List
                        dataRead={dataRead}
                        setDataDelete={setDataDelete}
                        setDataEdit={setDataEdit}
                    /></div>
                </div>
            </div>
            <Edit
                dataEdit={dataEdit}
                setDataEdit={setDataEdit}
                setDataUpdate={setDataUpdate}
            />
            <Delete
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                setDataDestroy={setDataDestroy}
            />
            <Messages messages={messages} remMsg={remMsg} />
        </>
    );
}

export default App;