import { useRef, useState } from 'react';
import country from 'country-list-js';

export default function Create() {

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

    const invoiceTotals = useRef({
        subtotal: 0,
        vat: 0,
        total: 0
    });

    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [lines, setLines] = useState([emptyLine]);
    const [buyer, setBuyer] = useState(emptyBuyer);

    const countLineTotal = (i, number = false) => {
        const price = parseFloat(lines[i].price);
        const quantity = parseInt(lines[i].quantity);
        if (isNaN(price) || isNaN(quantity)) {
            return 0;
        }
        if (number) {
            return (price * quantity); // grazina skaiciu
        }
        return (price * quantity).toFixed(2); // grazina stringa
    }

    const subTotal = _ => {
        let subTotalValue = 0;
        for (let i = 0; i < lines.length; i++) {
            subTotalValue += countLineTotal(i, true);
        }
        invoiceTotals.current.subtotal = subTotalValue;
        return subTotalValue.toFixed(2);
    }

    const vat = _ => {
        const vatValue = invoiceTotals.current.subtotal * 0.21;
        invoiceTotals.current.vat = vatValue;
        return vatValue.toFixed(2);
    }

    const total = _ => {
        const totalValue = invoiceTotals.current.subtotal + invoiceTotals.current.vat;
        invoiceTotals.current.total = totalValue;
        return totalValue.toFixed(2);
    }

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
        setBuyer(b => ({...b, [e.target.name]: e.target.value}));
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
                                            <button className="btn btn-danger" onClick={_ => removeLine(i)}>X</button>
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
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}