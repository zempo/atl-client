import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { readUsers } from "../../Services/endpoints-service";
import { AtlSection, AtlNotification } from "../Utils/Utils";
import "./Styles/Misc.css";

export const UsersPage = () => {
  const [usrs, setUsrs] = useState([]);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);
  const [current, setCurrent] = useState(0);

  const {
    // eslint-disable-next-line
    value: { admin, user },
  } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    const callUsers = async () => {
      try {
        const result = await readUsers.get("/");

        setUsrs(result.data.payload);
      } catch (err) {
        console.log(err);
      }
    };

    callUsers();
  }, []);

  const deleteUsr = async (id) => {
    setCurrent(id);
    try {
      // eslint-disable-next-line
      const delUsr = await readUsers.delete(`/${id}`);

      setResStatus(201);
      setResMsg("User Deleted");
      setTimeout(() => {
        setResStatus(0);
      }, 3000);
    } catch (err) {
      setResStatus(err.response.status);
      setResMsg(Object.values(err.response.data.message));
      console.log(err);
      setTimeout(() => {
        setResStatus(0);
      }, 3000);
    }
  };

  return (
    <AtlSection className='atl-pg admin-pg'>
      <h1>Administration</h1>
      <ul>
        {usrs.map((usr, i) => {
          if (usr.user_name !== user.user_name) {
            return (
              <li key={i}>
                {resStatus > 0 && usr.id === current ? (
                  <>
                    <br />
                    <AtlNotification type={resStatus} msg={resMsg} />
                  </>
                ) : null}
                <h3>{usr.user_name}</h3>
                <button
                  onClick={(e) => deleteUsr(usr.id)}
                  className='admin-btn'
                >
                  Delete
                </button>
              </li>
            );
          }
        })}
      </ul>
    </AtlSection>
  );
};
