import { useState } from "react";

export default function Mentor({ setPage, mentorApplications, applyMentor }) {
  const [search, setSearch] = useState("");

  const mentors = [
    { name: "이다원", level: 5, subject: "수학 · 영어", intro: "개념 설명을 쉽게 해드립니다.", rating: 4.9, emoji: "🌱" },
    { name: "김민우", level: 7, subject: "영어 · 국어", intro: "문법과 독해를 차근차근 알려드립니다.", rating: 4.8, emoji: "📘" },
    { name: "박지윤", level: 4, subject: "과학", intro: "과학 개념 정리를 도와드립니다.", rating: 4.7, emoji: "🔬" },
    { name: "최서연", level: 6, subject: "사회 · 한국사", intro: "암기법과 공부법을 알려드립니다.", rating: 4.9, emoji: "📚" },
    { name: "정하늘", level: 8, subject: "코딩 · 웹개발", intro: "React와 프로젝트 제작을 도와드립니다.", rating: 5.0, emoji: "💻" },
    { name: "이주원", level: 5, subject: "미술 · 디자인", intro: "아이디어 구상과 발표 자료를 도와드립니다.", rating: 4.8, emoji: "🎨" },
  ];

  const filteredMentors = mentors.filter((mentor) =>
    `${mentor.name} ${mentor.subject} ${mentor.intro}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={screen}>
      <div style={topbar}>
        <div style={logo}>🎓 MentoQuest</div>
        <button style={backBtn} onClick={() => setPage("dashboard")}>
          대시보드
        </button>
      </div>

      <main style={wrap}>
        <p style={small}>나에게 맞는 멘토를 찾아보세요</p>
        <h1 style={title}>👨‍🏫 멘토 찾기</h1>

        <input
          style={searchInput}
          placeholder="이름, 과목, 강점 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <p style={progress}>
          협력왕 진행도: {mentorApplications.length} / 3
        </p>

        <div style={grid}>
          {filteredMentors.map((mentor) => {
            const applied = mentorApplications.includes(mentor.name);

            return (
              <div key={mentor.name} style={card}>
                <div style={row}>
                  <div style={avatar}>{mentor.emoji}</div>
                  <div>
                    <h2 style={nameStyle}>{mentor.name}</h2>
                    <p style={muted}>Lv.{mentor.level} 멘토 · ⭐ {mentor.rating}</p>
                  </div>
                </div>

                <div style={tag}>🏷 {mentor.subject}</div>
                <p style={intro}>{mentor.intro}</p>

                <button
                  style={applied ? doneBtn : applyBtn}
                  onClick={() => applyMentor(mentor.name)}
                >
                  {applied ? "✅ 신청 완료" : "신청하기 · +20 EXP"}
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

const backBtn = {
  padding: "10px 18px",
  border: "none",
  borderRadius: 12,
  background: "#2563eb",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const wrap = { maxWidth: 950, margin: "0 auto", padding: "18px 24px 50px" };
const small = { color: "#64748b", margin: 0 };
const title = { fontSize: 34, margin: "6px 0 18px" };

const searchInput = {
  width: "100%",
  boxSizing: "border-box",
  padding: 14,
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  marginBottom: 12,
  fontSize: 15,
};

const progress = {
  background: "#eff6ff",
  color: "#2563eb",
  padding: "12px 14px",
  borderRadius: 14,
  fontWeight: 900,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: 18,
  marginTop: 18,
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
const muted = { color: "#64748b", margin: "5px 0 0", fontWeight: 700 };

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
  background: "#dcfce7",
  color: "#166534",
};