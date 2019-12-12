import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { readUsers } from "../../Services/endpoints-service";
import { AtlSection } from "../Utils/Utils";
import "./Styles/Misc.css";

export const UsersPage = () => {
  const [usrs, setUsrs] = useState([]);
  const {
    value: { admin }
  } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    const callUsers = async () => {
      try {
        const result = await readUsers.get("/");

        setUsrs(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    callUsers();
  }, []);
  return (
    <AtlSection className="atl-pg admin-pg">
      <h1>Admin</h1>
      <ul>
        {usrs.map((usr, i) => {
          return (
            <li key={i}>
              <h3>{usr.user_name}</h3>
            </li>
          );
        })}
      </ul>
    </AtlSection>
  );
};
