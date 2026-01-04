import axios from 'axios';
import { AlertTriangle, BarChart3, Check, Copy, Link, RefreshCw, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

interface UrlStats {
  shortCode: string;
  originalUrl: string;
  clickCount: number;
}

export default function App() {
  const { t, i18n } = useTranslation();
  const [url, setUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<UrlStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [isErrorPage, setIsErrorPage] = useState(false);

  // Definindo a URL base do seu Backend no Render
  const API_BASE_URL = 'https://hermes-backend-zy5e.onrender.com';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === 'notfound') setIsErrorPage(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Atualizado para a URL do Render
      const res = await axios.get(`${API_BASE_URL}/api/v1/analytics/top`);
      setStats(res.data);
    } catch (e) { console.error(e); }
  };

  const handleShorten = async () => {
    if (!url) return;
    if (url.length < 20 && !url.includes('hermes-backend')) {
      if (!confirm('This URL is already very short. Do you want to shorten it anyway?')) return;
    }

    setLoading(true);
    try {
      // Atualizado para a URL do Render
      const response = await axios.post(`${API_BASE_URL}/api/v1/shorten`, { url });
      setShortCode(response.data);
      fetchStats();
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const copyToClipboard = () => {
    // Atualizado para copiar o link final do Render
    navigator.clipboard.writeText(`${API_BASE_URL}/${shortCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isErrorPage) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-amber-500/20 p-10 rounded-[2rem] flex flex-col items-center text-center max-w-sm shadow-2xl">
          <AlertTriangle size={60} className="text-amber-500 mb-4 animate-pulse" />
          <h1 className="text-3xl font-black tracking-tighter mb-2 text-amber-500 uppercase">{t('error_title')}</h1>
          <p className="text-slate-400 mb-6 text-sm">{t('error_desc')}</p>
          <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl hover:bg-amber-400 transition-all uppercase text-sm">
            <RefreshCw size={18} /> {t('error_button')}
          </button>
        </div>
        <p className="mt-8 text-slate-800 text-[9px] font-bold uppercase tracking-[0.5em] opacity-30">{t('footer')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-4 flex items-center justify-center">
      <div className="fixed top-4 right-4 flex gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
        {['en', 'pt', 'es'].map((lng) => (
          <button key={lng} onClick={() => i18n.changeLanguage(lng)} className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all ${i18n.language === lng ? 'bg-amber-500 text-slate-950' : 'text-slate-500 hover:text-slate-300'}`}>
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl animate-in fade-in duration-700">
        <header className="flex items-center justify-center gap-3 mb-10">
          <div className="bg-amber-500 p-3 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <Zap size={32} className="text-slate-950 fill-current" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter italic uppercase">Hermes</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-xl">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('placeholder')}</label>
                <div className="relative">
                  <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input
                    type="url"
                    className="w-full bg-slate-950 border border-slate-800 p-4 pl-12 rounded-xl focus:ring-1 focus:ring-amber-500 outline-none transition-all text-sm text-slate-200"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
              <button onClick={handleShorten} disabled={loading} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 rounded-xl transition-all uppercase tracking-tighter text-sm">
                {loading ? t('processing') : t('button')}
              </button>

              {shortCode && (
                <div className="mt-6 p-4 bg-slate-950 border border-amber-500/20 rounded-xl flex items-center justify-between animate-in zoom-in-95">
                  {/* Exibindo a URL final encurtada do Render */}
                  <span className="text-amber-500 font-mono font-bold text-sm">hermes-backend-zy5e.onrender.com/{shortCode}</span>
                  <button onClick={copyToClipboard} className="p-2 hover:bg-slate-900 rounded-lg transition-colors">
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-slate-500" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem]">
            <h2 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 ml-1">
              <BarChart3 size={14} className="text-amber-500" /> {t('stats_title')}
            </h2>
            <div className="space-y-3">
              {stats.slice(0, 4).map((item) => (
                <div key={item.shortCode} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800/50">
                  <span className="text-amber-500 font-mono text-xs font-bold">/{item.shortCode}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-slate-200">{item.clickCount}</span>
                    <span className="text-[8px] font-bold text-slate-600 uppercase italic">clicks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="mt-10 flex justify-center">
          <p className="text-slate-800 text-[9px] font-bold uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-opacity">
            {t('footer')}
          </p>
        </footer>
      </div>
    </div>
  );
}