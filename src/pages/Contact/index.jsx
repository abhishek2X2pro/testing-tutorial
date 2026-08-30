// ============================================================
// Contact Page — DevOpsX
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error('Please fill all required fields');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success('Message sent! We\'ll reply within 24 hours. 🎉');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@devopsx.io', href: 'mailto:hello@devopsx.io' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MapPin, label: 'Address', value: 'Koramangala, Bangalore 560034, India', href: '#' },
    { icon: Clock, label: 'Support Hours', value: 'Mon–Sat, 9AM–6PM IST', href: '#' },
  ];

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>Contact Us</h1>
          <p className="text-gray-400 max-w-lg mx-auto">Have a question? We're here to help. Send us a message and we'll respond within 24 hours.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href}
                className="flex items-start gap-4 p-4 rounded-2xl border transition-all hover:border-blue-500/30 hover:shadow-lg"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(6,182,212,0.2))' }}>
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
                  <p className="text-white text-sm font-medium mt-0.5">{value}</p>
                </div>
              </a>
            ))}

            {/* FAQ CTA */}
            <div className="p-5 rounded-2xl border border-blue-500/20" style={{ background: 'rgba(59,130,246,0.06)' }}>
              <MessageSquare size={20} className="text-blue-400 mb-2" />
              <h4 className="text-white font-semibold mb-1">Check our FAQ</h4>
              <p className="text-gray-400 text-sm">Quick answers to common questions about courses, certificates, and more.</p>
            </div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-3 p-8 rounded-2xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
            <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { field: 'name', label: 'Full Name', placeholder: 'Your full name' },
                  { field: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
                ].map(({ field, label, placeholder, type = 'text' }) => (
                  <div key={field}>
                    <label className="block text-sm text-gray-400 mb-1.5">{label} <span className="text-red-400">*</span></label>
                    <input type={type} placeholder={placeholder} value={form[field]}
                      onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl text-white text-sm placeholder-gray-500 border border-white/10 focus:border-blue-500/60 outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)' }} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Subject</label>
                <input placeholder="How can we help?" value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl text-white text-sm placeholder-gray-500 border border-white/10 focus:border-blue-500/60 outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Message <span className="text-red-400">*</span></label>
                <textarea rows={5} placeholder="Tell us what's on your mind..." value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl text-white text-sm placeholder-gray-500 border border-white/10 focus:border-blue-500/60 outline-none transition-all resize-none"
                  style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
              <Button type="submit" loading={loading} fullWidth size="lg" icon={Send}>
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
