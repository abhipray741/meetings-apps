import SearchMeetPage from "./SearchMeet";
import {
    findByRole,
    render,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import { Provider } from "react-redux";

test("should excuse a meeting", async () => {
    const onSetIsActive = (state) => {
    };
    render(
        <Provider store={store}>
            <BrowserRouter>
                <SearchMeetPage setActive={onSetIsActive} />
            </BrowserRouter>
        </Provider>
    );

    const searchMeetButton = await screen.findByRole("button", {
        name: /search/i,
    });
    userEvent.click(searchMeetButton);

    const meetingToBeExcused = await screen.findByTestId(
        "6203b5476b8f5c0015bbdf4b"
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const deleteButton = await findByRole(meetingToBeExcused, "button", {
        name: /Excuse yourself/i,
    });
    userEvent.click(deleteButton);

    await waitForElementToBeRemoved(meetingToBeExcused);
});
test('should fetch and load the initial set of meetings from the server', async() => {
    const onSetIsActive = (state) => {
    };
    render( <Provider store={store}>
        <BrowserRouter> 
        <SearchMeetPage setActive={onSetIsActive}/>
        </BrowserRouter>
        </Provider>);
        const submitButton = screen.getByRole("button", { name: /Search/i });
        userEvent.click(submitButton);

        const testEl = await screen.findByText( 'Meetings App data');
        expect (testEl).toBeInTheDocument();

});
test('should fetch and load the meeting', async() => {
    const onSetIsActive = (state) => {
    };
    render( <Provider store={store}>
        <BrowserRouter> 
        <SearchMeetPage setActive={onSetIsActive}/>
        </BrowserRouter>
        </Provider>);
        const submitButton = screen.getByRole("button", { name: /Search/i });
        userEvent.click(submitButton);

        const testEl = await screen.findByText( 'Final Demo');
        expect (testEl).toBeInTheDocument();

});
