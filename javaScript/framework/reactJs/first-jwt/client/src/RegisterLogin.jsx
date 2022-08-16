import { useState } from "react";

const RegisterLogin = () => {
    const handleChange = (e)=>{
        formData[e.target.name] = e.target.value
        setFormData(formData)
    }

    const submit = (e)=>{
        e.preventDefault()
        fetch("/user/create",{
            method: "POST",
            headers: {
                "content-type" : "application/json",
                // "Access-Control-Allow-Origin" : "*",
                // "Access-Control-Allow-Credentials" : "true"
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
        .then(data => data.status === 'ok' ? setIsValidated(true) : setError(true))
    }

    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false)
    const [isvalidated, setIsValidated] = useState(false)
    return ( 
        <form className="container">
            {error && !isvalidated && <div className="error"> some incorrect entries </div>}
            
            {!isvalidated && 
            <div className="register-fields register">
                <p className="title l">Register</p>
                <input
                    className="fields name"
                    type="text" name="name"
                    placeholder="name"
                    value={ formData?.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="fields surname"
                    type="text"
                    name="surname"
                    placeholder="surname"
                    value={ formData?.username}
                    onChange={handleChange}
                    required
                />
                <input
                    className="fields email"
                    type="text"
                    name="email"
                    placeholder="email"
                    value={ formData?.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="fields password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={ formData?.password}
                    onChange={handleChange}
                    required
                />
                <input
                    className="fields birth"
                    type="date"
                    name="birth"
                    value={ formData?.password}
                    onChange={handleChange}
                    required 
                />
                <div className="bottom">
                    <button
                    className="register-button"
                    onClick={ submit}
                    >
                        register
                    </button>
                </div>
            </div>
            }
            {isvalidated &&
                <div className="validated">
                    <h1 className="rs">Registration Successfull</h1>
                    <img className="v" src="v.png" alt="" />
                    <p className="message">
                        We've sent you an email to <span id="em">{ formData?.email }.</span><br />
                        You need to confirm your account ...
                    </p>
                </div>

            }
        </form>
    );
}
 
export default RegisterLogin;