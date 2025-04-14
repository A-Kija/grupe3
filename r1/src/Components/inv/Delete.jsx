export default function Delete({ dataDelete, setDataDelete, setDataDestroy }) {



    if (null === dataDelete) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm delete</h5>
                        <button type="button" className="btn-close" onClick={_ => setDataDelete(null)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Invoice number <b>{dataDelete.number}</b>. Company name: <b>{dataDelete.buyer.company}</b></p>
                        <p>Are you sure to delete this invoice?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={_ => setDataDelete(null)}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={_=> setDataDestroy(dataDelete)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}