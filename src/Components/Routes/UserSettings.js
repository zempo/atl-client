import React, { useEffect, useContext, useState } from "react";
import { AtlSection } from "../Utils/Utils";
import { UserContext } from "../../Contexts/UserContext";
import { readUser } from "../../Services/endpoints-service";
import "./Styles/Info.css";

const userThemes = [
  "#AD1457",
  "#d45d5d",
  "#E76F51",
  "#6B8F71",
  "#388E3C",
  "#2E7D32",
  "#00695C",
  "#455A64",
  "#2E6171",
  "#1565C0",
  "#4464AD",
  "#67597A",
  "#5E4955",
  "#5D4037",
  "#8E3B46",
  "#424242",
  "#264653",
  "#073B3A",
  "#034078",
  "#283593",
  "#001F54",
  "#391463",
  "#41292C",
  "#1B2021",
];

const UserSettings = () => {
  const {
    value: { userColor, setUserColor, loading, setLoading },
  } = useContext(UserContext);
  const [selectedColor, setSelectedColor] = useState(userColor);
  const [colors, setColors] = useState([]);
  // eslint-disable-next-line
  const [usr, setUsr] = useState({
    currentName: "",
    currentColor: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const getColors = async () => {
      // eslint-disable-next-line
      let fetchedColors = [];
      try {
        const result1 = await readUser.get("/");
        setUsr({
          currentName: result1.data.payload.user_name,
          currentColor: result1.data.payload.theme,
        });
        setSelectedColor(result1.data.payload.theme);
        // const result2 = await readThemes.get("/");
        // const process = await splitColorData(result2.data);
        setColors(userThemes);
      } catch (error) {
        console.log(error);
      }
    };

    getColors();
  }, []);

  const handleColor = (e) => {
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

  const updateUser = async (e) => {
    e.preventDefault();

    let userToPatch = {};
    userToPatch.theme = selectedColor;
    setLoading(true);
    try {
      // eslint-disable-next-line
      const updatedUser = await readUser.patch(`/`, userToPatch);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  return (
    <AtlSection className='atl-pg settings-pg'>
      <h1 className='animated-h1'>Appearance</h1>
      <form className='atl-form user-edit-form'>
        <button className='theme-update-btn' onClick={updateUser}>
          {loading ? "Painting..." : "Apply"}
        </button>
        <fieldset className='user-appearance'>
          {colors.map((c, i) => {
            return (
              <label
                htmlFor='selectedColor'
                key={i}
                style={{
                  background: c,
                  opacity: selectedColor === c ? 1 : 0.7,
                  borderColor:
                    selectedColor === c
                      ? "rgb(243,243,243)"
                      : "rgba(49,49,49, 0.2)",
                }}
              >
                <input
                  type='radio'
                  name='selectedColor'
                  value={c}
                  checked={selectedColor === c}
                  onChange={handleColor}
                  tabIndex='0'
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
