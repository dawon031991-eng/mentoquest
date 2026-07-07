import { useState } from "react";

export default function Dashboard({ setPage, user, exp, addExp, activities }) {
  const [done, setDone] = useState([]);
  const [levelUp, setLevelUp] = useState(false);

  const quests = [
    { text: "멘토 신청하기", xp: 20 },
    { text: "멘티 도와주기", xp: 30 },
    { text: "활동 보고서 작성", xp: 50 },
  ];

  function completeQuest(index, xp) {
    if (done.includes(index)) return;

    const nextExp = exp + xp;
    setDone([...done, index]);
    addExp(xp);

    if (exp < 300 && nextExp >= 300) {
      setLevelUp(true);
      setTimeout(() => setLevelUp(false), 2200);
    }
  }

  const level = exp >= 300 ? 4 : 3;
  const percent = Math.min((exp / 300) * 100, 100);

  return (
    <div style={screen}>
      {levelUp && (
        <div style={overlay}>
          <div style={popup}>
            <div style={{ fontSize: 52 }}>🎉</div>
            <h1 style={{ margin: "8px 0", color: "#2563eb" }}>LEVEL UP!</h1>
            <h2 style={{ margin: 0 }}>Lv.4 탐구자 달성</h2>
            <p style={{ color: "#64748b", fontWeight: 700 }}>
              새로운 배지를 획득했어요 🏆
            </p>
          </div>
        </div>
      )}

      <div style={topbar}>
        <div style={logo}>🎓 MentoQuest</div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button style={topBtn} onClick={() => setPage("mentor")}>
            👨‍🏫 멘토
          </button>
          <button style={topBtn} onClick={() => setPage("mentee")}>
            👩‍🎓 멘티
          </button>
          <button style={topBtn} onClick={() => setPage("activity")}>
            📝 활동일지
          </button>
          <button style={topBtn} onClick={() => setPage("profile")}>
            👤 프로필
          </button>
          <button style={topBtn} onClick={() => setPage("badge")}>
            🏅 배지
          </button>
          <button style={topBtn} onClick={() => setPage("attendance")}>
            🎁 출석
          </button>
        </div>
      </div>

      <main style={wrap}>
        <p style={small}>오늘도 성장해볼까요?</p>
        <h1 style={title}>👋 {user?.name || "이다원"}님</h1>

        <div style={grid}>
          <div style={card}>
            <p style={label}>현재 레벨</p>
            <h2>Lv.{level} 탐구자 🌱</h2>
            <p style={label}>EXP 상태</p>
            <div style={barBg}>
              <div style={{ ...bar, width: `${percent}%` }}></div>
            </div>
            <p style={right}>{exp} / 300</p>
          </div>

          <div style={card}>
            <h3>획득 배지</h3>
            <p style={{ fontSize: 28 }}>
              🏆 📘 🔥 {exp >= 300 ? "🌟" : ""}
            </p>
            <p style={label}>첫 퀘스트 · 꾸준왕 · 7일 연속</p>
          </div>

          <div style={card}>
            <h3>🔥 오늘의 퀘스트</h3>
            {quests.map((q, i) => (
              <p
                key={i}
                onClick={() => completeQuest(i, q.xp)}
                style={{ cursor: "pointer", fontWeight: 700 }}
              >
                {done.includes(i) ? "✅" : "⬜"} {q.text} · {q.xp} EXP
              </p>
            ))}
          </div>

          <div style={card}>
            <h3>🏅 이번 주 랭킹</h3>
            <p>🥇 김다연 · 520 EXP</p>
            <p>🥈 이다원 · {exp} EXP</p>
            <p>🥉 박지훈 · 410 EXP</p>
          </div>

          <div style={wideCard}>
            <h3>🌟 최근 활동 기록</h3>
            {activities.slice(0, 5).map((activity, index) => (
              <p key={index}>{activity}</p>
            ))}

            {done.map((i) => (
              <p key={`quest-${i}`}>
                🎯 {quests[i].text} 완료 · +{quests[i].xp} EXP
              </p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const screen = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#eff6ff,#f5f3ff,#ffffff)",
  fontFamily: "Arial, sans-serif",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99,
};

const popup = {
  background: "white",
  borderRadius: 28,
  padding: "34px 42px",
  textAlign: "center",
  boxShadow: "0 30px 80px rgba(37,99,235,.35)",
  border: "2px solid #bfdbfe",
};

const topbar = {
  maxWidth: 950,
  margin: "0 auto",
  padding: "22px 24px",
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
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

const wrap = { maxWidth: 760, margin: "0 auto", padding: "10px 24px 40px" };
const small = { color: "#64748b", margin: 0 };
const title = { fontSize: 34, margin: "6px 0 22px" };

const grid = {
  display: "grid",
  gridTemplateColumns: "1.2fr .8fr",
  gap: 16,
};

const card = {
  background: "rgba(255,255,255,.72)",
  border: "1px solid #cbd5e1",
  borderRadius: 18,
  padding: 18,
};

const wideCard = {
  ...card,
  gridColumn: "1 / 3",
};

const label = { color: "#64748b", fontSize: 13 };

const barBg = {
  height: 12,
  background: "#e2e8f0",
  borderRadius: 999,
};

const bar = {
  height: "100%",
  background: "#2563eb",
  borderRadius: 999,
  transition: "width .4s ease",
};

const right = {
  textAlign: "right",
  fontSize: 12,
  color: "#64748b",
};