import AddMeetPage from "./AddMeet";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import store from "../../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


describe("AddMeeting form on submit", () => {
    const meetingUser = {
        name: "Final demo",
        date: "2022-03-27",
        description: "Final demo meeting",
        startTime: {
            hours: 14,
            minutes: 15,
        },
        endTime: {
            hours: 16,
            minutes: 15,
        },
        attendees: [
            "jatingarg@example.com,srishti@example.com,ayushi@example.com,shubam@example.com,abhipraya@example.com",
        ],
    };

    let nameInput, dateInput, descriptionInput, submitButton;

    beforeEach( async () => {
       

    const onSetIsActive = (state) => {
    };
     // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AddMeetPage  setActive={onSetIsActive}/>
                </BrowserRouter>
            </Provider>
        );

        nameInput = await screen.findByLabelText(/Name of the Meeting/i);
        dateInput = await screen.findByLabelText(/Date/i);
        descriptionInput = await screen.findByLabelText(/Description/i);

        submitButton = screen.getByRole("button", { name: /Add meeting/i });

        userEvent.clear(nameInput);
        userEvent.clear(dateInput);
        userEvent.clear(descriptionInput);
    });

    // helper method called in tests in this test suite
    const fillAndSubmit = (meeting) => {
        userEvent.type(nameInput, meeting.name);
        userEvent.type(dateInput, meeting.date);
        userEvent.type(descriptionInput, meeting.description);

        userEvent.click(submitButton);
    };

    test("should display error when name is not filled", async () => {
        fillAndSubmit({
            ...meetingUser,
            name: "",
        });

        const errorMessageEl = await screen.findByText(
            /Meeting name is required/i
        );
        expect(errorMessageEl).toBeInTheDocument();
    });

    test("should display error when description is not filled", async () => {
        fillAndSubmit({
            ...meetingUser,
            description: "",
        });

        const errorMessageEl = await screen.findByText(
            /Description is required/i
        );
        expect(errorMessageEl).toBeInTheDocument();
    });

    test("should display error when startDate is not filled", async () => {
        fillAndSubmit({
            ...meetingUser,
            date: "",
        });

        const errorMessageEl = await screen.findByText(/Date is required/i);
        expect(errorMessageEl).toBeInTheDocument();
    });
    
});
test("should add a meeting", async () =>{
    const onSetIsActive = (state) => {
    };
    render(
        <Provider store={store}>
            <BrowserRouter>
                <AddMeetPage  setActive={onSetIsActive}/>
            </BrowserRouter>
        </Provider>
    );
    const meeting = {
        name: "Final demo",
        date: "2022-03-26",
        description: "Final demo meeting",
        startTime: {
            hours: "14",
            minutes: "15",
        },
        endTime: {
            hours: "16",
            minutes: "15",
        },
        attendees: [
            "jatingarg@example.com,srishti@example.com,ayushi@example.com,shubam@example.com,abhipraya@example.com",
        ],
    };
    let nameInput, dateInput, descriptionInput, submitButton,startTimeHour,endTimeHour,starttimeMinute,endTimeMinute;
    nameInput = screen.getByLabelText(/Name of the Meeting/i);
        dateInput =  screen.getByLabelText(/Date/i);
        descriptionInput =  screen.getByLabelText(/Description/i);
        endTimeHour = screen.getByLabelText(/select end time hour/i)
        startTimeHour = screen.getByLabelText(/select start time hour/i)
        endTimeMinute = screen.getByLabelText(/select end time minute/i)
        starttimeMinute = screen.getByLabelText(/select start time minute/i)

        submitButton = screen.getByRole("button", { name: /Add meeting/i });
       
        userEvent.clear(nameInput);
        userEvent.clear(dateInput);
        userEvent.clear(descriptionInput);
           
        userEvent.type(nameInput, meeting.name);
        userEvent.type(dateInput, meeting.date);
        userEvent.type(descriptionInput, meeting.description); 
        userEvent.selectOptions(startTimeHour, meeting.startTime.hours)
        userEvent.selectOptions(starttimeMinute, meeting.startTime.minutes)
        userEvent.selectOptions(endTimeMinute, meeting.endTime.minutes)
        userEvent.selectOptions(endTimeHour, meeting.endTime.hours)

        userEvent.click(submitButton);
        const newMeet= await screen.findByText(/Meeting successfully added/i);
    expect(newMeet).toBeInTheDocument();    
})

