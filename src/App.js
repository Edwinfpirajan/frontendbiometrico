import { useState } from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import EmployeManage from "./scenes/employe-manage";
import AttendanceManage from "./scenes/attendance_manage";
import Test from './scenes/attendance_manage'
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Login from "./scenes/login"
import Testing from "./scenes/testing"
import AttendanceLogin from "./scenes/attendance_login"
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            <Route index element={<AttendanceLogin />} />
              <Route path="/" element={<AttendanceLogin />} />
              <Route path="/testing" element={<Testing />} />
              <Route path="/login/admin" element={<Login />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/manage/employe" element={<EmployeManage />} />
              <Route path="/manage/attendance" element={<AttendanceManage />} />
              {/* <Route path="/contacts" element={<Contacts />} /> */}
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
