import React, { useEffect, useMemo, useState } from 'react';

const OWNERS = ['MahmutSibal', 'muhammetoner', 'yldzucucu21'];

const fetchUserRepos = async (user) => {
  const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
};

const RepoCard = ({ repo }) => (
  <div className="glass p-5 rounded-xl flex flex-col gap-3">
    <div className="flex items-start justify-between gap-3">
      <div>
        <a className="text-white font-semibold hover:underline" href={repo.html_url} target="_blank" rel="noreferrer">{repo.full_name}</a>
        <div className="text-xs text-gray-400 mt-1">★ {repo.stargazers_count} • {repo.language || 'Other'}</div>
      </div>
      {repo.homepage && (
        <a href={repo.homepage} target="_blank" rel="noreferrer" className="text-xs text-brand-300 hover:underline">Demo</a>
      )}
    </div>
    {repo.description && <p className="text-sm text-gray-300">{repo.description}</p>}
    <div className="flex flex-wrap gap-2 mt-1">
      {(repo.topics || []).slice(0,6).map(t=> (
        <span key={t} className="px-2 py-1 rounded bg-black/5 border border-black/10 text-xs">#{t}</span>
      ))}
    </div>
  </div>
);

const GithubProjects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [owner, setOwner] = useState('all');
  const [language, setLanguage] = useState('all');

  useEffect(()=>{
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const all = (await Promise.all(OWNERS.map(u=> fetchUserRepos(u)))).flat();
        // sort by stars desc and keep non-archived
        const cleaned = all
          .filter(r => !r.archived && !r.fork)
          .sort((a,b)=> (b.stargazers_count||0) - (a.stargazers_count||0));
        if (mounted) setRepos(cleaned);
      } catch (e) {
        if (mounted) setError('GitHub verileri alınamadı. Daha sonra tekrar deneyin.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return ()=> { mounted = false; };
  }, []);

  const owners = useMemo(()=> ['all', ...OWNERS], []);
  const languages = useMemo(()=> {
    const set = new Set(repos.map(r=> r.language).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [repos]);

  const filtered = useMemo(()=>{
    return repos.filter(r=> (owner==='all' || r.owner.login===owner) && (language==='all' || r.language===language)).slice(0,6);
  }, [repos, owner, language]);

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select value={owner} onChange={(e)=>setOwner(e.target.value)} className="px-3 py-2 rounded bg-white text-black border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          {owners.map(o=> <option key={o} value={o}>{o==='all' ? 'Tümü' : o}</option>)}
        </select>
        <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="px-3 py-2 rounded bg-white text-black border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          {languages.map(l=> <option key={l} value={l}>{l==='all' ? 'Diller (Tümü)' : l}</option>)}
        </select>
      </div>
      {loading && <p className="text-gray-400">Yükleniyor…</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {!loading && !error && (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map(r=> <RepoCard key={r.id} repo={r} />)}
        </div>
      )}
    </section>
  );
};

export default GithubProjects;
