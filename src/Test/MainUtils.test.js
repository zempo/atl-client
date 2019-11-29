import React from "react";
// setup
// import {BrowserRouter as ROUTER} from 'react-router-dom'
import {shallow} from 'enzyme'
import { UserContextProvider as UserProvider } from "../Contexts/UserContext";
import { ScriptsContextProvider as ScriptsProvider } from "../Contexts/ScriptsContext";
import { StyleContextProvider as StyleProvider } from "../Contexts/StyleContext";
import { EditContextProvider as EditProvider } from "../Contexts/EditContext";
// components
import Input from "../Components/Utils/Editor/Inputs";
import Output from "../Components/Utils/Editor/Outputs";
import Sidebar from "../Components/Utils/Editor/Sidebar";
import ListScript from "../Components/Utils/Scripts/ListScript";
import ListSearchScript from "../Components/Utils/Scripts/ListSearchScript";
import AuthorizedRoute from "../Components/Utils/Auth/AuthorizedRoute";
import PublicRoute from "../Components/Utils/Auth/PublicRoute";
import { SkeletonLoaderScripts } from "../Components/Utils/Scripts/SkeletonScripts";

// configure({adapter: new Adapter()})

afterAll(() => {
  const originalErr = console.log('Ignore Context Warning')
  console.error = jest.fn()
  console.error = originalErr

})

describe('Auth Utilities', () => {
    afterEach(() => {
        const originalErr = console.log('Ignore Context Warning')
        console.error = jest.fn()
        console.error = originalErr
      })

      it("renders AuthorizedRoute.js without crashing", () => {
        const privateRoute = shallow(
                    <AuthorizedRoute />)
        let exists = privateRoute.exists()
        console.log(exists)
    }); 

    it("renders AuthorizedRoute.js without crashing", () => {
        const publicRoute = shallow(
                    <PublicRoute />)
        let exists = publicRoute.exists()
        console.log(exists)
    }); 

})

  
describe('Editor Utilities', () => {
  afterEach(() => {
    const originalErr = console.log('Ignore Context Warning')
    console.error = jest.fn()
    console.error = originalErr
  })

  it("renders Input.js without crashing", () => {
    const editorInput = shallow(
        <UserProvider> 
            <ScriptsProvider>
            <StyleProvider>
              <EditProvider>
                <Input />
              </EditProvider>
            </StyleProvider>
            </ScriptsProvider>
        </UserProvider>)
    let exists = editorInput.exists()
    console.log(exists)
});

it("renders Output.js without crashing", () => {
    const editorOutput = shallow(
        <UserProvider> 
            <ScriptsProvider>
            <StyleProvider>
              <EditProvider>
                <Output/>
              </EditProvider>
            </StyleProvider>
            </ScriptsProvider>
        </UserProvider>)
    let exists = editorOutput.exists()
    console.log(exists)
});

it("renders Sidebar.js without crashing", () => {
    const editorSidebar = shallow(
        <UserProvider> 
            <ScriptsProvider>
            <StyleProvider>
              <EditProvider>
                <Sidebar />
              </EditProvider>
            </StyleProvider>
            </ScriptsProvider>
        </UserProvider>)
    let exists = editorSidebar.exists()
    console.log(exists)
});

})

describe('Script Utilities', () => {
    afterEach(() => {
      const originalErr = console.log('Ignore Context Warning')
      console.error = jest.fn()
      console.error = originalErr
    })
  
    it("renders ListScript.js without crashing", () => {
      const listScript = shallow(
                  <ListScript script={{title: "", author: "sosos", subtitle: "ssfds"}} />)
      let exists = listScript.exists()
      console.log(exists)
  });

  it("renders ListSearchScript.js without crashing", () => {
    const listSearchScript = shallow(
                <ListSearchScript script={{title: "", author: "sosos", subtitle: "ssfds"}} />)
    let exists = listSearchScript.exists()
    console.log(exists)
});

it("renders SkeletonLoaderScripts.js without crashing", () => {
    const skeletonLoader = shallow(
                <SkeletonLoaderScripts />)
    let exists = skeletonLoader.exists()
    console.log(exists) 
});
   
  })
 
