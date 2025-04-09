import { useState } from "react";

export default function Create() {

    const emptyLine = {
        title: '',
        price: '',
        quantity: ''
    }

    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [lines, setLines] = useState([emptyLine]);

    const countLineTotal = i => {
        const price = parseFloat(lines[i].price);
        const quantity = parseInt(lines[i].quantity);
        if (isNaN(price) || isNaN(quantity)) {
            return 0;
        }
        return (price * quantity).toFixed(2);
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
                                    <span className="value">500.77</span>
                                </div>
                                <div className="invoice-totals__line">
                                    <span className="title">VAT 21%:</span>
                                    <span className="value">100.51</span>
                                </div>
                                <div className="invoice-totals__line">
                                    <span className="title">Total:</span>
                                    <span className="value">601.28</span>
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