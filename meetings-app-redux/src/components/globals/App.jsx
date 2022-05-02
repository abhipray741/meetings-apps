import React, { useState } from "react";
import {Helmet} from 'react-helmet';
import "../../external/normalise.scss";
import "./app.scss";
import "./utils.scss";
import RequireAuth from "./RequireAuth";
import LoginPage from "../login/Login";
import RegisterPage from "../register/Register";
import CalendarPage from "../calendar/Calendar";
import SearchMeetPage from "../search-meet/SearchMeet";
import TeamsPage from "../teams/Teams";
import AddMeetPage from "../add-meet/AddMeet";

import { Route, Routes } from "react-router-dom";

const App = () => {
    const [isActive, setActive] = useState("");

    const onSetIsActive = (page) => {
        setActive(page);
    };

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Meetings application where you can find your daily meetings along with functionalities like adding a new meeting and adding a new team." />
                <title>Meetings App</title>
            </Helmet>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/calendar"
                    element={
                        <RequireAuth>
                            <CalendarPage
                                setActive={onSetIsActive}
                                isActive={isActive}
                            />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/search-meet"
                    element={
                        <RequireAuth>
                            <SearchMeetPage
                                setActive={onSetIsActive}
                                isActive={isActive}
                            />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/add-meet"
                    element={
                        <RequireAuth>
                            <AddMeetPage
                                setActive={onSetIsActive}
                                isActive={isActive}
                            />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/teams"
                    element={
                        <RequireAuth>
                            <TeamsPage
                                setActive={onSetIsActive}
                                isActive={isActive}
                            />
                        </RequireAuth>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
