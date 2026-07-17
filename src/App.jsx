import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mentor from "./pages/Mentor";
import Mentee from "./pages/Mentee";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import Badge from "./pages/Badge";
import Attendance from "./pages/Attendance";

export default function App() {
  const [page, setPage] = useState("home");

  const [user, setUser] = useState({
    name: "이다원",
    school: "우리 학교",
    role: "멘티",
  });

  const [exp, setExp] = useState(240);
  const [activities, setActivities] = useState([
    "7/5 퀘스트 3개 완료 · 수학 문제 20개 해결",
  ]);

  const [mentorApplications, setMentorApplications] = useState([]);
  const [menteeApplications, setMenteeApplications] = useState([]);
  const [attendanceCount, setAttendanceCount] = useState(3);
  const [activityCount, setActivityCount] = useState(1);

  function addExp(amount) {
    setExp((prev) => prev + amount);
  }

  function addActivity(text) {
    setActivities((prev) => [text, ...prev]);
  }

  function applyMentor(name) {
    if (mentorApplications.includes(name)) return;

    setMentorApplications((prev) => [...prev, name]);
    addExp(20);
    addActivity(`👨‍🏫 ${name} 멘토 신청 완료 · +20 EXP`);
  }

  function helpMentee(name) {
    if (menteeApplications.includes(name)) return;

    setMenteeApplications((prev) => [...prev, name]);
    addExp(30);
    addActivity(`👩‍🎓 ${name} 멘티 도와주기 신청 완료 · +30 EXP`);
  }

  function checkAttendance() {
    setAttendanceCount((prev) => prev + 1);
    addExp(20);
    addActivity("🎁 출석 체크 완료 · +20 EXP");
  }

  function saveActivityLog() {
    setActivityCount((prev) => prev + 1);
    addExp(30);
    addActivity("📝 활동일지 작성 완료 · +30 EXP");
  }

  if (page === "login") {
    return <Login setPage={setPage} setUser={setUser} />;
  }

  if (page === "register") {
    return <Register setPage={setPage} setUser={setUser} />;
  }

  if (page === "dashboard") {
    return (
      <Dashboard
        setPage={setPage}
        user={user}
        exp={exp}
        addExp={addExp}
        activities={activities}
      />
    );
  }

  if (page === "mentor") {
    return (
      <Mentor
        setPage={setPage}
        mentorApplications={mentorApplications}
        applyMentor={applyMentor}
      />
    );
  }

  if (page === "mentee") {
    return (
      <Mentee
        setPage={setPage}
        menteeApplications={menteeApplications}
        helpMentee={helpMentee}
      />
    );
  }

  if (page === "activity") {
    return (
      <Activity
        setPage={setPage}
        saveActivityLog={saveActivityLog}
      />
    );
  }

  if (page === "profile") {
    return (
      <Profile
        setPage={setPage}
        user={user}
        exp={exp}
        activities={activities}
        mentorCount={mentorApplications.length}
        menteeCount={menteeApplications.length}
        activityCount={activityCount}
      />
    );
  }

  if (page === "badge") {
    return (
      <Badge
        setPage={setPage}
        exp={exp}
        mentorCount={mentorApplications.length}
        attendanceCount={attendanceCount}
        activityCount={activityCount}
      />
    );
  }

  if (page === "attendance") {
    return (
      <Attendance
        setPage={setPage}
        attendanceCount={attendanceCount}
        checkAttendance={checkAttendance}
      />
    );
  }
  

  return <Home setPage={setPage} />;
}