import React, { useState } from "react";
import "./register.scss";
import { useNavigate, Link } from "react-router-dom";
import { register as registerSvc } from "../Services/Auth";
import { useForm } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
const RegisterPage = () => {
    
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "all",
    });
    const validatePasswordMatch = () => {
        const pass = getValues("password");
        const cPass = getValues("cPassword");
        return pass === cPass;
    };

    const registerUser = async (credentials) => {
       

        try {
            await registerSvc(credentials);

            navigate("/");
        } catch (error) {
            // alert(error.message);
            setError(error);
        }
    };

    return (
        <div className="register-page">
            <div className="login-page">
                <div className="form">                
                     <h3 className="login">SIGN UP</h3>
               
                    <form
                        className="login-form"
                        id="register-form"
                        onSubmit={handleSubmit(registerUser)}
                        autoComplete="off"
                        aria-label="registration-form"
                        action="https://mymeetingsapp.herokuapp.com/api/auth/login"
                        method="post"
                    >
                        <div className="error" id="register-error"></div>
                        <label htmlFor="name" >Username </label>
                     
                        <input
                            type="text"
                            id="name"
                            aria-label="Enter username"
                            placeholder="Enter Username"
                            {...register("name", {
                                required: true,
                                pattern: /^[a-zA-Z ]{2,30}$/,
                            })}
                        />
                     
                        <div className="error" id="name-error">
                            {errors.name && errors.name.type === "required" && (
                                <div
                                    role="alert"
                                    aria-label="Username required"
                                >
                                    Username is required&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                </div>
                            )}
                            {errors.name && errors.name.type === "pattern" && (
                                <div
                                    role="alert"
                                    aria-label="Match the required username pattern "
                                >
                                    Username does not match with the required
                                    pattern&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                </div>
                            )}
                        </div>
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
                        
                        <div className="error" id="email-error">
                            {errors.email && errors.email.type === "required" && (
                                <div role="alert" aria-label="email required">
                                    Email is required&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                </div>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <div
                                    role="alert"
                                    aria-label="match th required email pattern"
                                >
                                    Email does not match the required pattern&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                </div>
                            )}
                        </div>
                        <label htmlFor="password" >Password </label>
                        <div className="input-icon">
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
                        </div>
                        <div className="error" id="password-error">
                            {errors.password &&
                                errors.password.type === "required" && (
                                    <div
                                        role="alert"
                                        aria-label="password required"
                                    >
                                        Password is required&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                    </div>
                                )}
                            {errors.password &&
                                errors.password.type === "pattern" && (
                                    <div
                                        role="alert"
                                        aria-label="match th required password pattern"
                                    >
                                        Password does not match the required
                                        pattern&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                    </div>
                                )}
                        </div>
                        <label htmlFor="confirm-password" >Confirm password</label>
                       
                        <input
                            type="password"
                            id="confirm-password"
                           aria-label="Confirm password"
                           placeholder="Confirm Password"
                            {...register("cPassword", {
                                required: true,
                                validate: validatePasswordMatch,
                            })}
                        />
                      
                        <div className="error" id="cpassword-error">
                        {errors.cPassword &&
                                errors.cPassword.type === "required" && (
                                    <div
                                        role="alert"
                                        aria-label="confirm password required"
                                    >
                                        Confirm Password is required&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                    </div>
                                )}
                            {errors.cPassword &&
                                errors.cPassword.type === "validate" && (
                                    <div
                                        role="alert"
                                        aria-label="passwords do not match"
                                    >
                                        Passwords do not match&nbsp;
                                    <i className="input-icon"><FaExclamationCircle  /></i>
                                    </div>
                                )}
                            {error && error.response.status===409 && (
                             'User already exists'
                        )}
                        </div>
                        <button type="submit" className="login-btn">
                            SIGN UP
                        </button>
                        <p className="message">
                            Already registered?&nbsp;
                            <Link to={'/'} className="underline-link">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;
