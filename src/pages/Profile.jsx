export default function Profile({ setPage, user }) {
  return (
    <div style={screen}>
      <div style={topbar}>
        <div style={logo}>🎓 MentoQuest</div>
        <button style={topBtn} onClick={() => setPage("dashboard")}>
          대시보드
        </button>
      </div>

      <main style={wrap}>
        <p style={small}>나의 성장 기록</p>
        <h1 style={title}>👤 프로필</h1>

        <div style={profileCard}>
          <div style={avatar}>🌱</div>
          <h2>{user?.name || "이다원"}</h2>
          <p style={muted}>{user?.school || "우리 학교"} · {user?.role || "멘티"}</p>

          <div style={infoGrid}>
            <div style={infoBox}>🏆 Lv.4 탐구자</div>
            <div style={infoBox}>⭐ 320 EXP</div>
            <div style={infoBox}>🎯 완료 퀘스트 3개</div>
            <div style={infoBox}>📝 활동일지 1개</div>
          </div>

          <h3>획득 배지</h3>
          <p style={{ fontSize: 30 }}>🏆 📘 🔥 🌟</p>

          <h3>최근 성장 기록</h3>
          <p style={record}>🎯 퀘스트 완료로 경험치 획득</p>
          <p style={record}>👨‍🏫 멘토링 신청 완료</p>
          <p style={record}>📝 활동일지 작성</p>
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

const wrap = { maxWidth: 720, margin: "0 auto", padding: "18px 24px 50px" };
const small = { color: "#64748b", margin: 0 };
const title = { fontSize: 34, margin: "6px 0 24px" };

const profileCard = {
  background: "rgba(255,255,255,.8)",
  border: "1px solid #cbd5e1",
  borderRadius: 24,
  padding: 28,
  boxShadow: "0 12px 30px rgba(148,163,184,.16)",
};

const avatar = {
  width: 80,
  height: 80,
  borderRadius: 24,
  background: "#dbeafe",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 42,
};

const muted = { color: "#64748b", fontWeight: 700 };

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 12,
  margin: "22px 0",
};

const infoBox = {
  background: "#eff6ff",
  borderRadius: 16,
  padding: 14,
  fontWeight: 800,
  color: "#2563eb",
};

const record = {
  background: "#f8fafc",
  border: "1px solid #dbeafe",
  padding: 12,
  borderRadius: 14,
};