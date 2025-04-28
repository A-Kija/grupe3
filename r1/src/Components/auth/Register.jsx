export default function Register() {



    return (
        <div className="form">
            <h1>Register</h1>
            <div className="inputs">
                <div className="input">
                    <label>User Name</label>
                    <input type="text" />
                </div>

                <div className="input">
                    <label>Password</label>
                    <input type="password" />
                </div>

                <div className="input">
                    <label>Password confirm</label>
                    <input type="password" />
                </div>

                <div className="input">
                    <button className="blue">Register</button>
                </div>

            </div>
        </div>
    );

}