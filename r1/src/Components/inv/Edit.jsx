import { useEffect, useState } from 'react';
import country from 'country-list-js';
import useCount from './useCount';
import * as icon from './svg';

export default function Edit({ dataEdit, setDataEdit, setDataUpdate }) {

    const emptyLine = {
        title: '',
        price: '',
        quantity: ''
    };

    const emptyBuyer = {
        company: '',
        country: '0',
        vat_code: ''
    }


    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [lines, setLines] = useState([emptyLine]);
    const [buyer, setBuyer] = useState(emptyBuyer);

    const { countLineTotal, subTotal, vat, total, setInvLines } = useCount();

    setInvLines(lines); // Cia nustatome inv linijas su kuriom darysim skaiciavima

    useEffect(_ => {
        if (null === dataEdit) {
            return;
        }
        setNumber(dataEdit.number);
        setDate(dataEdit.date);
        setLines(dataEdit.lines);
        setBuyer(dataEdit.buyer);
    }, [dataEdit]);

    const handleLineInput = (e, i) => {
        const name = e.target.name;
        const value = e.target.value;
        setLines(l => l.map((line, index) => i === index ? { ...line, [name]: value } : line));
    }

    const removeLine = i => {
        setLines(l => l.filter((_, index) => i !== index));
    }

    const addLine = _ => {
        setLines(l => [...l, emptyLine]);
    }

    const handleBuyer = e => {
        setBuyer(b => ({ ...b, [e.target.name]: e.target.value }));
    }

    const submit = _ => {
        const inv = {
            number,
            date,
            lines,
            buyer,
            id: dataEdit.id
        };
        setDataUpdate(inv);
    }


    if (null === dataEdit) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered" style={{
                width: '80vw',
                maxWidth: '700px'
            }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit invoice</h5>
                        <button type="button" className="btn-close" onClick={_ => setDataEdit(null)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="invoice-header">
                            <div>
                                <label className="form-label">Number</label>
                                <input type="text" className="form-control" value={number} onChange={e => setNumber(e.target.value)} />
                            </div>
                            <div>
                                <label className="form-label">Date</label>
                                <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} />
                            </div>
                        </div>
                        <div className="invoice-buyer">
                            <h2>Buyer</h2>
                            <div className="mb-3 invoice-buyer__company">
                                <label className="form-label">Company</label>
                                <input type="text" name="company" className="form-control" value={buyer.company} onChange={handleBuyer} />
                            </div>
                            <div className="flex">
                                <div className="mb-3 invoice-buyer__company">
                                    <label className="form-label">Country</label>
                                    <select className="form-select" name="country" value={buyer.country} onChange={handleBuyer}>
                                        <option value="0">Select country</option>
                                        {
                                            country.names().map(c => <option key={c} value={c}>{c}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="mb-3 invoice-buyer__company">
                                    <label className="form-label">VAT CODE</label>
                                    <input type="text" name="vat_code" className="form-control" value={buyer.vat_code} onChange={handleBuyer} />
                                </div>
                            </div>
                        </div>
                        {
                            lines.map((l, i) =>
                                <div className="invoice-line" key={i}>
                                    <div className="mb-3 invoice-line__title">
                                        <label className="form-label">Product title</label>
                                        <input type="text" name="title" className="form-control" value={l.title} onChange={e => handleLineInput(e, i)} />
                                    </div>
                                    <div className="mb-3 invoice-line__price">
                                        <label className="form-label">Price</label>
                                        <input type="text" name="price" className="form-control" value={l.price} onChange={e => handleLineInput(e, i)} />
                                    </div>
                                    <div className="mb-3 invoice-line__quantity">
                                        <label className="form-label">Quantity</label>
                                        <input type="text" name="quantity" className="form-control" value={l.quantity} onChange={e => handleLineInput(e, i)} />
                                    </div>
                                    <div className="mb-3 invoice-line__total">
                                        <label className="form-label">Total</label>
                                        <input readOnly={true} type="text" className="form-control" value={countLineTotal(i)} />
                                    </div>
                                    <div className="mb-3 invoice-line__delete">
                                        <button className="btn btn-danger" onClick={_ => removeLine(i)}>{icon.remove}</button>
                                    </div>
                                </div>
                            )
                        }

                        <div className="invoice-line-add">
                            <button className="btn btn-warning" onClick={addLine}>Add line</button>
                        </div>
                        <div className="invoice-totals">
                            <div className="invoice-totals__line">
                                <span className="title">Subtotal:</span>
                                <span className="value">{subTotal()}</span>
                            </div>
                            <div className="invoice-totals__line">
                                <span className="title">VAT 21%:</span>
                                <span className="value">{vat()}</span>
                            </div>
                            <div className="invoice-totals__line">
                                <span className="title">Total:</span>
                                <span className="value">{total()}</span>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={_ => setDataEdit(null)}>Cancel</button>
                        <button type="button" className="btn btn-success" onClick={submit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}