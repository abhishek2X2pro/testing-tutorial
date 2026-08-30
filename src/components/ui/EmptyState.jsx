// ============================================================
// EmptyState Component — DevOpsX UI
// ============================================================

import { motion } from 'framer-motion';
import { Search, BookOpen, Heart, Award, Inbox } from 'lucide-react';
import Button from './Button';

const icons = {
  search: Search,
  courses: BookOpen,
  wishlist: Heart,
  certificates: Award,
  default: Inbox,
};

export default function EmptyState({
  icon = 'default',
  title = 'Nothing here yet',
  description = 'There is no content to display at the moment.',
  action,
  actionLabel,
}) {
  const Icon = icons[icon] || icons.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <Icon size={36} className="text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)' }} className="mb-8 max-w-sm">{description}</p>
      {action && actionLabel && (
        <Button onClick={action}>{actionLabel}</Button>
      )}
    </motion.div>
  );
}
