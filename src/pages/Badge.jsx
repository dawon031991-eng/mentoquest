import { useState } from "react";

export default function Badge({ setPage }) {
  const initialBadges = [
    {
      id: 1,
      emoji: "🌱",
      name: "첫걸음",
      rarity: "🟢 일반",
      desc: "첫 퀘스트 완료",
      condition: "오늘의 퀘스트를 1개 완료",
      unlocked: true,
    },
    {
      id: 2,
      emoji: "🏆",
      name: "성장왕",
      rarity: "🔵 희귀",
      desc: "Lv.4 달성",
      condition: "EXP 300 이상 달성",
      unlocked: true,
    },
    {
      id: 3,
      emoji: "🤝",
      name: "협력왕",
      rarity: "🟣 영웅",
      desc: "멘토 신청 3회",
      condition: "멘토에게 3번 신청하기",
      unlocked: false,
    },
    {
      id: 4,
      emoji: "📚",
      name: "기록왕",
      rarity: "🟢 일반",
      desc: "활동일지 5회 작성",
      condition: "활동일지 5개 저장",
      unlocked: false,
    },
    {
      id: 5,
      emoji: "🔥",
      name: "열정왕",
      rarity: "🔵 희귀",
      desc: "EXP 500 달성",
      condition: "EXP 500 이상 달성",
      unlocked: false,
    },
    {
      id: 6,
      emoji: "💎",
      name: "마스터",
      rarity: "🟡 전설",
      desc: "모든 배지 획득",
      condition: "모든 배지를 수집",
      unlocked: false,
    },
  ];

  const [badges, setBadges] = useState(initialBadges);
  const [selected, setSelected] = useState(null);
  const [reward, setReward] = useState(null);

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const percent = Math.round((unlockedCount / badges.length) * 100);

  function unlockTestBadge() {
    const target = badges.find((b) => !b.unlocked);
    if (!target) return;

    const updatedBadge = { ...target, unlocked: true };
    setBadges(
      badges.map((b) =>
        b.id === target.id ? updatedBadge : b
      )
    );
    setReward(updatedBadge);
  }

  return (
    <div style={screen}>
      {reward && (
        <div style={overlay}>
          <div style={rewardPopup}>
            <div style={sparkle}>✨ ✨ ✨</div>
            <div style={rewardEmoji}>{reward.emoji}</div>
            <h1 style={rewardTitle}>새로운 배지 획득!</h1>
            <h2 style={{ margin: "8px 0" }}>{reward.name}</h2>
            <p style={rarityText}>{reward.rarity}</p>
            <button style={closeBtn} onClick={() => setReward(null)}>
              확인
            </button>
          </div>
        </div>
      )}

      {selected && (
        <div style={overlay}>
          <div style={popup}>
            <div style={detailEmoji}>
              {selected.unlocked ? selected.emoji : "❓"}
            </div>
            <h2>{selected.unlocked ? selected.name : "미공개 배지"}</h2>
            <p style={rarityText}>{selected.rarity}</p>
            <div style={detailBox}>
              <p style={label}>획득 조건</p>
              <p>{selected.unlocked ? selected.condition : "???"}</p>
            </div>
            <div style={detailBox}>
              <p style={label}>상태</p>
              <p>
                {selected.unlocked
                  ? "✅ 획득 완료"
                  : "🔒 아직 획득하지 못했습니다."}
              </p>
            </div>
            <button style={closeBtn} onClick={() => setSelected(null)}>
              닫기
            </button>
          </div>
        </div>
      )}

      <div style={topbar}>
        <div style={logo}>🎓 MentoQuest</div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={btn} onClick={unlockTestBadge}>
            🎁 배지 획득 테스트
          </button>
          <button style={btn} onClick={() => setPage("dashboard")}>
            대시보드
          </button>
        </div>
      </div>

      <main style={wrap}>
        <p style={small}>성장의 흔적을 수집하는 공간</p>
        <h1 style={title}>🏅 Badge Collection</h1>

        <section style={collectionBox}>
          <div style={rowBetween}>
            <div>
              <p style={label}>획득률</p>
              <h2 style={{ margin: 0 }}>{unlockedCount} / {badges.length}</h2>
            </div>
            <div style={percentCircle}>{percent}%</div>
          </div>

          <div style={progressBg}>
            <div style={{ ...progressBar, width: `${percent}%` }}></div>
          </div>

          <div style={legend}>
            <span>🟢 일반</span>
            <span>🔵 희귀</span>
            <span>🟣 영웅</span>
            <span>🟡 전설</span>
          </div>
        </section>

        <div style={grid}>
          {badges.map((badge) => (
            <button
              key={badge.id}
              style={{
                ...badgeCard,
                opacity: badge.unlocked ? 1 : 0.55,
                border:
                  badge.rarity.includes("전설")
                    ? "2px solid #facc15"
                    : "1px solid #cbd5e1",
              }}
              onClick={() => setSelected(badge)}
            >
              <div style={badgeEmoji}>
                {badge.unlocked ? badge.emoji : "❓"}
              </div>
              <h3 style={{ margin: "10px 0 4px" }}>
                {badge.unlocked ? badge.name : "???"}
              </h3>
              <p style={rarityText}>{badge.rarity}</p>
              <div style={badgeStatus}>
                {badge.unlocked ? "획득 완료" : "잠김"}
              </div>
            </button>
          ))}
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
  flexWrap: "wrap",
  gap: 12,
};

const logo = {
  fontWeight: 900,
  color: "#2563eb",
};

const btn = {
  padding: "10px 16px",
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

const small = {
  color: "#64748b",
  margin: 0,
};

const title = {
  fontSize: 38,
  margin: "6px 0 22px",
};

const collectionBox = {
  background: "rgba(255,255,255,.78)",
  border: "1px solid #cbd5e1",
  borderRadius: 24,
  padding: 22,
  marginBottom: 22,
  boxShadow: "0 12px 30px rgba(148,163,184,.16)",
};

const rowBetween = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const label = {
  color: "#64748b",
  fontSize: 13,
  fontWeight: 800,
  margin: "0 0 6px",
};

const percentCircle = {
  width: 68,
  height: 68,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
};

const progressBg = {
  height: 16,
  background: "#dbeafe",
  borderRadius: 999,
  overflow: "hidden",
  marginTop: 18,
};

const progressBar = {
  height: "100%",
  background: "linear-gradient(90deg,#3b82f6,#8b5cf6)",
  borderRadius: 999,
  transition: "width .35s ease",
};

const legend = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  marginTop: 18,
  color: "#475569",
  fontWeight: 800,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 18,
};

const badgeCard = {
  background: "white",
  borderRadius: 24,
  padding: 22,
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
};

const badgeEmoji = {
  width: 86,
  height: 86,
  margin: "0 auto",
  borderRadius: 26,
  background: "#eff6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 48,
};

const rarityText = {
  color: "#2563eb",
  fontWeight: 800,
};

const badgeStatus = {
  marginTop: 12,
  padding: "9px 12px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#2563eb",
  fontWeight: 900,
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,.38)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  padding: 20,
};

const popup = {
  width: 340,
  background: "white",
  borderRadius: 28,
  padding: 28,
  textAlign: "center",
  boxShadow: "0 30px 80px rgba(37,99,235,.25)",
};

const rewardPopup = {
  width: 360,
  background: "linear-gradient(135deg,#ffffff,#eff6ff,#f5f3ff)",
  border: "2px solid #bfdbfe",
  borderRadius: 30,
  padding: 34,
  textAlign: "center",
  boxShadow: "0 30px 90px rgba(37,99,235,.36)",
};

const sparkle = {
  color: "#facc15",
  fontWeight: 900,
  letterSpacing: 4,
};

const rewardEmoji = {
  fontSize: 76,
  marginTop: 6,
};

const rewardTitle = {
  color: "#2563eb",
  margin: "8px 0",
};

const detailEmoji = {
  fontSize: 70,
};

const detailBox = {
  background: "#f8fafc",
  border: "1px solid #dbeafe",
  borderRadius: 16,
  padding: 14,
  marginTop: 12,
};

const closeBtn = {
  marginTop: 16,
  padding: "11px 20px",
  border: "none",
  borderRadius: 14,
  background: "#2563eb",
  color: "white",
  fontWeight: 900,
  cursor: "pointer",
};