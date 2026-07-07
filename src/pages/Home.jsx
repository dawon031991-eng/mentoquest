export default function Home({ setPage }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        <h1 className="text-5xl font-bold text-blue-700">🎓 MentoQuest</h1>

        <p className="mt-4 text-gray-600">
          게임처럼 성장하는
          <br />
          교내 멘토·멘티 플랫폼
        </p>

        <button
          onClick={() => setPage("login")}
          className="mt-8 bg-blue-700 text-white px-8 py-3 rounded-xl font-bold"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}