import { useState } from "react";

export default function Attendance({ setPage }) {
  const [checked, setChecked] = useState(false);

  return (
    <div style={screen}>
      <div style={topbar}>
        <div style={logo}>🎓 MentoQuest</div>
        <button style={btn} onClick={() => setPage("dashboard")}>
          대시보드
        </button>
      </div>

      <main style={wrap}>
        <p style={small}>매일 접속하고 보상을 받아보세요</p>
        <h1 style={title}>🎁 출석 체크</h1>

        <div style={card}>
          <div style={{ fontSize: 70 }}>🎁</div>
          <h2>{checked ? "출석 완료!" : "오늘의 출석 보상"}</h2>
          <p style={text}>
            {checked
              ? "오늘 보상을 이미 받았어요. 내일 다시 만나요!"
              : "출석하면 +20 EXP를 획득합니다."}
          </p>

          <div style={days}>
            <span>✅ 1일차</span>
            <span>✅ 2일차</span>
            <span>✅ 3일차</span>
            <span>{checked ? "✅" : "⬜"} 4일차</span>
            <span>⬜ 5일차</span>
          </div>

          <button
            style={checked ? doneBtn : rewardBtn}
            onClick={() => setChecked(true)}
          >
            {checked ? "✅ 보상 수령 완료" : "출석 보상 받기"}
          </button>
        </div>
      </main>
    </div>
  );
}

const screen = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#eff6ff,#f5f3ff,#ffffff)",
  fontFamily: "Arial, sans-serif",
  color: "#1e293b",
};

const topbar = {
  maxWidth: 950,
  margin: "0 auto",
  padding: "22px 24px",
  display: "flex",
  justifyContent: "space-between",
};

const logo = { fontWeight: 900, color: "#2563eb" };

const btn = {
  padding: "10px 18px",
  border: "none",
  borderRadius: 12,
  background: "#2563eb",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const wrap = { maxWidth: 720, margin: "0 auto", padding: 24 };
const small = { color: "#64748b", margin: 0 };
const title = { fontSize: 36, margin: "6px 0 24px" };

const card = {
  background: "white",
  borderRadius: 28,
  padding: 32,
  textAlign: "center",
  boxShadow: "0 20px 50px rgba(59,130,246,.16)",
};

const text = { color: "#64748b", fontWeight: 700 };

const days = {
  display: "grid",
  gap: 10,
  margin: "24px 0",
  textAlign: "left",
  fontWeight: 800,
};

const rewardBtn = {
  width: "100%",
  padding: 15,
  border: "none",
  borderRadius: 16,
  background: "linear-gradient(90deg,#3b82f6,#8b5cf6)",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};

const doneBtn = {
  ...rewardBtn,
  background: "#dcfce7",
  color: "#166534",
};