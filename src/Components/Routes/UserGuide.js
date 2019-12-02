import React, { useEffect } from "react";
import { AtlSection } from "../Utils/Utils";

const UserGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="animated-h1">Getting Started</h1>
      <AtlSection className="started-pg">
        <h3>Edit Your First Script</h3>
        <ol>
          <li>Click the 'Hello, Screenplay' script</li>
          <li>Then click the 'edit'/pencil icon</li>
          <li>Play around with the tutorial!</li>
        </ol>
        <h3>Create A New Script/Screenplay</h3>
        <ol>
          <li>Navigate to the 'Projects Page'</li>
          <li>Use the navigation menu or 'A' icon</li>
          <li>Click the '+', and enter in basic script info.</li>
          <li>Your new script will be in your feed</li>
        </ol>
        <h3>Find Your New Script</h3>
        <ol>
          <li>If you don't see your script, it might be on another page.</li>
          <li>Use the arrows to navigate, or type a keyword the search box</li>
          <li>You can sort by size, age, and alphabetically</li>
        </ol>
        <h3>Inspiration</h3>
        <ol>
          <li>
            Here are some additional writing{" "}
            <a href="https://www.studiobinder.com/blog/6-essential-screenwriting-tips-for-writing-better-movie-dialogue/">
              conventions
            </a>
            .
          </li>
          <li>
            Testimonials from famous screenwriters,{" "}
            <a href="https://www.writingclasses.com/toolbox/tips-masters/billy-wilder-10-screenwriting-tips">
              themseleves
            </a>
            .
          </li>
          <li>
            A list of{" "}
            <a href="https://screencraft.org/2019/03/25/over-30000-ideas-to-inspire-your-next-screenplay/">
              ideas
            </a>{" "}
            to inspire your screenplay.
          </li>
        </ol>
        <br />
        <h3>Never stop writing! You can do it!</h3>
        <p className="script-txt pg-num">1</p>
        <p className="script-txt slugline">Int. Above the Line HQ</p>
      </AtlSection>
    </>
  );
};

export default UserGuide;
