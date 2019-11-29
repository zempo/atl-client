import React from "react";
import ReactDOM from "react-dom";
// setup
import {shallow} from 'enzyme'
// components
import { PaginateScripts, MenuOption, NavMenuOption, AtlNotification, AddBtn, BackBtn, AtlSection, Hyph, Required } from "../Components/Utils/Utils";
import { UserContextProvider } from "../Contexts/UserContext";

// configure({adapter: new Adapter()})

afterAll(() => {
  const originalErr = console.log('Ignore Context Warning')
  console.error = jest.fn()
  console.error = originalErr

})

describe('Navigation/Pagination Utilities', () => {
  afterEach(() => {
    const originalErr = console.log('Ignore Context Warning')
    console.error = jest.fn()
    console.error = originalErr
  })

  it("renders PaginateScripts.js without crashing", () => {
    const paginateScripts = shallow(
    <PaginateScripts/>
    )
  
    let exists = paginateScripts.exists()
    console.log(exists)
  });

  it("renders MenuOption.js without crashing", () => {
    const menuOption = shallow(
    <MenuOption/>
    )
  
    let exists = menuOption.exists()
    console.log(exists)
  });

  it("renders NavMenuOption.js without crashing", () => {
    const navMenuOption = shallow(
    <NavMenuOption/>
    ) 
  
    let exists = navMenuOption.exists()
    console.log(exists)
  });
})

 
describe('Buttons and Notification Utilities', () => {
  afterEach(() => {
    const originalErr = console.log('Ignore Context Warning')
    console.error = jest.fn()
    console.error = originalErr
  })



  it("renders AltNotification.js without crashing", () => {
  const notification = shallow(<AtlNotification/>)
  let exists = notification.exists()
  console.log(exists)
});

it("renders AddButton.js without crashing", () => {
  const addButton = shallow(
  <UserContextProvider>
  <AddBtn/>
  </UserContextProvider>
  )

  let exists = addButton.exists()
  console.log(exists)
});

it("renders BackButton.js without crashing", () => {
  const backButton = shallow(
  <UserContextProvider>
  <BackBtn/>
  </UserContextProvider>
  )

  let exists = backButton.exists()
  console.log(exists)
});

})

describe('Semantic Utilities', () => {
  afterEach(() => {
    const originalErr = console.log('Ignore Context Warning')
    console.error = jest.fn()
    console.error = originalErr
  })

  it("renders Required.js without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
          <Required />
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders Hyph.js without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
        <Hyph />
, div);
ReactDOM.unmountComponentAtNode(div);
});

it("renders AtlSection.js without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
        <AtlSection />
, div);
ReactDOM.unmountComponentAtNode(div);
});
})