import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import "./calendar.scss";
import AppNavbar from "../AppNavbar/AppNavbar";
import  getMeetings  from "../Services/Calendar";

const CalendarPage = ({ setActive, isActive }) => {
    setActive("CALENDAR");
    const [meetings, setMeetings] = useState([]);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = String(today.getFullYear());
    const [status,setStatus] = useState("");
    const [error,setError] = useState("");
    const hours = [...Array(24).keys()];

    const todayDate = yyyy + "-" + mm + "-" + dd;
    const [date, setDate] = useState(todayDate);
    const Calendar = async () => {
      
        
        try {
            setStatus("LOADING");
            const calendarResponse = await getMeetings(date)
      
            setMeetings(calendarResponse);
            setStatus("LOADED");
            setError(null)
           
            
        } catch (error) {
            setStatus("ERROR")
            setError(error.message);
        }
    };
    
    useEffect(() => {
        Calendar(date);
    }, []);
    useEffect(() => {
        Calendar(date);
    }, [date]);
   
    const calEles = meetings.map((meeting) => {
        let attendeesString = "";
        meeting.attendees.forEach((attendee) => {

            attendeesString += attendee.email + ", ";

        });
        const st = meeting.startTime.hours + meeting.startTime.minutes / 60;
        const et = meeting.endTime.hours + meeting.endTime.minutes / 60;
       
        const height =
            (et - st) * 40 + (Math.ceil(et) - Math.floor(st) - 1) * 4;
        const top = Math.floor(st) * 44 + (st % 1) * 40;
        return(
            <div className="meeting"  style={{height:`${height}px` , top:`${top}px`}} key={meeting._id}>
                        <div className="meeting-name">{meeting.name} </div>
                        <div className="meeting-info">Attendees :{attendeesString}
                    </div>
            </div>
        );
    });
    const ShowDate = (date) => {
        const dateArr = date.split("-");

        const month = {
            "01": "Jan",
            "02": "Feb",
            "03": "Mar",
            "04": "Apr",
            "05": "May",
            "06": "June",
            "07": "Jul",
            "08": "Aug",
            "09": "Sept",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec",
        };
        const day = {
            "1": "Monday",
            "2": "Tuesday",
            "3": "Wednesday",
            "4": "Thursday",
            "5": "Friday",
            "6": "Saturday",
            "0": "Sunday",
        };
        const dateDay = new Date(date);
        return(
            <div>
                <h2 className="currentdate">{dateArr[2]} {
            month[dateArr[1] ]
        } {dateArr[0]}</h2>
        <h3 className="currentday">{day[dateDay.getDay() ]}</h3>
            </div>
        )
        // dayDate.innerHTML = `
        
       
       
    };
    return (
        <div>
            <AppNavbar isActive={isActive} />
            <div className="calendar-page">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Calendar page to view your daily meetings." />
                <title>Calendar</title>
            </Helmet>
                <main className="container">
                    <section>
                        <h2>Calendar</h2>
                        <hr />
                        <div className="space-between align-center">
                            <div className="date-heading-child">
                                {ShowDate(date)}
                               
                            </div>

                            <div className="right-align">
                                <form action="success.html" method="post">
                                   
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        min="1990-01-01"
                                        aria-label = "select date to get meetings"
                                        value={date}
                                        onChange={(event) =>
                                            setDate(event.target.value)
                                        }
                                    />

                                   
                                    <div id="date-help" className="sr-only">
                                        Select date for which you want to view
                                        calendar page
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                    <div>
                        {status === "LOADING" && (
                                <div
                                    className="alert alert-info "
                                    id="calendar-loading-message"
                                    role="alert" 
                                    aria-label="meetings are being fetched"
                                >
                                    We are fetching the meetings for date {date}. Please wait.
                                </div>
                            )}
                           
                            {status === "ERROR" && (
                                <div
                                    className="alert alert-danger "
                                    id="teams-error-loading-message"
                                >   {error}
                                    
                                </div>
                            )}
                        </div>
                    <div className="calender">
                        <ol start="0" className="hours">
                            {hours.map((hour) => (
                                        <li  key={`dayHour-${hour}`}></li>
                                    ))}
                        </ol>
                        <div className="meetings">{status==="LOADED"&&calEles}</div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CalendarPage;
