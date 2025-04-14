export default function Edit({dataEdit}) {



    if (null === dataEdit) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit invoice</h5>
                        <button type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body">

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary">Cancel</button>
                        <button type="button" className="btn btn-success">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}