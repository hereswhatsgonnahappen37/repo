import { useState, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setStatus('submitting');
    setErrorMsg('');

    const { error } = await supabase
      .from('event_registrations')
      .insert({ name: name.trim(), phone: phone.trim() });

    if (error) {
      setStatus('error');
      setErrorMsg('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
      return;
    }

    setStatus('success');
    setName('');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md border border-gray-300 bg-white">
        {/* Wireframe header bar */}
        <div className="border-b border-gray-300 px-6 py-5">
          <div className="h-3 w-20 bg-gray-800 mb-3" />
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">
            이벤트 신청서
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            아래 정보를 입력하고 신청 버튼을 눌러주세요.
          </p>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {/* Name field */}
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름 <span className="text-gray-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none transition-colors"
            />
          </div>

          {/* Phone field */}
          <div className="space-y-1.5">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              전화번호 <span className="text-gray-400">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none transition-colors"
            />
          </div>

          {/* Submit button - the one element that stands out */}
          <button
            type="submit"
            disabled={status === 'submitting' || !name.trim() || !phone.trim()}
            className="w-full bg-gray-900 text-white font-semibold text-sm py-3 hover:bg-black active:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'submitting' ? '신청 중...' : '신청하기'}
          </button>

          {/* Status messages */}
          {status === 'success' && (
            <p className="text-sm text-gray-900 border border-gray-300 px-3 py-2">
              신청이 완료되었습니다. 감사합니다!
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-gray-900 border border-gray-300 px-3 py-2">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
