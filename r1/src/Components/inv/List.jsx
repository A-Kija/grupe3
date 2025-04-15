import useCount from './useCount';
import * as icon from './svg';

export default function List({ dataRead, setDataDelete, setDataEdit }) {

    const { invTotal } = useCount();

    if (null === dataRead) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="mt-5">...LOADING</div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="invoice card mt-5">
                        <div className="card-header">
                            <h2>Invoices list</h2>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {
                                    dataRead.map(inv =>

                                        <li key={inv.id} className="list-group-item">
                                            <div className="inv-list-item">
                                                <div className="inv-list-item__number">
                                                    {inv.number}
                                                </div>
                                                <div className="inv-list-item__date">
                                                    {inv.date}
                                                </div>
                                                <div className="inv-list-item__company">
                                                    {inv.buyer.company}
                                                </div>
                                                <div className="inv-list-item__total">
                                                    {invTotal(inv)}
                                                </div>
                                                <div className="inv-list-item__buttons">
                                                    <button className="btn btn-success" onClick={_ => setDataEdit(inv)}>{icon.edit}</button>
                                                    <button className="btn btn-danger" onClick={_ => setDataDelete(inv)}>{icon.remove}</button>
                                                </div>
                                            </div>
                                        </li>

                                    )
                                }
                            </ul>
                        </div>
                        <div className="card-footer text-body-secondary">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}