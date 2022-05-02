import React, { useState } from "react";
import { Helmet } from "react-helmet"; 
import "./add-meeting.scss";
import addMeeting from "../Services/Addmeetings";
import AppNavbar from "../AppNavbar/AppNavbar";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaExclamationCircle,FaCheck} from "react-icons/fa";

    const hours = [...Array(24).keys()];
    const minutes = [...Array(60).keys()];
const AddMeetPage = ({ setActive, isActive }) => {
    setActive("MEETINGS");

    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "all",
    });

    const validateDate = () => {
        const date = new Date(getValues("date"));
        const currentDate = new Date();
        return date.getTime() - currentDate.getTime() >= 0;
    };

    const validateTimeHours = () => {
        const startTimeHours = parseInt(getValues("startTimeHours"));
        const endTimeHours = parseInt(getValues("endTimeHours"));
        return endTimeHours - startTimeHours >= 0;
    };

    const validateTimeMins = () => {
        const startTimeHours = getValues("startTimeHours");
        const endTimeHours = getValues("endTimeHours");
        const startTimeMins = getValues("startTimeMinutes");
        const endTimeMins = getValues("endTimeMinutes");
        if (endTimeHours === startTimeHours) {
            return endTimeMins - startTimeMins >= 0;
        } else {
            return true;
        }
    };

    const newMeeting = async (meeting) => {
    
        const meetingUser = {
            name: meeting.name,
            date: meeting.date,
            description: meeting.description,
            startTime: {
                hours: meeting.startTimeHours,
                minutes: meeting.startTimeMinutes,
            },
            endTime: {
                hours: meeting.endTimeHours,
                minutes: meeting.endTimeMinutes,
            },
            attendees: meeting.attendees.split(',')
        };
     

        try {
            const newMeeting = await addMeeting(meetingUser);
            setStatus("SUCCESS");
            setError(null)
        } catch (error) {
            setStatus("ERROR");
            setError(error.message);
        }
    };
  
    return (

        <div>
            <AppNavbar isActive={isActive} />
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="On this page you can add new meetings." />
                <title>Add Meet</title>
            </Helmet>
            <main className="container">
                <section>
                    <h2 className="bottom-line">Meetings</h2>
                   
                </section>
                <div className="add-meeting-page ">
                    <nav>
                        <ul className=" list-unstyled list-inline container meet">
                  <li className=" meet-item ">
                                <Link to ={"/search-meet"} className="meet-link">
                                    Filter/Search Meetings
                                </Link>
                            </li>
                            <li className="meet-item active-link">
                                <Link to={"/add-meet"} className="meet-link">  
                                Add a Meeting
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <section className="add-meeting blue">
                        <h2 className="heading-02 bottom-line">Add a new meeting</h2>
                
                        <form
                            id="add-meeting-form"
                            onSubmit={handleSubmit(newMeeting)}
                            action="https://mymeetingsapp.herokuapp.com/api/add-meet"
                            method="post"
                            autoComplete="off"
                        >
                         
                            <span id="success-added" className="mx-2" aria-label="Meeting successfully added ">
                                {status === "SUCCESS" &&(
                                <span> Meeting successfully added 
                                    <i className="success-icon"><FaCheck/></i>
                                </span>)
                                   }
                            </span>
                           
                            <span id="error-added" className="mx-2">
                                {status === "ERROR" && "Meeting could not be added"}
                            </span>
                            <label htmlFor="name" className="sub-heading">
                                Name of the Meeting{" "}
                            </label>
                            <div className="form-control form sub-heading ">
                                <div className="input-icon">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter meeting name"
                                    className="nameofmeet input"
                                    title="Fill this field"
                                    aria-label="Enter meeting name"
                                    {...register("name", { required: true })}
                                />
                                {errors.name &&
                                        errors.name.type === "required" && (
                                            <i className="error-icon"><FaExclamationCircle  /></i>
                                        )}
                                </div>
                                <div className="error mx-2" id="name-error">
                                    {errors.name &&
                                        errors.name.type === "required" && (
                                            <div
                                                role="alert"
                                                aria-label="name required"
                                            >
                                                Meeting name is required
                                            </div>
                                        )}
                                </div>
                            </div>
                            <label htmlFor="date" className="sub-heading">
                                Date
                            </label>
                            <div className="form-control form sub-heading">
                                <div className="input-icon">
                                <input
                                    type="date"
                                    className="date input"
                                    id="date"
                                    title="Fill date"
                                    aria-label="Select date"
                                    {...register("date", {
                                        required: true,
                                        validate: validateDate,
                                    })}
                                />
                                {errors.date &&
                                        errors.date.type === "required" && (
                                            <i className="error-icon"><FaExclamationCircle  /></i>
                                        )}
                                    {errors.date &&
                                        errors.date.type === "validate" && (
                                            <i className="error-icon"><FaExclamationCircle  /></i>
                                        )}
                                </div>
                                <div className="error mx-2" id="date-error">
                                    {errors.date &&
                                        errors.date.type === "required" && (
                                            <div
                                                role="alert"
                                                aria-label="date required"
                                            >
                                                Date is required
                                            </div>
                                        )}
                                    {errors.date &&
                                        errors.date.type === "validate" && (
                                            <div
                                                role="alert"
                                                aria-label="Date must be a future date"
                                            >
                                                {" "}
                                                Date must be a future date
                                            </div>
                                        )}
                                </div>
                            </div>

                            <label
                                htmlFor="start-time-hours"
                                className="sub-heading"
                            >
                                Start time (hh:mm)
                            </label>
                            <div className="form-control form sub-heading">
                                <select
                                    id="start-time-hours"
                                    name="hour-time"
                                    title="Fill start time(hours)"
                                    aria-label="Select start time hour"
                                    {...register("startTimeHours")}
                                >
                                    {hours.map((hour) => (
                                        <option value={hour} key={`startTimeHour-${hour}`}>{hour}</option>
                                    ))}
                                </select>{" "}
                                <b>:</b>
                                <select
                                    id="start-time-minutes"
                                    name="minute-time"
                                    required
                                    title="Fill start time(min)"
                                    aria-label="Select start time minutes"
                                    {...register("startTimeMinutes")}
                                >
                                    {minutes.map((minute) => (
                                        <option key={`StartTimeMin-${minute}`}>{minute}</option>
                                    ))}
                                </select>
                            </div>

                            <label htmlFor="end-time-hours" className="sub-heading">
                                End time (hh:mm)
                            </label>
                            <div className="form-control form sub-heading">
                                <select
                                    id="end-time-hours"
                                    name="hour-time"
                                    required
                                    title="Fill end time(hours)"
                                    aria-label="Select end time hour"
                                    {...register("endTimeHours", {
                                        validate: validateTimeHours,
                                    })}
                                >
                                    {hours.map((hour) => (
                                        <option value={hour} key={`endTimeHour-${hour}`}>{hour}</option>
                                    ))}
                                </select>{" "}
                                <b>:</b>
                                <select
                                    id="end-time-minutes"
                                    name="minute-time"
                                    required
                                    title="Fill end time(min)"
                                    aria-label="Select end time minutes"
                                    {...register("endTimeMinutes", {
                                        validate: validateTimeMins,
                                    })}
                                >
                                    {minutes.map((minute) => (
                                        <option value={minute} key={`endTimeMin-${minute}`}>{minute}</option>
                                    ))}
                                </select>
                                <div className="error mx-2" id="endtime-error">
                                    {errors &&
                                        errors.endTimeHours &&
                                        errors.endTimeHours.type ===
                                            "validate" && (
                                            <div
                                                role="alert"
                                                aria-label="End Time can't be less than Start Time"
                                            >
                                                End Time can't be less than
                                                Start Time
                                            </div>
                                        )}
                                    {errors &&
                                        errors.endTimeMinutes &&
                                        errors.endTimeMinutes.type ===
                                            "validate" && (
                                            <div
                                                role="alert"
                                                aria-label="End Time Mins can't be less than Start Time Mins"
                                            >
                                                End Time cannot be less than
                                                Start Time
                                            </div>
                                        )}
                                </div>
                            </div>

                            <label htmlFor="desc" className="sub-heading">
                                Description
                            </label>
                            <div className="form-control form sub-heading">
                                <div className="input-icon">
                                <textarea
                                    name="word-search"
                                    className="word-search"
                                    id="desc"
                                    cols="25"
                                    rows="2"
                                    placeholder="What is agenda of the meeting?"
                                    title="Fill description"
                                    aria-label="Fill description"
                                    {...register("description", {
                                        required: true,
                                    })}
                                ></textarea>
                                {errors.description &&
                                        errors.description.type ===
                                            "required" && (
                                            <i className="error-icon"><FaExclamationCircle  /></i>
                                        )}

                                </div>
                                <div
                                    className="error mx-2"
                                    id="description-error"
                                >
                                    {errors.description &&
                                        errors.description.type ===
                                            "required" && (
                                            <div
                                                role="alert"
                                                aria-label="description is empty"
                                            >
                                                Description is required
                                            </div>
                                        )}
                                </div>
                            </div>
                            <label htmlFor="email-ids" className="sub-heading">
                                EmailIDs of attendees
                            </label>
                            <div className="form-control form sub-heading">
                                <input
                                    type="email"
                                    placeholder="john@example.com, @annual-day, mark@example.com"
                                    className="email input"
                                    id="email-ids"
                                    multiple="multiple"
                                    title="Enter attendees"
                                    aria-label="Enter emails"
                                    {...register("attendees")}
                                />
                                <div
                                    className="error mx-2"
                                    id="attendee-error"
                                ></div>
                            </div>
                            <span className="email-rule-1 sub-heading">
                                Separate emailids by commas 
                            </span>

                            <span className="email-rule-3 sub-heading">
                                <button
                                    type="submit"
                                    // value="Add meeting"
                                    className="btn btn-primary"
                                >
                                    Add meeting
                                </button>
                            </span>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AddMeetPage;
