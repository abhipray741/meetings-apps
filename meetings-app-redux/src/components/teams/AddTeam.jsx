import React from "react";
import { Helmet } from "react-helmet";
import postTeam from "../Services/AddTeam";
import { useForm } from "react-hook-form";

const AddTeam = ({ teams, setTeams, setShowAddTeamFrom }) => {
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm({
        mode: "all",
    });

    const addNewTeam = async (team) => {
        team = { ...team, member: team.member.split(",") };

        const newTeam = await postTeam(team);
        setTeams(newTeam);
        setShowAddTeamFrom();
        // resetForm();
    };
    return (
        <div className="team-box my-2">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Add team page to create a new team." />
                <title>Teams</title>
            </Helmet>
            <form id="add-team-form" onSubmit={handleSubmit(addNewTeam)} action="https://mymeetingsapp.herokuapp.com/api/teams" method="POST">
                <div className="my-3 teams-form">
                    <label htmlFor="team-name">Team Name</label>
                    <input
                        type="text"
                        id="team-name"
                        className="input"
                        name="team-name"
                        placeholder="Enter Team Name"
                        maxLength="35"
                        aria-label="enter team name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <div className="error" id="name-error">
                        {errors.name && (
                            <div role="alert" aria-label="team name is empty">
                                Team name cannot be empty
                            </div>
                        )}
                    </div>
                </div>
                <div className="my-3 teams-form ">
                    <label htmlFor="team-short-name">
                        Team Short Name
                    </label>
                    <input
                        type="text"
                        id="team-short-name"
                        className="input"
                        name="team-short-name"
                        placeholder="Enter Team Short Name"
                        maxLength="25"
                        aria-label="enter team shortname"
                        {...register("shortName", {
                            required: true,
                        })}
                    />
                    <div className="error" id="short-name-error">
                        {errors.shortName && (
                            <div
                                role="alert"
                                aria-label="team short name is empty"
                            >
                                Team short name cannot be empty
                            </div>
                        )}
                    </div>
                </div>
                <div className="my-3 teams-form">
                    <label htmlFor="description" >
                        Description
                    </label>
                    <textarea
                        name="description"
                        className="input"
                        placeholder="Enter Description"
                        id="team-description"
                        aria-label="enter team description"
                        {...register("description", {
                            required: true,
                        })}
                    ></textarea>
                    <div className="error" id="desc-error">
                        {errors.description && (
                            <div
                                role="alert"
                                aria-label="team description is empty"
                            >
                                Team description cannot be empty
                            </div>
                        )}
                    </div>
                </div>

               <div className="bottom-line-button"></div>
                <div className="my-2">
                    <b>Members:</b>
                </div>

                <label htmlFor="member"></label>
                <input
                    type="text"
                    placeholder="Enter the Email Ids"
                    id="new-team-member-names"
                    name="member"
                    className="select-height"
                    aria-label="select members you want to add to the team"
                    {...register("member")}
                />

                <div>
                    <button
                        type="submit"
                        value="create Team"
                        className="btn btn-primary my-2"
                        id="add-team-btn"
                        aria-label="click on this button to add the team"
                    >
                        Create Team
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTeam;
