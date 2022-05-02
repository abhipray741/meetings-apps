import React, {useState} from "react";
import { login as loginSvc } from "../Services/Auth";
import { useNavigate, Link } from "react-router-dom";
import "./login.scss";
import { useForm } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";



const LoginPage = () => {
    const [error, setError]=useState(null);
    const [errorM, setErrorM]=useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
    });

    const navigate = useNavigate();

    const login = async (credentials) => {

        try {
            await loginSvc(credentials);

            navigate("/calendar");
        } catch (error) {
            setError(error);
            
        }
    };

    return (
        <div className="index-page">
            <div className="login-page">
                <div className="form">
                            <h3 className="login">LOGIN</h3>
                    <form
                        onSubmit={handleSubmit(login)}
                        className="login-form"
                        id="login-form"
                        autoComplete="off"
                        action= "https://mymeetingsapp.herokuapp.com/api/calendar"
                        method="POST"
                    >
                        <label htmlFor="email" >Email </label>
                        <input
                            type="email"
                            id="email"
                            aria-label="Enter Email"
                            placeholder="Enter Email"
                           
                            {...register("email", {
                                required: true,
                                pattern:
                                    /^[A-Za-z]{1}[A-Za-z0-9\._\-]+@(publicissapient|sapient|example).com$/,
                            })}
                        />
                                                              
                        
                               
                        <div className="error hide" id="email-error">
                            {errors.email && errors.email.type === "required" && (
                                <div role="alert" aria-label="Email required">Email is required&nbsp;
                                 <i className="input-icon"><FaExclamationCircle  /></i>
                                </div>
                                
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <div
                                    role="alert"
                                    aria-label="match the required email pattern"
                                >
                                    Email does not match the required pattern&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                </div>
                            )}
                        </div>
                        <label htmlFor="password">Password</label>
                        
                        <input
                            type="password"
                            id="password"
                            aria-label="Enter Password"
                            placeholder="Enter Password"
                            {...register("password", {
                                required: true,
                                pattern:
                                    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/,
                            })}
                       
                        />
                       
                        <div className="error hide" id="password-error">
                            {errors.password &&
                                errors.password.type === "required" && (
                                    <div
                                        role="alert"
                                        aria-label="Password required"
                                    >
                                        Password is required&nbsp;
                                        <i className="input-icon"><FaExclamationCircle  /></i>
                                    </div>
                                )}
                            {errors.password && errors.password.type === "pattern" && (
                                <div
                                    role="alert"
                                    aria-label="match the required password pattern"
                                >
                                    Password does not match the required pattern&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                </div>
                            )}
                        </div>
                        {error && error.response.status===401 && (
                            <div
                            className="error"
                            id="credentials-error"
                            
                        > Either email or Password does not match, please check again!&nbsp;
                        <i className="input-icon"><FaExclamationCircle  /></i></div>
                        )}
                      
                        <button type="submit" className="login-btn" aria-label="Click to Login">
                            login
                        </button>
                        <p className="message">
                            Not registered?&nbsp;
                            <Link to ={"/register"} className="underline-link">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
