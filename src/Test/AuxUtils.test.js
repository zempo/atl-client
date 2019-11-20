import React from "react";
import ReactDOM from "react-dom";
// setup
import {BrowserRouter as ROUTER} from 'react-router-dom'
import { UserContextProvider as UserProvider } from "../Contexts/UserContext";
// components
import Nav from "../Components/Static/Nav";
import Footer from "../Components/Static/Footer";

// configure({adapter: new Adapter()})

afterAll(() => {
  const originalErr = console.log('Ignore Context Warning')
  console.error = jest.fn()
  console.error = originalErr

})
 
describe('Static/Layout Components', () => {
  afterEach(() => {
    const originalErr = console.log('Ignore Context Warning')
    console.error = jest.fn()
    console.error = originalErr
  })

  it("renders Nav.js without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <UserProvider> 
        <ROUTER> 
          <Nav />
        </ROUTER>
  </UserProvider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

})