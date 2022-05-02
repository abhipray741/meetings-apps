import CalendarPage from './Calendar';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import   store  from '../../store';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

test('should show a loading message when it start up', () => {
    const onSetIsActive = (state) => {
    };
    render(
        <Provider store={store}> 
        <BrowserRouter>
    <CalendarPage setActive={onSetIsActive}/>
    </BrowserRouter>
    </Provider> );

    const loadingMessage = screen.getByRole( 'alert', {name : 'meetings are being fetched'} );
    expect( loadingMessage ).toHaveTextContent( 'We are fetching the meetings for date 2022-03-25. Please wait.' );
});

test('should fetch and load the initial set of meetings from the server', async() => {
    const onSetIsActive = (state) => {
    };
    render( <Provider store={store}>
        <BrowserRouter> 
        <CalendarPage setActive={onSetIsActive}/>
        </BrowserRouter>
        </Provider>);


    userEvent.type(screen.getByLabelText('select date to get meetings'),'2022-02-14');

    const testEl = await screen.findByText( 'Meetings App data' );
    const test1El = await screen.findByText( 'Meetings App');

    expect(testEl).toBeInTheDocument();
    expect( test1El ).toBeInTheDocument();


    const loadingMessage = screen.queryByRole( 'alert', {name : 'We are fetching the meetings for date 2022-02-14. Please wait.'} );
    expect( loadingMessage ).not.toBeInTheDocument();
});