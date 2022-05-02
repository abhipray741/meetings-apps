import TeamsPage from "./Teams";
import  { findByRole, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";

test('should excuse a meeting', async () => {
    const onSetIsActive = (state) => {
    };
    render( <Provider store={store}>
        <BrowserRouter> 
        <TeamsPage setActive={onSetIsActive}/>
        </BrowserRouter>
        </Provider>);


  
        const TeamToBeExcused = await screen.findByTestId( "6215c873199e4b0015be1f38" );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const deleteButton = await findByRole( TeamToBeExcused , 'button', { name: /Excuse yourself/i } );
    userEvent.click( deleteButton );
    await waitForElementToBeRemoved( TeamToBeExcused );



});

test("should fetch and load the teams", async () => {
    const onSetIsActive = (state) => {
    };
    render(
        <Provider store={store}>
            <BrowserRouter>
                <TeamsPage setActive={onSetIsActive}/>
            </BrowserRouter>
        </Provider>
    );

    const Team1El = await screen.findByText("Team spreading awareness about Agile practices at Zwiggy");
    expect(Team1El).toBeInTheDocument();

    const Team2El = await screen.findByText("Final Demo");
    expect(Team2El).toBeInTheDocument();

    const loadingMessage = screen.queryByRole("alert", {
        name: "We are fetching the teams. Please wait.",
    });
    expect(loadingMessage).not.toBeInTheDocument();
});
test("should show a loading message when it start up", () => {
    const onSetIsActive = (state) => {
    };
    render(
        <Provider store={store}>
            <BrowserRouter>
                <TeamsPage setActive={onSetIsActive}/>
            </BrowserRouter>
        </Provider>
    );

    const loadingMessage = screen.getByRole("alert", {
        name: "We are fetching the teams. Please wait."
    });
    expect(loadingMessage).toHaveTextContent("We are fetching the teams. Please wait.");
});
