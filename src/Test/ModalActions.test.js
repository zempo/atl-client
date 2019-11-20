import React from "react";
import ReactDOM from "react-dom";
// setup
// import {BrowserRouter as ROUTER} from 'react-router-dom'
import {shallow} from 'enzyme'
import { UserContextProvider as UserProvider } from "../Contexts/UserContext";
import { ScriptsContextProvider as ScriptsProvider } from "../Contexts/ScriptsContext";
// import { StyleContextProvider as StyleProvider } from "../Contexts/StyleContext";
// import { EditContextProvider as EditProvider } from "../Contexts/EditContext";
// components
import AddScript from "../Components/Forms/ModalForms/AddScript";
import CopyScript from "../Components/Forms/ModalForms/CopyScript";
import DeleteScript from "../Components/Forms/ModalForms/DeleteScript";
import DeleteListScript from "../Components/Forms/ModalForms/DeleteListScript";
import PrintListScript from "../Components/Forms/ModalForms/PrintListScript";


// configure({adapter: new Adapter()})

afterAll(() => {
  const originalErr = console.log('Ignore Context Warning')
  console.error = jest.fn()
  console.error = originalErr

})

describe('Modal Action/Form Components', () => {
  afterEach(() => {
    const originalErr = console.log('Ignore Context Warning')
    console.error = jest.fn()
    console.error = originalErr
  })

  it("renders AddScript.js without crashing", () => {
    const addScript = shallow( 
      
      <ScriptsProvider>
        <UserProvider>
      <AddScript />
      </UserProvider>
    </ScriptsProvider>);
    let exists = addScript.exists()
    console.log(exists)
});

it("renders DeleteListScript.js without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DeleteListScript />, div);
ReactDOM.unmountComponentAtNode(div);
});

it("renders DeleteScript.js without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DeleteScript/>, div);
ReactDOM.unmountComponentAtNode(div);
});

it("renders CopyScript.js without crashing", () => {
 const copyScript = shallow(<ScriptsProvider>
    <UserProvider>
  <CopyScript />
  </UserProvider>
</ScriptsProvider>);
    let exists = copyScript.exists()
    console.log(exists) 
});

it("renders PrintListScript.js without crashing", () => {
  const printListScript = shallow(<PrintListScript/>)

    let exists = printListScript.exists()
console.log(exists)
});

}) 