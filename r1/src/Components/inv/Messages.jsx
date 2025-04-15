export default function Messages({ messages, remMsg }) {




    if (!messages.length) {
        return null;
    }

    return (
        <div className="messages-bin">

            {
                messages.map(m => 

                <div key={m.id} className={`alert alert-${m.type} alert-dismissible`} role="alert">
                    {m.text}
                    <button type="button" className="btn-close" onClick={_ => remMsg(m.id)}></button>
                </div>

                )

            }


        </div>


    );


}