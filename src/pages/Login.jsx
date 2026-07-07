export default function Login({ setPage, setUser }) {
  function login() {
    setUser({
      name: "이다원",
      school: "우리 학교",
      role: "멘티",
    });

    setPage("dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          로그인
        </h1>

        <input className="w-full border p-3 rounded-xl mb-3" placeholder="학교 이름" />
        <input className="w-full border p-3 rounded-xl mb-3" placeholder="학번" />
        <input className="w-full border p-3 rounded-xl mb-5" placeholder="비밀번호" />

        <button
          onClick={login}
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold"
        >
          로그인하기
        </button>

        <button
          onClick={() => setPage("register")}
          className="w-full mt-4 text-blue-600"
        >
          회원가입하기
        </button>
      </div>
    </div>
  );
}