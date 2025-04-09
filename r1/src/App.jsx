import './App.css';
import Create from './Components/inv/Create';
import List from './Components/inv/List';

function App() {


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
                    <div className="col-8"><Create /></div>
                    <div className="col-4"><List /></div>
                </div>
            </div>
        </>
    );
}

export default App;