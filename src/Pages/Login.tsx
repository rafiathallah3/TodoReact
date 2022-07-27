import React from "react";
import FormLogin from "../components/FormLogin";

export default function Login() {
    return (
        <div id="auth">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-12 mx-auto">
                        <div className="card pt-4">
                            <div className="card-body">
                                <div className="text-center mb-5">
                                    <h3>Login</h3>
                                    <p>Halaman website</p>
                                </div>
                                <FormLogin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}