import { useEffect, useState } from "react";
import { supabase } from "./supabase";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mentor from "./pages/Mentor";
import Mentee from "./pages/Mentee";
import Profile from "./pages/Profile";
import Badge from "./pages/Badge";
import Attendance from "./pages/Attendance";
import Activity from "./pages/Activity";

/* Supabase 사용자 정보를 앱 사용자 정보로 변환 */
function makeUser(authUser) {
  if (!authUser) return null;

  const metadata = authUser.user_metadata || {};

  return {
    id: authUser.id,
    email: authUser.email || "",

    name:
      metadata.name ||
      metadata.full_name ||
      metadata.user_name ||
      authUser.email?.split("@")[0] ||
      "사용자",

    school: metadata.school || "학교 미설정",

    studentId:
      metadata.student_id ||
      metadata.studentId ||
      "",

    role: metadata.role || "",

    intro: metadata.intro || "",

    profileImage:
      metadata.avatar_url ||
      metadata.picture ||
      "",

    level: Number(metadata.level) || 1,
    exp: Number(metadata.exp) || 0,
  };
}

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);
  const [appError, setAppError] = useState("");

  const [attendanceCount, setAttendanceCount] = useState(0);
  const [activityCount, setActivityCount] = useState(0);

  useEffect(() => {
    let active = true;
    let subscription;

    async function initializeAuth() {
      try {
        setAppError("");

        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (!active) return;

        const sessionUser = data?.session?.user;

        if (sessionUser) {
          setUser(makeUser(sessionUser));
          setPage("dashboard");
        } else {
          setUser(null);
          setPage("home");
        }

        const authListener = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (!active) return;

            console.log("Supabase 인증 상태:", event);

            if (session?.user) {
              setUser(makeUser(session.user));
              setPage("dashboard");
            } else {
              setUser(null);

              if (event === "SIGNED_OUT") {
                setPage("home");
              }
            }
          }
        );

        subscription = authListener.data.subscription;
      } catch (error) {
        console.error("Supabase 인증 초기화 오류:", error);

        if (active) {
          setAppError(
            error?.message ||
              "로그인 정보를 확인하는 중 오류가 발생했습니다."
          );

          setUser(null);
          setPage("home");
        }
      } finally {
        if (active) {
          setAuthLoading(false);
        }
      }
    }

    initializeAuth();

    return () => {
      active = false;

      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setUser(null);
      setPage("home");
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert(`로그아웃 실패: ${error.message}`);
    }
  }

  function checkAttendance() {
    setAttendanceCount((count) => count + 1);
  }

  function addActivity() {
    setActivityCount((count) => count + 1);
  }

  /* Supabase 로그인 상태 확인 중 */
  if (authLoading) {
    return (
      <div style={styles.screen}>
        <div style={styles.card}>
          <div style={styles.icon}>🎮</div>
          <h1 style={styles.title}>MentoQuest</h1>
          <p style={styles.text}>
            로그인 상태를 확인하고 있어요...
          </p>
        </div>
      </div>
    );
  }

  /* 오류가 생겨도 흰 화면 대신 오류 화면 표시 */
  if (appError) {
    return (
      <div style={styles.screen}>
        <div style={styles.card}>
          <div style={styles.icon}>⚠️</div>

          <h1 style={styles.errorTitle}>
            앱을 불러오지 못했어요
          </h1>

          <p style={styles.text}>{appError}</p>

          <button
            type="button"
            style={styles.button}
            onClick={() => window.location.reload()}
          >
            다시 불러오기
          </button>
        </div>
      </div>
    );
  }

  if (page === "home") {
    return (
      <Home
        user={user}
        setPage={setPage}
      />
    );
  }

  if (page === "login") {
    if (user) {
      return (
        <Dashboard
          user={user}
          setUser={setUser}
          setPage={setPage}
          logout={logout}
          attendanceCount={attendanceCount}
          activityCount={activityCount}
        />
      );
    }

    return (
      <Login
        setPage={setPage}
        setUser={setUser}
      />
    );
  }

  if (page === "register") {
    if (user) {
      return (
        <Dashboard
          user={user}
          setUser={setUser}
          setPage={setPage}
          logout={logout}
          attendanceCount={attendanceCount}
          activityCount={activityCount}
        />
      );
    }

    return (
      <Register
        setPage={setPage}
        setUser={setUser}
      />
    );
  }

  if (page === "dashboard") {
    if (!user) {
      return (
        <Login
          setPage={setPage}
          setUser={setUser}
        />
      );
    }

    return (
      <Dashboard
        user={user}
        setUser={setUser}
        setPage={setPage}
        logout={logout}
        attendanceCount={attendanceCount}
        activityCount={activityCount}
      />
    );
  }

  if (page === "mentor") {
    return (
      <Mentor
        user={user}
        setPage={setPage}
      />
    );
  }

  if (page === "mentee") {
    return (
      <Mentee
        user={user}
        setPage={setPage}
      />
    );
  }

  if (page === "profile") {
    return (
      <Profile
        user={user}
        setUser={setUser}
        setPage={setPage}
        logout={logout}
      />
    );
  }

  if (page === "badge" || page === "badges") {
    return (
      <Badge
        user={user}
        setPage={setPage}
      />
    );
  }

  if (page === "attendance") {
    return (
      <Attendance
        user={user}
        setPage={setPage}
        attendanceCount={attendanceCount}
        checkAttendance={checkAttendance}
      />
    );
  }

  if (page === "activity") {
    return (
      <Activity
        user={user}
        setPage={setPage}
        activityCount={activityCount}
        addActivity={addActivity}
      />
    );
  }

  return (
    <Home
      user={user}
      setPage={setPage}
    />
  );
}

const styles = {
  screen: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background:
      "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eef2ff 100%)",
    fontFamily:
      'Pretendard, "Noto Sans KR", Arial, sans-serif',
  },

  card: {
    width: "min(400px, 100%)",
    padding: "42px 28px",
    borderRadius: "28px",
    textAlign: "center",
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0 24px 70px rgba(37,99,235,0.16)",
    border: "1px solid rgba(255,255,255,0.8)",
  },

  icon: {
    fontSize: "46px",
    marginBottom: "12px",
  },

  title: {
    margin: 0,
    color: "#1d4ed8",
    fontSize: "30px",
    fontWeight: 900,
  },

  errorTitle: {
    margin: 0,
    color: "#dc2626",
    fontSize: "24px",
    fontWeight: 900,
  },

  text: {
    marginTop: "12px",
    marginBottom: 0,
    color: "#64748b",
    fontSize: "15px",
    fontWeight: 600,
    lineHeight: 1.6,
    wordBreak: "break-word",
  },

  button: {
    marginTop: "24px",
    padding: "12px 22px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
  },
};