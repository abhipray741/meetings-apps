import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./teams.scss";
import AppNavbar from "../AppNavbar/AppNavbar";
import excuseYourself from "../Services/ExcuseyourselfTeams";
import fetchTeams from "../Services/FetchTeams";
import fetchUsers from "../Services/FetchUsers";
import AddTeam from "./AddTeam";
import LoadingErrorMessages from "./TeamsLoadingErrorMessages";
import TeamCardEles from "./TeamCardEles";
import addMembers from "../Services/AddMembers";

const TeamsPage = ({ setActive, isActive }) => {
    
    const [showAddTeamForm, setShowAddTeamFrom] = useState(false);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("");
    const [error, setError] = useState(null);

    const [memberEmail, setMemberEmail] = useState("");

    const onAddTeam = (newTeam) => {
        setTeams([...teams, newTeam]);
    };
    const onSetShowAddTeamFrom = () => {
        setShowAddTeamFrom(!showAddTeamForm);
    };

    const removeTeamHandler = async(team) => {
        await excuseYourself(team);
        setTeams(teams.filter((item) => item._id !== team._id));
    };

    const getTeams = async () => {
        setStatus("LOADING-TEAMS");
        try {
            setTeams(await fetchTeams());
            setStatus("LOADED-TEAMS");
            setError(null);
        } catch (error) {
            setStatus(error.status);
            setError(error);
        }
    };

    const getUsers = async () => {

        try {
            setUsers(await fetchUsers());
          
            setError(null);
        } catch (error) {
           
            setError(error);
        }
    };
    

    const addNewMember = async (team) => {
        const newMemberResponse = await addMembers(memberEmail, team._id);
        const newTeams = teams.map((item) => {
            if (item._id === team._id) {
               
                return newMemberResponse;
            }
            return item;
        });

        setTeams(newTeams);
    };

    useEffect(() => {
        setActive("TEAMS");
        getTeams();
        getUsers();
    }, []);

    


    return (
        <div>
            <AppNavbar isActive={isActive} />
            <div className="teams-page">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="On this page you can view the teams in which you are added." />
                <title>Teams</title>
            </Helmet>
                <main className="container">
                <h2 className="bottom-line">Teams</h2>
                    <LoadingErrorMessages status={status} error={error} />
                    <div>
                        <div className="teams-page-flex" id="teams-list">
                            {status==="LOADED-TEAMS"&&<TeamCardEles 
                            teams={teams}
                            removeTeamHandler={removeTeamHandler}
                            setMemberEmail={setMemberEmail}
                            users={users}
                            addNewMember={addNewMember} /> }
                            {showAddTeamForm && (
                                <AddTeam
                                    teams
                                    setTeams={onAddTeam}
                                    setShowAddTeamFrom={onSetShowAddTeamFrom}
                                />
                            )}
                            <div className="team-box last-box my-2">
                                <div>
                                    <button
                                        className="plus"
                                        onClick={() =>
                                            setShowAddTeamFrom(!showAddTeamForm)
                                        }
                                    >
                                        {showAddTeamForm ? "-" : "+"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
export default TeamsPage;
