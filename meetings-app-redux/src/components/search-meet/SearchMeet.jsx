import React, { useState,useEffect} from "react";
import { Helmet } from "react-helmet";
import "./search-meeting.scss";
import AppNavbar from "../AppNavbar/AppNavbar";
import excuseYourself from "../Services/ExcuseyourselfMeeting";
import fetchMeeting from "../Services/FetchMeeting";
import fetchUsers from "../Services/FetchUsers";
import addAttendee from "../Services/AddAttendee";
import { Link } from "react-router-dom";


const SearchMeetPage = ({ setActive, isActive }) => {
   setActive("MEETINGS");
    const [day, setDay] = useState("all");
    const [desc, setDesc] = useState("");
    const [meetings, setMeetings] = useState([]);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("");
    const [attendeeEmail, setAttendeeEmail] = useState("");
    const [error, setError] = useState(null);

    const removeMeetHandler = async (meeting) => {
       await excuseYourself(meeting);
        setMeetings(meetings.filter((item) => item._id !== meeting._id));
    };

    const getMeetings = async (event) => {
        event.preventDefault();
        const searchInfo = {
            day: day,
            desc: desc,
        };
        setStatus("LOADING-MEETING");
        try {
            setMeetings(await fetchMeeting(searchInfo));
            setStatus("LOADED-MEETING");
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
    const addNewAttendee = async (meeting) => {
        
       const newAttendeeResponse= await addAttendee(attendeeEmail,meeting._id);
        const newMeetings=meetings.map(item=>{

            if(item._id===meeting._id){
               
                return newAttendeeResponse;
            }
            return item;
        });
        
        setMeetings(newMeetings);
        
        
    }
    useEffect(() => {
        getUsers();
    }, []);

    const usersEles = users.map((user) => {
        return (
            <option value={user.email} user-id={user._id} key={user._id}>
                {" "}
                {user.email}
            </option>
        );
    });
 

    const meetingEles = meetings.map((meeting) => {
        let attendeesString = "";
        meeting.attendees.forEach((attendee) => {
            attendeesString += attendee.email + ", ";
        });
        return (
            <div
                className="meet-box my-2"
                data-meet-id={meeting._id}
                key={meeting._id}
                data-testid={meeting._id}
            >
                <div className="inline-flex">
                    <h3>{meeting.date.substr(0, 10)}</h3>
                    <div> &nbsp;
                        {" "}
                        {meeting.startTime.hours}:{meeting.startTime.minutes}:{" "}
                        {meeting.endTime.hours}:{meeting.endTime.minutes}
                    </div>
                </div>
                <div className="my-2">{meeting.name}</div>
                <div className="bottom-line-button">
                <button className="btn btn-danger my-3 excuse " 
                onClick={() => removeMeetHandler(meeting)}>
                    Excuse yourself
                </button>
                </div>
                
                <div className="my-2 member-names">
                    <b>Members:</b>
                    {attendeesString}
                </div>
                <form
                    action="success.html"
                    method="post"
                    encType="multipart/form-data"
                >
                    <label htmlFor="member"></label>
                    <select
                        id="member"
                        name="member"
                        placeholder="select member"
                        className="users select-height"
                        aria-describedby="select-member-help"
                        onChange={(event)=>{
                            setAttendeeEmail(event.target.value)
                          
                             
                        }}
                    >
                        <option value="">Select member</option>
                        {usersEles}
                    </select>
                    <button type="button" className="btn btn-primary members"
                    id='btn-members'
                    onClick={()=> addNewAttendee(meeting)} 
                    >
                        Add
                    </button>
                </form>
            </div>
        );
    });

   
    return (
        <div>
            <AppNavbar isActive={isActive} />
            <div className="search-meeting-page">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="This is search meetings page where you can filter your search from the given options to view your scheduled meetings." />
                <title>Search Meet</title>
            </Helmet>
                <main className="container">
                    <section>
                        <h2 className="bottom-line">Meetings</h2>
                        
                    </section>
                    <nav>
                        <ul className="list-unstyled list-inline container meet">
                            <li className="meet-item active-link">
                            <Link to ={"/search-meet"} className="meet-link">
                                    Filter/Search Meetings
                                </Link>
                            </li>
                            <li className="meet-item ">
                                <Link to={"/add-meet"} className="meet-link">
                                    Add a Meeting
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <section className="blue">
                        <h2 className="bottom-line">Search for Meetings</h2>
                        
                        <form onSubmit={(event)=>getMeetings(event)}
                        action="https://mymeetingsapp.herokuapp.com/api/search-meet"
                        method="post">
                            <span className="ib">
                                <label htmlFor="date">Date</label>
                            </span>
                            <span className="ib form">
                                <select
                                    name="date"
                                    id="date"
                                    className="input"
                                    value={day}
                                    onChange={(event) =>
                                        setDay(event.target.value)
                                    }
                                    aria-label="select the date for which you want to search the meetings"
                                >
                                    <option value="all">All</option>
                                    <option value="past">Past</option>
                                    <option value="present">Today</option>
                                    <option value="future">Upcoming</option>
                                </select>
                                <span id="date-error"></span>
                            </span>
                            <span className="ib">
                                <label htmlFor="description">Search for</label>
                            </span>

                            <span className="ib form">
                                <textarea
                                    name="search"
                                    id="description"
                                    cols="30"
                                    rows="3"
                                    placeholder="search using words which describe the meeting"
                                    aria-describedby="description-help"
                                    value={desc}
                                    onChange={(event) =>
                                        setDesc(event.target.value)
                                    }
                                ></textarea>
                                <span id="search-error"></span>

                                <div
                                    id="description-help"
                                    className="sr-only-blue"
                                >
                                    Add the description of the meeting
                                </div>
                            </span>
                            <span className="ib">
                                <button
                                    className="btn btn-primary"
                                    id="btn-search"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </span>
                        </form>
                    </section>
                    <div>
                        <h2 className="bottom-line">Meetings matching search criteria</h2>
                        {status === "LOADING-MEETING" && (
                            <div
                                className="alert alert-info "
                                role="alert"
                                id="meet-loading-message"
                                aria-label="We are fetching your meetings. Please wait."
                            >
                                We are fetching your meetings. Please wait.
                            </div>
                        )}
                       
                        {status === "ERROR-MEETING" && (
                            <div
                                className="alert alert-danger "
                                id="meet-error-loading-message"
                            >
                                {error}
                            </div>
                        )}
                                    
                        <div id="displaySearch">{meetingEles}</div>
                        
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SearchMeetPage;