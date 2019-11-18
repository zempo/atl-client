import React, { useEffect, useContext, useState } from "react";
import { useInput } from "../../Hooks/use-input";
import { AtlSection } from "../Utils/Utils";
import { UserContext } from "../../Contexts/UserContext";
import { splitColorData } from "../../Services/algos-service";
import { readThemes, readUser } from "../../Services/endpoints-service";
import "./Styles/Info.css";

const UserSettings = () => {
  const {
    value: { userColor, userName, setUserColor, loading, setLoading }
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
    setLoading(true);
    try {
      const updatedUser = await readUser.patch(`/`, userToPatch);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <AtlSection className="atl-pg settings-pg">
      <h1 className="animated-h1">Appearance</h1>
      <form className="atl-form user-edit-form">
        <button className="theme-update-btn" onClick={updateUser}>
          {loading ? "Painting..." : "Apply"}
        </button>
        <fieldset className="user-appearance">
          {colors.map((c, i) => {
            return (
              <label
                htmlFor="selectedColor"
                key={i}
                style={{
                  background: c,
                  opacity: selectedColor === c ? 1 : 0.7,
                  borderColor:
                    selectedColor === c
                      ? "rgb(243,243,243)"
                      : "rgba(49,49,49, 0.2)"
                }}
              >
                <input
                  type="radio"
                  name="selectedColor"
                  value={c}
                  checked={selectedColor === c}
                  onChange={handleColor}
                  tabIndex="0"
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
