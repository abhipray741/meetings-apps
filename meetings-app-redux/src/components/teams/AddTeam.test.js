import AddTeam from "./AddTeam";
import  {  render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";

describe("AddTeam form on submit", () => {
    const newTeam = {
        name: "Code Crew",
        shortName: "group-1",
        description: "final demo test run ",
    };

    let nameInput, shortNameInput, descriptionInput, submitButton;

    beforeEach(() => {
        
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <AddTeam />
                </BrowserRouter>
            </Provider>
        );
        // const newTeamButton= screen.getByRole("button" ,{name : '+'})
        // userEvent.click(newTeamButton)

        let nameInput = screen.getByLabelText(/enter team name/i);

        shortNameInput = screen.getByLabelText(/Team Short Name/i);
        descriptionInput = screen.getByLabelText(/description/i);

        submitButton = screen.getByRole("button", {
            name: /click on this button to add the team/i,
        });

        userEvent.clear(nameInput);
        userEvent.clear(shortNameInput);
        userEvent.clear(descriptionInput);
    });

    const fillAndSubmit = (team) => {
        userEvent.type(nameInput, team.name);
        userEvent.type(shortNameInput, team.shortName);
        userEvent.type(descriptionInput, team.description);

        userEvent.click(submitButton);
    };

    test("should display error when name is not filled", async () => {
        fillAndSubmit({
            ...newTeam,
            name: "",
        });

        const errorMessageEl = await screen.findByText(
            /Team name cannot be empty/i
        );
        expect(errorMessageEl).toBeInTheDocument();
    });


    test("should display error when shortName is not filled", async () => {
        fillAndSubmit({
            ...newTeam,
            shortName: "",
        });

        const errorMessageEl = await screen.findByText(
            /Team short name cannot be empty/i
        );
        expect(errorMessageEl).toBeInTheDocument();
    });

    test("should display error when description is not filled", async () => {
        fillAndSubmit({
            ...newTeam,
            description: "",
        });

        const errorMessageEl = await screen.findByText(
            /Team description cannot be empty/i
        );
        expect(errorMessageEl).toBeInTheDocument();
    });

});