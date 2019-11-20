import React from "react";
import ReactDOM from "react-dom";
// setup
import {shallow} from 'enzyme'
import { UserContextProvider as UserProvider } from "../Contexts/UserContext";
import { ScriptsContextProvider as ScriptsProvider } from "../Contexts/ScriptsContext";
import { StyleContextProvider as StyleProvider } from "../Contexts/StyleContext";
import { EditContextProvider as EditProvider } from "../Contexts/EditContext";
// components
import LoginForm from "../Components/Forms/Auth/LoginForm";
import RegisterForm from "../Components/Forms/Auth/RegisterForm";
import { ScriptsSearch } from "../Components/Forms/Search/ScriptsSearch";

// configure({adapter: new Adapter()})

afterAll(() => {
  const originalErr = console.log('Ignore Context Warning')
  console.error = jest.fn()
  console.error = originalErr

}) 
 
describe('Non-Modal Form Components', () => {
  afterEach(() => {
    const originalErr = console.log('Ignore Context Warning')
    console.error = jest.fn()
    console.error = originalErr
  })

  it("renders LoginForm.js without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LoginForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders LoginForm.js without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RegisterForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders ScriptsSearch.js', () => {
    const scriptsPage = shallow(
        <UserProvider> 
            <ScriptsProvider>
            <StyleProvider>
              <EditProvider>
                <ScriptsSearch />
              </EditProvider>
            </StyleProvider>
            </ScriptsProvider>
        </UserProvider>)
    let exists = scriptsPage.exists()
    console.log(exists)
});


})