import { useContext } from 'react';
import Data from '../Data/Data';

export default function Messages() {

    const { messages } = useContext(Data);

    if (!messages.length) {
        return null;
    }

    return (
        <div className="msg-bin">
            {
                messages.map(m =>
                    <div className="msg-bin__msg" key={m.id}>

                    </div>
                )
            }
        </div>
    )

}