
const LoadingErrorMessages = ({status,error}) =>{
    return(
        <section> 
                        {status === "LOADING-TEAMS" && (
                            <div
                                className="alert alert-info "
                                role="alert"
                                id="teams-loading-message"
                                aria-label="We are fetching the teams. Please wait."
                            >
                                We are fetching the teams. Please wait.
                            </div>
                        )}
                       
                        {status === "ERROR-TEAMS" && (
                            <div
                                className="alert alert-danger "
                                id="teams-error-loading-message"
                            >
                                {error}
                            </div>
                        )}
                        {status === "LOADING-USERS" && (
                            <div
                                className="alert alert-info "
                                id="users-loading-message"
                            >
                                We are fetching the users. Please wait.
                            </div>
                        )}
                        {status === "LOADED-USERS" && (
                            <div
                                className="alert alert-info "
                                id="users-loaded-message"
                            >
                                The users are loaded.
                            </div>
                        )}
                        {status === "ERROR-USERS" && (
                            <div
                                className="alert alert-danger "
                                id="teams-error-loading-message"
                            >
                                {error}
                            </div>
                        )}
                    </section>
    )
}
export default LoadingErrorMessages