// ============================================================
// About Page — DevOpsX
// ============================================================

import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Globe, Heart, Code2 } from 'lucide-react';
import { instructors } from '../../data/instructors';

const values = [
  { icon: Heart, title: 'Quality First', desc: 'Every course is reviewed by experts before publication.' },
  { icon: Globe, title: 'Learn Anywhere', desc: 'Access your courses on any device, anytime, anywhere.' },
  { icon: Users, title: 'Community', desc: 'Join 10,000+ learners and grow together.' },
  { icon: Award, title: 'Certifications', desc: 'Earn verifiable certificates recognized by employers.' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="blob absolute w-96 h-96 -top-20 left-1/2 -translate-x-1/2 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full text-sm text-blue-400 border border-blue-500/30 mb-6" style={{ background: 'rgba(59,130,246,0.08)' }}>
            About DevOpsX
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            We're on a mission to make<br />
            <span className="gradient-text">tech education accessible</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            DevOpsX was founded in 2023 with a simple belief: world-class technical education should be available to everyone, regardless of geography or financial background.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[['500+', 'Courses'], ['10K+', 'Students'], ['50+', 'Instructors'], ['8K+', 'Certificates']].map(([val, lbl]) => (
            <div key={lbl} className="text-center p-5 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
              <p className="text-3xl font-bold gradient-text mb-1" style={{ fontFamily: 'var(--font-display)' }}>{val}</p>
              <p className="text-gray-400 text-sm">{lbl}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>Our Mission</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We created DevOpsX because we saw the gap between what universities teach and what the industry needs. DevOps, Cloud, and modern engineering skills are increasingly in demand, yet quality educational resources remain expensive and scattered.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our instructors are active professionals who've worked at companies like Google, Amazon, Microsoft, and Infosys. They bring real-world experience into every lesson.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-4 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(6,182,212,0.2))' }}>
                  <Icon size={18} className="text-blue-400" />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
                <p className="text-gray-400 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10" style={{ fontFamily: 'var(--font-display)' }}>Meet Our Instructors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {instructors.slice(0, 4).map((inst, i) => (
              <motion.div key={inst.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border text-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                <img src={inst.avatar} alt={inst.name} className="w-20 h-20 rounded-full border-2 border-blue-500/30" />
                <div>
                  <h4 className="text-white font-semibold text-sm">{inst.name}</h4>
                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{inst.title}</p>
                </div>
                <p className="text-xs text-blue-400">⭐ {inst.rating} ({(inst.students / 1000).toFixed(0)}K students)</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
