export default function Create() {



    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="invoice card mt-5">
                        <div className="card-header">
                            <h2>New Invoice</h2>
                        </div>
                        <div className="card-body">

                            <div className="invoice-line">
                                <div className="mb-3 invoice-line__title">
                                    <label className="form-label">Product title</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3 invoice-line__price">
                                    <label className="form-label">Price</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3 invoice-line__quantity">
                                    <label className="form-label">Quantity</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3 invoice-line__total">
                                    <label className="form-label">Total</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3 invoice-line__delete">
                                    <button className="btn btn-danger">X</button>
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