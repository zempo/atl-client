import React from "react";
import ReactDOM from "react-dom";
// setup
import { UserContextProvider as UserProvider } from "../Contexts/UserContext";
import { StyleContextProvider as StyleProvider } from "../Contexts/StyleContext";
import { EditContextProvider as EditProvider } from "../Contexts/EditContext";
// components
import App from "../Components/App";
import Modal from '../Modals/Modal'

// configure({adapter: new Adapter()})

afterAll(() => {
  const originalErr = console.log('Ignore Context Warning')
  console.error = jest.fn()
  console.error = originalErr

})

describe('MAIN App/Modal smoke tests', () => {
  afterEach(() => {
    const originalErr = console.log('Ignore Context Warning')
    console.error = jest.fn()
    console.error = originalErr
  })

  it("renders App.js without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <UserProvider> 
      <StyleProvider>
        <EditProvider>
          <App />
        </EditProvider>
      </StyleProvider>
  </UserProvider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders Modal.js without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
  <UserProvider> 
    <StyleProvider>
      <EditProvider>
        <Modal />
      </EditProvider>
    </StyleProvider>
</UserProvider>
, div);
ReactDOM.unmountComponentAtNode(div);
});

})