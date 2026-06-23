import React from 'react';
import { Shield, ShieldAlert, Key, Lock, CheckCircle, AlertTriangle, Activity, Eye, FileSpreadsheet, Terminal } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';

export const SecurityResearch: React.FC = () => {
  const recommendations = [
    { title: 'Rate Limiting', desc: 'Restrict maximum login attempts per IP inside designated timeframes.', icon: <Activity size={14} className="text-neon-pink" />, bg: 'bg-neon-pink/10 border-neon-pink/20' },
    { title: 'Account Lockout', desc: 'Lock user accounts temporarily after consecutive failed login cycles.', icon: <Lock size={14} className="text-neon-cyan" />, bg: 'bg-neon-cyan/10 border-neon-cyan/20' },
    { title: 'CAPTCHA Gateways', desc: 'Deploy automated challenge gates to block dictionary/brute-force bots.', icon: <Shield size={14} className="text-neon-purple" />, bg: 'bg-neon-purple/10 border-neon-purple/20' },
    { title: 'Strong Password Policies', desc: 'Enforce uppercase, number, symbol, and minimum length requirements.', icon: <Key size={14} className="text-neon-green" />, bg: 'bg-neon-green/10 border-neon-green/20' },
    { title: 'Multi-Factor Auth (MFA)', desc: 'Deploy secondary verification layers for elevated roles.', icon: <AlertTriangle size={14} className="text-neon-orange" />, bg: 'bg-neon-orange/10 border-neon-orange/20' }
  ];

  const attackSurfaces = [
    { layer: 'Authentication Layer', desc: 'Login portal interface, password exchange mechanisms, and session token allocation.' },
    { layer: 'Account Security Controls', desc: 'Lockout gates, request limits, and brute-force protections.' },
    { layer: 'Access Management', desc: 'Role parsing, page-level routing controls, and student vs. faculty data boundaries.' }
  ];

  const riskMatrix = [
    { threat: 'Automated Brute-Force', severity: 'HIGH', impact: 'Account Takeover', likelihood: 'High', status: 'Mitigated' },
    { threat: 'Credential Guessing', severity: 'MEDIUM', impact: 'Unauthorized Access', likelihood: 'Medium', status: 'Mitigated' },
    { threat: 'Academic Record Tampering', severity: 'CRITICAL', impact: 'Data Destruction', likelihood: 'Low', status: 'Mitigated' }
  ];

  const outcomes = [
    { title: 'Authentication Security', desc: 'Gained hands-on knowledge of authentication mechanics, session integrity rules, and state protections.' },
    { title: 'Vulnerability Assessment', desc: 'Learned systematic vulnerability analysis, checking boundaries, and mapping risk vectors.' },
    { title: 'Responsible Disclosure', desc: 'Understood responsible disclosure standards, reporting to developers, and coordination.' },
    { title: 'Risk Analysis', desc: 'Mastered threat mapping methodologies, threat severity assessment, and mitigation engineering.' }
  ];

  return (
    <SectionWrapper id="security-research" className="relative">
      
      {/* 1. Header Section */}
      <div className="text-center md:text-left mb-12 relative">
        <div className="absolute -top-10 -left-6 w-32 h-32 bg-neon-cyan/5 rounded-full blur-[45px] pointer-events-none" />
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 font-mono uppercase">
          &gt;_ SECURITY RESEARCH CASE STUDY
        </h2>
        <p className="text-xs md:text-sm text-slate-650 dark:text-slate-400 font-mono tracking-wide max-w-2xl leading-relaxed">
          Authorized vulnerability assessment, threat mapping, risk analysis, and responsible disclosure on academic systems.
        </p>
        <div className="h-1 w-20 bg-neon-cyan rounded mt-4 mx-auto md:mx-0" />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Columns (8 Columns): Assessment Details, Attack Surface, Risk Matrix */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Main Assessment Log */}
          <div className="glass-panel bg-[#070c18]/45 border border-neon-cyan/15 p-6 md:p-8 rounded-3xl flex flex-col justify-between shadow-xl group">
            <div>
              {/* Status Tags */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                <span className="text-[9px] font-mono font-bold tracking-wider bg-cyan-500/10 text-neon-cyan border border-cyan-500/25 px-2.5 py-1 rounded-full uppercase">
                  🛡️ Authorized Assessment
                </span>
                <span className="text-[9px] font-mono font-bold tracking-wider bg-emerald-500/10 text-neon-green border border-emerald-500/25 px-2.5 py-1 rounded-full uppercase">
                  🤝 Responsible Disclosure
                </span>
                <span className="text-[9px] font-mono font-bold tracking-wider bg-purple-500/10 text-neon-purple border border-purple-500/25 px-2.5 py-1 rounded-full uppercase">
                  ⚙️ Mitigated Risk
                </span>
              </div>

              {/* Title Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/25 text-neon-cyan rounded-2xl group-hover:scale-105 transition-transform">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-white font-display mb-1.5">
                    Academic Platform Authentication Security Assessment
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    Scope: College Attendance &amp; Marks Management Portal
                  </span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-8">
                Conducted an authorized security assessment of the college attendance and academic management platform under faculty awareness and supervision. The objective was to evaluate authentication controls, explore threats affecting critical records, and supply remediations to harden the system's defenses.
              </p>

              {/* Section 1: Attack Surface Analysis */}
              <h4 className="text-xs font-mono font-bold tracking-wider text-neon-cyan uppercase mb-4 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Eye size={13} />
                <span>1. ATTACK SURFACE ANALYSIS</span>
              </h4>
              <div className="space-y-4 mb-8">
                {attackSurfaces.map((item, idx) => (
                  <div key={idx} className="bg-black/30 border border-slate-900 p-3.5 rounded-xl font-sans text-xs">
                    <span className="font-bold text-white font-display block mb-1">{item.layer}</span>
                    <p className="text-slate-400 font-mono text-[10px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Section 2: Risk Assessment Matrix */}
              <h4 className="text-xs font-mono font-bold tracking-wider text-neon-cyan uppercase mb-4 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <FileSpreadsheet size={13} />
                <span>2. RISK ASSESSMENT MATRIX</span>
              </h4>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left font-mono text-[10px] text-slate-400 border border-slate-900 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-black/40 border-b border-slate-900 text-slate-500 uppercase tracking-widest">
                      <th className="p-3">Threat Vector</th>
                      <th className="p-3">Severity</th>
                      <th className="p-3">Impact</th>
                      <th className="p-3">Likelihood</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 bg-black/10">
                    {riskMatrix.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-950/40">
                        <td className="p-3 font-semibold text-white">{row.threat}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                            row.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                            row.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                            'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          }`}>
                            {row.severity}
                          </span>
                        </td>
                        <td className="p-3 text-[9px] text-slate-450">{row.impact}</td>
                        <td className="p-3">{row.likelihood}</td>
                        <td className="p-3 text-neon-green font-bold flex items-center gap-1">
                          <CheckCircle size={10} />
                          {row.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            <div className="border-t border-slate-800 pt-4 mt-8 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldAlert size={12} className="text-neon-cyan animate-pulse" /> SECURITY_CLASSIFICATION: INTERNAL_DISCLOSED
              </span>
              <span>VERIFIED STATUS: MITIGATED</span>
            </div>
          </div>
        </div>

        {/* Right Columns (4 Columns): HUD, Recommendations, Outcomes */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Telemetry HUD */}
          <div className="glass-panel bg-[#070c18]/50 border border-neon-cyan/10 p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6 font-mono text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Activity size={10} className="text-neon-cyan animate-pulse" /> HUD_TELEMETRY: ACTIVE
                </span>
                <span className="text-neon-green font-bold">● ONLINE</span>
              </div>

              <div className="space-y-4">
                <div className="bg-black/30 border border-slate-800/70 p-3.5 rounded-xl">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">TARGET</span>
                  <span className="text-xs font-bold text-neon-cyan font-mono">ACADEMIC_PORTAL</span>
                </div>
                <div className="bg-black/30 border border-slate-800/70 p-3.5 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase block">DISCLOSURE</span>
                    <span className="text-xs font-bold text-white font-display">RESPONSIBLE</span>
                  </div>
                  <CheckCircle size={15} className="text-neon-green" />
                </div>
                <div className="bg-black/30 border border-slate-800/70 p-3.5 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase">RISK LEVEL</span>
                    <span className="text-[8px] font-mono font-bold text-neon-pink bg-neon-pink/10 px-1.5 py-0.5 rounded">
                      CRITICAL → MINIMAL
                    </span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div className="flex-1 bg-neon-green/90 rounded-sm" />
                    <div className="flex-1 bg-neon-cyan/90 rounded-sm" />
                    <div className="flex-1 bg-neon-purple/80 rounded-sm" />
                    <div className="flex-1 bg-slate-800 rounded-sm" />
                    <div className="flex-1 bg-slate-800 rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 mt-6 text-[8px] font-mono text-slate-550 space-y-1">
              <div>&gt; AUTH_KEY: AES_256_ACTIVE</div>
              <div>&gt; VERIFICATION_HASH: 0xFD492A...OK</div>
            </div>
          </div>

          {/* Hardening Recommendations */}
          <div className="glass-panel bg-[#070c18]/45 border border-neon-cyan/10 p-6 rounded-3xl shadow-xl flex flex-col">
            <h4 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase mb-4 flex items-center gap-1.5">
              <Key size={14} className="text-neon-cyan" />
              <span>3. HARDENING RECOMMENDATIONS</span>
            </h4>
            <div className="space-y-3 font-sans">
              {recommendations.map((rec, rIdx) => (
                <div key={rIdx} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-900/40 transition-colors">
                  <div className={`p-2 rounded-xl mt-0.5 ${rec.bg}`}>
                    {rec.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-200 font-display">{rec.title}</h5>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5 leading-snug">{rec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="glass-panel bg-[#070c18]/45 border border-neon-cyan/10 p-6 rounded-3xl shadow-xl flex flex-col">
            <h4 className="text-xs font-mono font-bold tracking-wider text-slate-350 uppercase mb-4 flex items-center gap-1.5">
              <Terminal size={14} className="text-neon-cyan" />
              <span>4. LEARNING OUTCOMES</span>
            </h4>
            <div className="space-y-3.5 font-sans">
              {outcomes.map((item, oIdx) => (
                <div key={oIdx} className="text-left">
                  <h5 className="text-xs font-bold text-slate-200 font-display flex items-center gap-1">
                    <span className="text-neon-cyan font-mono">&gt;</span> {item.title}
                  </h5>
                  <p className="text-[9px] text-slate-400 font-mono mt-1 pl-3.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </SectionWrapper>
  );
};

export default SecurityResearch;
