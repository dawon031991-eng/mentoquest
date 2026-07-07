import { useState } from "react";

export default function Activity({ setPage }) {
  const [saved, setSaved] = useState(false);

  function saveActivity() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={screen}>
      {saved && <div style={toast}>✅ 활동일지가 저장되었습니다! +20 EXP</div>}

      <div style={topbar}>
        <div style={logo}>🎓 MentoQuest</div>
        <button style={topBtn} onClick={() => setPage("dashboard")}>
          대시보드
        </button>
      </div>

      <main style={wrap}>
        <p style={small}>멘토링 활동을 기록해보세요</p>
        <h1 style={title}>📝 활동일지</h1>

        <div style={box}>
          <input style={input} type="date" />
          <input style={input} placeholder="멘토/멘티 이름" />
          <input style={input} placeholder="과목 예: 수학, 영어, 과학" />
          <input style={input} placeholder="활동 시간 예: 1시간" />

          <textarea
            style={textarea}
            placeholder="오늘 어떤 활동을 했나요?"
          />

          <textarea
            style={textarea}
            placeholder="활동 후 느낀 점이나 배운 점을 적어주세요."
          />

          <button style={saveBtn} onClick={saveActivity}>
            저장하기
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

const topBtn = {
  padding: "10px 18px",
  border: "none",
  borderRadius: 12,
  background: "#2563eb",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const wrap = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "18px 24px 50px",
};

const small = { color: "#64748b", margin: 0 };
const title = { fontSize: 34, margin: "6px 0 24px" };

const box = {
  background: "rgba(255,255,255,.78)",
  border: "1px solid #cbd5e1",
  borderRadius: 22,
  padding: 22,
  boxShadow: "0 12px 30px rgba(148,163,184,.16)",
};

const input = {
  width: "100%",
  boxSizing: "border-box",
  padding: 14,
  marginBottom: 12,
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  fontSize: 15,
};

const textarea = {
  ...input,
  minHeight: 100,
  resize: "vertical",
};

const saveBtn = {
  width: "100%",
  padding: 14,
  border: "none",
  borderRadius: 14,
  background: "linear-gradient(90deg,#3b82f6,#8b5cf6)",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const toast = {
  position: "fixed",
  top: 24,
  left: "50%",
  transform: "translateX(-50%)",
  background: "#2563eb",
  color: "white",
  padding: "14px 22px",
  borderRadius: 999,
  fontWeight: 800,
  zIndex: 100,
};