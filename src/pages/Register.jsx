import { useState } from "react";
import { supabase } from "../supabase";

export default function Register({ setPage, setUser }) {
  const [form, setForm] = useState({
    school: "",
    name: "",
    studentId: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "mentor",
    intro: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateForm(field, value) {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  }

  async function register() {
    setMessage("");

    if (
      !form.school.trim() ||
      !form.name.trim() ||
      !form.studentId.trim() ||
      !form.email.trim() ||
      !form.password
    ) {
      setMessage("학교, 이름, 학번, 이메일, 비밀번호를 모두 입력해 주세요.");
      return;
    }

    if (form.password.length < 6) {
      setMessage("비밀번호는 6자 이상으로 입력해 주세요.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setMessage("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          name: form.name.trim(),
          school: form.school.trim(),
          student_id: form.studentId.trim(),
          role: form.role,
          intro: form.intro.trim(),
        },
      },
    });

    if (error) {
      setMessage(`회원가입 실패: ${error.message}`);
      setLoading(false);
      return;
    }

    const newUser = data.user;

    if (!newUser) {
      setMessage("회원가입 처리 중 문제가 발생했습니다.");
      setLoading(false);
      return;
    }

    setUser({
      id: newUser.id,
      email: newUser.email,
      name: form.name.trim(),
      school: form.school.trim(),
      studentId: form.studentId.trim(),
      role: form.role,
      intro: form.intro.trim(),
    });

    setLoading(false);

    if (data.session) {
      setPage("dashboard");
    } else {
      setMessage(
        "회원가입이 완료되었습니다. 이메일 인증 후 로그인해 주세요."
      );

      setTimeout(() => {
        setPage("login");
      }, 2500);
    }
  }

  async function googleRegister() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(`Google 회원가입 실패: ${error.message}`);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-[460px]">
        <h1 className="text-3xl font-black text-blue-700 text-center">
          회원가입
        </h1>

        <p className="text-center text-gray-500 mt-2">
          MentoQuest에서 함께 성장해 보세요
        </p>

        <input
          className="mt-6 w-full border rounded-xl p-3 outline-none focus:border-blue-500"
          placeholder="학교 이름"
          value={form.school}
          onChange={(event) => updateForm("school", event.target.value)}
        />

        <input
          className="mt-3 w-full border rounded-xl p-3 outline-none focus:border-blue-500"
          placeholder="이름"
          value={form.name}
          onChange={(event) => updateForm("name", event.target.value)}
        />

        <input
          className="mt-3 w-full border rounded-xl p-3 outline-none focus:border-blue-500"
          placeholder="학번"
          value={form.studentId}
          onChange={(event) => updateForm("studentId", event.target.value)}
        />

        <input
          type="email"
          className="mt-3 w-full border rounded-xl p-3 outline-none focus:border-blue-500"
          placeholder="이메일"
          value={form.email}
          onChange={(event) => updateForm("email", event.target.value)}
        />

        <input
          type="password"
          className="mt-3 w-full border rounded-xl p-3 outline-none focus:border-blue-500"
          placeholder="비밀번호 6자 이상"
          value={form.password}
          onChange={(event) => updateForm("password", event.target.value)}
        />

        <input
          type="password"
          className="mt-3 w-full border rounded-xl p-3 outline-none focus:border-blue-500"
          placeholder="비밀번호 확인"
          value={form.passwordConfirm}
          onChange={(event) =>
            updateForm("passwordConfirm", event.target.value)
          }
        />

        <p className="mt-5 text-sm font-bold text-gray-600">
          활동 역할을 선택해 주세요.
        </p>

        <div className="mt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateForm("role", "mentor")}
            className={`p-3 rounded-xl font-bold transition ${
              form.role === "mentor"
                ? "bg-blue-700 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            👨‍🏫 멘토
          </button>

          <button
            type="button"
            onClick={() => updateForm("role", "mentee")}
            className={`p-3 rounded-xl font-bold transition ${
              form.role === "mentee"
                ? "bg-blue-700 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            👩‍🎓 멘티
          </button>
        </div>

        <textarea
          className="mt-4 w-full border rounded-xl p-3 h-24 resize-none outline-none focus:border-blue-500"
          placeholder={
            form.role === "mentor"
              ? "자신 있는 과목과 나의 강점"
              : "도움이 필요한 과목이나 부분"
          }
          value={form.intro}
          onChange={(event) => updateForm("intro", event.target.value)}
        />

        {message && (
          <p className="mt-4 text-sm text-center text-red-500 leading-6">
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={register}
          disabled={loading}
          className="mt-5 w-full bg-blue-700 text-white py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? "처리 중..." : "가입하고 시작하기"}
        </button>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">또는</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={googleRegister}
          disabled={loading}
          className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-xl font-bold disabled:opacity-50"
        >
          Google 계정으로 시작하기
        </button>

        <button
          type="button"
          onClick={() => setPage("login")}
          className="w-full mt-4 text-blue-600 font-medium"
        >
          이미 계정이 있나요? 로그인하기
        </button>

        <button
          type="button"
          onClick={() => setPage("home")}
          className="w-full mt-3 text-sm text-gray-500"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}