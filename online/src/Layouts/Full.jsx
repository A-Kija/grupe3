import { Routes, Route } from 'react-router';

import Register from '../Pages/Register';

export default function Full() {

    return (
        <div className="page-bin-full">
            <main>
                <Routes>
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </div>
    );

}