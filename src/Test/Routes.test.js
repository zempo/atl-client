import React from "react";
import ReactDOM from "react-dom";
// setup
import {shallow} from 'enzyme'
import {BrowserRouter as ROUTER} from 'react-router-dom'
import { UserContextProvider as UserProvider } from "../Contexts/UserContext";
import { ScriptsContextProvider as ScriptsProvider } from "../Contexts/ScriptsContext";
import { StyleContextProvider as StyleProvider } from "../Contexts/StyleContext";
import { EditContextProvider as EditProvider } from "../Contexts/EditContext";
// components
import ErrorPage from "../Components/Routes/ErrorPage";
import Landing from "../Components/Routes/Landing";
import ScriptsPage from "../Components/Routes/ScriptsPage";
import Login from "../Components/Routes/LoginPage";
import RegistrationPage from "../Components/Routes/RegisterPage";
import UserGuide from "../Components/Routes/UserGuide";
import UserSettings from "../Components/Routes/UserSettings";
import ScriptEditor from "../Components/Routes/ScriptEditor";

// configure({adapter: new Adapter()})

afterAll(() => {
    const originalErr = console.log('Ignore Context Warning')
    console.error = jest.fn()
    console.error = originalErr
    
})

describe('Router Pages', () => {
    afterEach(() => {
        const originalErr = console.log('Ignore Context Warning')
        console.error = jest.fn()
        console.error = originalErr
        console.clear()
    })
     

  it("renders Landing.js without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
    <ROUTER>
      <Landing/>
    </ROUTER>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders LoginPage.js without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders RegisterPage.js without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RegistrationPage/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders UserGuide.js without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<UserGuide/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders UserSettings.js without crashing", () => {
    const userSettings = shallow(
        <UserProvider>
        <UserSettings/>
        </UserProvider> 
    )

    let exists = userSettings.exists()
console.log(exists)

});

it("renders ScriptsPage.js without crashing", () => {
    // throws warning, but test passes
//     const div = document.createElement("div");
//     let setDirection = 'foo'
//     ReactDOM.render(
//     <UserProvider> 
//         <ScriptsProvider value={{setDirection}}>
//         <StyleProvider>
//           <EditProvider>
//             <ScriptsPage />
//           </EditProvider>
//         </StyleProvider>
//         </ScriptsProvider>
//     </UserProvider>, div);
//   ReactDOM.unmountComponentAtNode(div);
  const scriptsPage = shallow(
    <UserProvider> 
        <ScriptsProvider>
        <StyleProvider>
          <EditProvider>
            <ScriptsPage />
          </EditProvider>
        </StyleProvider>
        </ScriptsProvider>
    </UserProvider>)
let exists = scriptsPage.exists()
console.log(exists)
}); 

it("renders ScriptsEditor.js without crashing", () => {
    const div = document.createElement("div");
    let prop = {location: {state: {item: {id: "", body: ""}}}, history: {}}
    const scriptEditor = shallow(    <UserProvider> 
        <EditProvider>
          <ScriptEditor props={prop} />
        </EditProvider>
  </UserProvider>)
  let exists = scriptEditor.exists()
  console.log(exists)
}); 


it("renders ErrorPage.js without crashing", () => {
    const errPg = shallow(
        <UserProvider>
        <ErrorPage/>
        </UserProvider> 
    )

    let exists = errPg.exists()
console.log(exists)

});

}) 