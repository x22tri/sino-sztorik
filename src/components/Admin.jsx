import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminAppbar from "./appbars/AdminAppbar";

const Admin = ({ themeToggle }) => {

  const [lessonState, setLessonState] = useState(null)

  return (
      <>
      <AdminAppbar 
        {...{themeToggle, lessonState, setLessonState}} 
      />
      <Outlet context={[lessonState, setLessonState]} />
      </>
  );
};

export default Admin;
