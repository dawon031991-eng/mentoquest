export default function Dashboard({
  user,
  setPage,
  logout,
  attendanceCount = 0,
  activityCount = 0,
}) {
  const safeUser = {
    name: user?.name || "사용자",
    school: user?.school || "학교 미설정",
    role: user?.role || "멘티",
    level: Number(user?.level) || 1,
    exp: Number(user?.exp) || 0,
    profileImage: user?.profileImage || "",
  };

  const maxExp = 300;
  const currentExp = Math.min(safeUser.exp, maxExp);
  const expPercent = Math.min(
    Math.round((currentExp / maxExp) * 100),
    100
  );

  const recentActivities = [
    "멘토·멘티 프로그램에 참여했어요.",
    "오늘의 학습 목표를 확인했어요.",
    "새로운 퀘스트에 도전할 준비를 했어요.",
  ];

  const badges = [
    {
      icon: "🌱",
      name: "첫걸음",
      description: "MentoQuest 시작",
    },
    {
      icon: "📚",
      name: "학습 탐험가",
      description: "학습 활동 참여",
    },
    {
      icon: "🤝",
      name: "협력의 시작",
      description: "멘토·멘티 활동",
    },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <button
          type="button"
          style={styles.logoButton}
          onClick={() => setPage("dashboard")}
        >
          <span style={styles.logoIcon}>🎮</span>
          <span style={styles.logoText}>MentoQuest</span>
        </button>

        <div style={styles.headerButtons}>
          <button
            type="button"
            style={styles.headerButton}
            onClick={() => setPage("profile")}
          >
            프로필
          </button>

          <button
            type="button"
            style={styles.logoutButton}
            onClick={logout}
          >
            로그아웃
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.heroCard}>
          <div style={styles.userArea}>
            <div style={styles.avatar}>
              {safeUser.profileImage ? (
                <img
                  src={safeUser.profileImage}
                  alt="프로필"
                  style={styles.avatarImage}
                />
              ) : (
                <span>🎓</span>
              )}
            </div>

            <div>
              <p style={styles.school}>
                {safeUser.school}
              </p>

              <h1 style={styles.greeting}>
                {safeUser.name}님, 반가워요!
              </h1>

              <p style={styles.role}>
                현재 역할:{" "}
                <strong>{safeUser.role}</strong>
              </p>
            </div>
          </div>

          <div style={styles.levelBox}>
            <div style={styles.levelTop}>
              <span style={styles.levelLabel}>
                Lv. {safeUser.level}
              </span>

              <span style={styles.expText}>
                {currentExp} / {maxExp} EXP
              </span>
            </div>

            <div style={styles.expBackground}>
              <div
                style={{
                  ...styles.expFill,
                  width: `${expPercent}%`,
                }}
              />
            </div>

            <p style={styles.levelMessage}>
              다음 레벨까지 {maxExp - currentExp} EXP 남았어요.
            </p>
          </div>
        </section>

        <section style={styles.summaryGrid}>
          <SummaryCard
            icon="✅"
            title="출석 횟수"
            value={`${attendanceCount}회`}
            onClick={() => setPage("attendance")}
          />

          <SummaryCard
            icon="📝"
            title="활동 기록"
            value={`${activityCount}개`}
            onClick={() => setPage("activity")}
          />

          <SummaryCard
            icon="🏅"
            title="획득 배지"
            value={`${badges.length}개`}
            onClick={() => setPage("badge")}
          />
        </section>

        <section style={styles.menuSection}>
          <div style={styles.sectionHeader}>
            <div>
              <p style={styles.sectionEyebrow}>
                QUICK MENU
              </p>

              <h2 style={styles.sectionTitle}>
                무엇을 해볼까요?
              </h2>
            </div>
          </div>

          <div style={styles.menuGrid}>
            <MenuCard
              icon="🧑‍🏫"
              title="멘토 찾기"
              description="나에게 필요한 도움을 줄 멘토를 찾아보세요."
              onClick={() => setPage("mentor")}
            />

            <MenuCard
              icon="🧑‍🎓"
              title="멘티 찾기"
              description="내 강점을 나누고 함께 공부할 멘티를 찾아보세요."
              onClick={() => setPage("mentee")}
            />

            <MenuCard
              icon="📅"
              title="출석 체크"
              description="오늘의 출석을 기록하고 꾸준함을 쌓아보세요."
              onClick={() => setPage("attendance")}
            />

            <MenuCard
              icon="📔"
              title="활동일지"
              description="멘토·멘티 활동과 배운 내용을 기록해보세요."
              onClick={() => setPage("activity")}
            />

            <MenuCard
              icon="🏆"
              title="배지 도감"
              description="획득한 배지와 앞으로 얻을 배지를 확인해보세요."
              onClick={() => setPage("badge")}
            />

            <MenuCard
              icon="⚙️"
              title="내 프로필"
              description="학교, 역할, 소개와 프로필 정보를 관리해보세요."
              onClick={() => setPage("profile")}
            />
          </div>
        </section>

        <section style={styles.bottomGrid}>
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <div>
                <p style={styles.sectionEyebrow}>
                  RECENT
                </p>

                <h2 style={styles.panelTitle}>
                  최근 활동
                </h2>
              </div>

              <button
                type="button"
                style={styles.textButton}
                onClick={() => setPage("activity")}
              >
                전체 보기
              </button>
            </div>

            <div style={styles.activityList}>
              {recentActivities.map((activity, index) => (
                <div
                  key={`${activity}-${index}`}
                  style={styles.activityItem}
                >
                  <span style={styles.activityNumber}>
                    {index + 1}
                  </span>

                  <p style={styles.activityText}>
                    {activity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <div>
                <p style={styles.sectionEyebrow}>
                  BADGES
                </p>

                <h2 style={styles.panelTitle}>
                  나의 배지
                </h2>
              </div>

              <button
                type="button"
                style={styles.textButton}
                onClick={() => setPage("badge")}
              >
                도감 보기
              </button>
            </div>

            <div style={styles.badgeList}>
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  style={styles.badgeItem}
                >
                  <span style={styles.badgeIcon}>
                    {badge.icon}
                  </span>

                  <div>
                    <h3 style={styles.badgeName}>
                      {badge.name}
                    </h3>

                    <p style={styles.badgeDescription}>
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  onClick,
}) {
  return (
    <button
      type="button"
      style={styles.summaryCard}
      onClick={onClick}
    >
      <span style={styles.summaryIcon}>{icon}</span>

      <div style={styles.summaryTextArea}>
        <span style={styles.summaryTitle}>
          {title}
        </span>

        <strong style={styles.summaryValue}>
          {value}
        </strong>
      </div>

      <span style={styles.arrow}>›</span>
    </button>
  );
}

function MenuCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      style={styles.menuCard}
      onClick={onClick}
    >
      <span style={styles.menuIcon}>{icon}</span>

      <h3 style={styles.menuTitle}>{title}</h3>

      <p style={styles.menuDescription}>
        {description}
      </p>

      <span style={styles.menuLink}>
        이동하기 →
      </span>
    </button>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #eff6ff 0%, #f8fafc 38%, #ffffff 100%)",
    color: "#0f172a",
    fontFamily:
      'Pretendard, "Noto Sans KR", Arial, sans-serif',
  },

  header: {
    minHeight: "74px",
    padding: "0 5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    background: "rgba(255, 255, 255, 0.94)",
    borderBottom: "1px solid #dbeafe",
    position: "sticky",
    top: 0,
    zIndex: 10,
    backdropFilter: "blur(12px)",
  },

  logoButton: {
    padding: 0,
    border: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "transparent",
    cursor: "pointer",
  },

  logoIcon: {
    fontSize: "27px",
  },

  logoText: {
    color: "#1d4ed8",
    fontSize: "22px",
    fontWeight: 900,
  },

  headerButtons: {
    display: "flex",
    gap: "10px",
  },

  headerButton: {
    padding: "10px 15px",
    border: "1px solid #bfdbfe",
    borderRadius: "12px",
    background: "#eff6ff",
    color: "#1d4ed8",
    fontWeight: 800,
    cursor: "pointer",
  },

  logoutButton: {
    padding: "10px 15px",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#64748b",
    fontWeight: 800,
    cursor: "pointer",
  },

  main: {
    width: "min(1180px, 90%)",
    margin: "0 auto",
    padding: "38px 0 60px",
  },

  heroCard: {
    padding: "30px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    alignItems: "center",
    gap: "28px",
    borderRadius: "28px",
    background:
      "linear-gradient(135deg, #1d4ed8 0%, #2563eb 52%, #4f46e5 100%)",
    boxShadow:
      "0 24px 60px rgba(37, 99, 235, 0.24)",
    color: "#ffffff",
  },

  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  avatar: {
    width: "78px",
    height: "78px",
    flexShrink: 0,
    borderRadius: "24px",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.18)",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    fontSize: "37px",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  school: {
    margin: "0 0 5px",
    fontSize: "14px",
    fontWeight: 700,
    opacity: 0.8,
  },

  greeting: {
    margin: 0,
    fontSize: "clamp(25px, 4vw, 35px)",
    fontWeight: 900,
  },

  role: {
    margin: "9px 0 0",
    fontSize: "15px",
    opacity: 0.9,
  },

  levelBox: {
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.14)",
    border: "1px solid rgba(255, 255, 255, 0.22)",
  },

  levelTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "12px",
  },

  levelLabel: {
    fontSize: "19px",
    fontWeight: 900,
  },

  expText: {
    fontSize: "14px",
    fontWeight: 800,
    opacity: 0.88,
  },

  expBackground: {
    height: "12px",
    overflow: "hidden",
    borderRadius: "999px",
    background: "rgba(255, 255, 255, 0.25)",
  },

  expFill: {
    height: "100%",
    borderRadius: "999px",
    background: "#ffffff",
    transition: "width 0.4s ease",
  },

  levelMessage: {
    margin: "10px 0 0",
    fontSize: "13px",
    fontWeight: 700,
    opacity: 0.82,
  },

  summaryGrid: {
    marginTop: "22px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },

  summaryCard: {
    padding: "20px",
    border: "1px solid #dbeafe",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textAlign: "left",
    background: "#ffffff",
    boxShadow:
      "0 12px 30px rgba(15, 23, 42, 0.06)",
    cursor: "pointer",
  },

  summaryIcon: {
    width: "48px",
    height: "48px",
    display: "grid",
    placeItems: "center",
    borderRadius: "15px",
    background: "#eff6ff",
    fontSize: "24px",
  },

  summaryTextArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  summaryTitle: {
    color: "#64748b",
    fontSize: "13px",
    fontWeight: 700,
  },

  summaryValue: {
    color: "#1e3a8a",
    fontSize: "22px",
    fontWeight: 900,
  },

  arrow: {
    color: "#93c5fd",
    fontSize: "30px",
  },

  menuSection: {
    marginTop: "44px",
  },

  sectionHeader: {
    marginBottom: "18px",
  },

  sectionEyebrow: {
    margin: "0 0 5px",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: 900,
    letterSpacing: "1.2px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "27px",
    fontWeight: 900,
  },

  menuGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },

  menuCard: {
    minHeight: "210px",
    padding: "24px",
    border: "1px solid #e2e8f0",
    borderRadius: "22px",
    textAlign: "left",
    background: "#ffffff",
    boxShadow:
      "0 12px 30px rgba(15, 23, 42, 0.05)",
    cursor: "pointer",
  },

  menuIcon: {
    width: "52px",
    height: "52px",
    marginBottom: "17px",
    display: "grid",
    placeItems: "center",
    borderRadius: "16px",
    background: "#eff6ff",
    fontSize: "27px",
  },

  menuTitle: {
    margin: 0,
    color: "#0f172a",
    fontSize: "19px",
    fontWeight: 900,
  },

  menuDescription: {
    minHeight: "48px",
    margin: "9px 0 16px",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.65,
  },

  menuLink: {
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: 900,
  },

  bottomGrid: {
    marginTop: "44px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "20px",
  },

  panel: {
    padding: "24px",
    border: "1px solid #e2e8f0",
    borderRadius: "24px",
    background: "#ffffff",
    boxShadow:
      "0 12px 30px rgba(15, 23, 42, 0.05)",
  },

  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "18px",
  },

  panelTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 900,
  },

  textButton: {
    padding: 0,
    border: "none",
    background: "transparent",
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: 900,
    cursor: "pointer",
  },

  activityList: {
    display: "grid",
    gap: "11px",
  },

  activityItem: {
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderRadius: "16px",
    background: "#f8fafc",
  },

  activityNumber: {
    width: "30px",
    height: "30px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "10px",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontSize: "13px",
    fontWeight: 900,
  },

  activityText: {
    margin: 0,
    color: "#334155",
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: 1.5,
  },

  badgeList: {
    display: "grid",
    gap: "11px",
  },

  badgeItem: {
    padding: "13px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    borderRadius: "16px",
    background: "#f8fafc",
  },

  badgeIcon: {
    width: "44px",
    height: "44px",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "14px",
    background: "#eff6ff",
    fontSize: "23px",
  },

  badgeName: {
    margin: 0,
    fontSize: "15px",
    fontWeight: 900,
  },

  badgeDescription: {
    margin: "4px 0 0",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: 600,
  },
};