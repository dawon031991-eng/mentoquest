import { useState } from "react";

export default function Mentee({ setPage }) {
  const [selected, setSelected] = useState([]);

  const mentees = [
    { name: "김하린", need: "수학", intro: "함수 개념이 어려워요.", emoji: "🌸" },
    { name: "박서준", need: "영어", intro: "문법이랑 독해 도움을 받고 싶어요.", emoji: "📘" },
    { name: "최유나", need: "과학", intro: "시험 전 개념 정리가 필요해요.", emoji: "🔬" },
    { name: "정민재", need: "사회", intro: "암기 방법을 배우고 싶어요.", emoji: "🗺️" },
    { name: "이채원", need: "미술이론", intro: "작품 분석 정리가 어려워요.", emoji: "🎨" },
    { name: "한도윤", need: "코딩", intro: "React 기초를 배우고 싶어요.", emoji: "💻" },
  ];

  function help(name) {
    if (!selected.includes(name)) {
      setSelected([...selected, name]);
    }
  }

  return (
    <div style={screen}>
      <div style={topbar}>
        <div style={logo}>🎓 MentoQuest</div>
        <button style={topBtn} onClick={() => setPage("dashboard")}>
          대시보드
        </button>
      </div>

      <main style={wrap}>
        <p style={small}>도움이 필요한 멘티를 찾아보세요</p>
        <h1 style={title}>👩‍🎓 멘티 찾기</h1>

        <div style={grid}>
          {mentees.map((mentee) => {
            const isSelected = selected.includes(mentee.name);

            return (
              <div style={card} key={mentee.name}>
                <div style={row}>
                  <div style={avatar}>{mentee.emoji}</div>
                  <div>
                    <h2 style={nameStyle}>{mentee.name}</h2>
                    <p style={level}>도움 요청 중</p>
                  </div>
                </div>

                <div style={tag}>📚 {mentee.need}</div>
                <p style={intro}>{mentee.intro}</p>

                <button
                  style={isSelected ? doneBtn : applyBtn}
                  onClick={() => help(mentee.name)}
                >
                  {isSelected ? "✅ 멘토링 신청 완료" : "멘토링 도와주기"}
                </button>
              </div>
            );
          })}
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
  alignItems: "center",
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
  maxWidth: 950,
  margin: "0 auto",
  padding: "18px 24px 50px",
};

const small = { color: "#64748b", margin: 0 };
const title = { fontSize: 34, margin: "6px 0 24px" };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 18,
};

const card = {
  background: "rgba(255,255,255,.82)",
  border: "1px solid #cbd5e1",
  borderRadius: 22,
  padding: 22,
  boxShadow: "0 12px 30px rgba(148,163,184,.16)",
};

const row = { display: "flex", gap: 12, alignItems: "center" };

const avatar = {
  width: 56,
  height: 56,
  borderRadius: 18,
  background: "#eff6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
};

const nameStyle = { margin: 0, fontSize: 21 };
const level = { color: "#64748b", margin: "5px 0 0", fontWeight: 700 };

const tag = {
  display: "inline-block",
  marginTop: 16,
  padding: "8px 12px",
  borderRadius: 999,
  background: "#dbeafe",
  color: "#2563eb",
  fontWeight: 800,
  fontSize: 13,
};

const intro = {
  color: "#475569",
  fontSize: 14,
  lineHeight: 1.6,
  margin: "14px 0 14px",
};

const applyBtn = {
  width: "100%",
  padding: 13,
  border: "none",
  borderRadius: 14,
  background: "linear-gradient(90deg,#3b82f6,#8b5cf6)",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const doneBtn = {
  ...applyBtn,
  background: "#e0f2fe",
  color: "#0369a1",
};