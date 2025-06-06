import { useState } from 'react';
import country from 'country-list-js';
import useCount from './useCount';
import * as icon from './svg';

export default function Create({ setDataStore, msg }) {

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
    const [errorsData, setErrorsData] = useState({});

    const { countLineTotal, subTotal, vat, total, setInvLines } = useCount();

    setInvLines(lines); // Cia nustatome inv linijas su kuriom darysim skaiciavima

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
        setErrorsData(err => ({ ...err, [e.target.name]: false }));
    }

    const validateNumber = _ => {

        if (!number) {
            msg('Number is empty', 'danger');
            setErrorsData(err => ({ ...err, number: true }));
            return true;
        }
        if (number.trim().length < 3) {
            msg('Number is too short. Min 3 symbols', 'danger');
            setErrorsData(err => ({ ...err, number: true }));
            return true;
        }

        return false;
    }

    const submit = _ => {

        let error = false;
        setErrorsData(_ => ({})); // nera klaidu pradzioje

        // Validation
        error = validateNumber();

        if (!buyer.company) {
            msg('Client company name is empty', 'danger');
            setErrorsData(err => ({ ...err, company: true }));
            error = true;
        }


        if (error) {
            return;
        }




        const inv = {
            number,
            date,
            lines,
            buyer
        };
        setDataStore(inv);
        setLines([emptyLine]);
        setBuyer(emptyBuyer);
        setDate('');
        setNumber('');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="invoice card mt-5">
                        <div className="card-header">
                            <h2>New Invoice</h2>
                        </div>
                        <div className="card-body">
                            <div className="invoice-header">
                                <div>
                                    <label className="form-label">Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={number}
                                        onChange={e => setNumber(e.target.value)}
                                        style={{
                                            borderColor: errorsData?.number ? 'crimson' : null
                                        }}
                                        onFocus={_ => setErrorsData(err => ({ ...err, number: false }))}
                                        onBlur={validateNumber}
                                    />
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
                                    <input
                                        type="text"
                                        name="company"
                                        className="form-control"
                                        value={buyer.company}
                                        onChange={handleBuyer}
                                        style={{
                                            borderColor: errorsData?.company ? 'crimson' : null
                                        }}
                                    />
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
                        <div className="card-footer text-body-secondary">
                            <button className="btn btn-primary" onClick={submit}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}