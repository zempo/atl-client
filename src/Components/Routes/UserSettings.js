import React, { useEffect, useContext, useState } from "react";
import { useInput } from "../../Hooks/use-input";
import { AtlSection } from "../Utils/Utils";
import { UserContext } from "../../Contexts/UserContext";
import { splitColorData } from "../../Services/algos-service";
import { readThemes, readUser } from "../../Services/endpoints-service";
import "./Styles/Info.css";

const UserSettings = () => {
  const {
    value: { userColor, userName, setUserColor }
  } = useContext(UserContext);
  const [selectedColor, setSelectedColor] = useState(userColor);
  const [colors, setColors] = useState([]);
  const [usr, setUsr] = useState({
    currentName: "",
    currentColor: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const getColors = async () => {
      let fetchedColors = [];
      try {
        const result1 = await readUser.get("/");
        setUsr({
          currentName: result1.data.user_name,
          currentColor: result1.data.theme
        });
        setSelectedColor(result1.data.theme);
        const result2 = await readThemes.get("/");
        const process = await splitColorData(result2.data);

        setColors(process);
      } catch (error) {
        console.log(error);
      }
    };

    getColors();
  }, []);

  const handleColor = e => {
    const { value } = e.target;
    setSelectedColor(value);
    setUserColor(value);
  };

  // const handleChange = e => {
  //   const { value } = e.target;
  //   setUsr({
  //     currentColor: selectedColor,
  //     currentName: value
  //   });
  // };

  const updateUser = async e => {
    e.preventDefault();

    let userToPatch = {};
    userToPatch.theme = selectedColor;

    try {
      const updatedUser = await readUser.patch(`/`, userToPatch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AtlSection className="atl-pg settings-pg">
      <h1 className="animated-h1">Update My Settings</h1>
      <form className="atl-form user-edit-form">
        {/* <fieldset className="user-account">
          <label htmlFor="username">Edit Username?</label>
          <input
            type="text"
            name="username"
            defaultValue={usr.currentName}
            onChange={handleChange}
          />
        </fieldset> */}
        <button className="theme-update-btn" onClick={updateUser}>
          Apply
        </button>
        <fieldset className="user-appearance">
          {colors.map((c, i) => {
            return (
              <label htmlFor="selectedColor" key={i} style={{ background: c }}>
                <input
                  type="radio"
                  name="selectedColor"
                  value={c}
                  checked={selectedColor === c}
                  onChange={handleColor}
                />
              </label>
            );
          })}
        </fieldset>
      </form>
    </AtlSection>
  );
};

export default UserSettings;
