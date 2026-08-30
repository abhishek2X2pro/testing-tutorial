// ============================================================
// Mock Categories Data
// Highlighted for Cloud Computing & AI
// ============================================================

import {
  Code2, Server, Cloud, Shield, Database, Cpu, Globe, BookOpen,
  Terminal, GitBranch, Layers, Activity, Brain, Zap
} from 'lucide-react';

export const categories = [
  {
    id: 1, name: 'Cloud Computing', slug: 'cloud', icon: 'Cloud',
    description: 'AWS, Azure, GCP & multi-cloud architectures',
    courseCount: 2, color: 'from-cyan-500 to-teal-500',
    subcategories: ['AWS', 'Azure', 'GCP', 'Cloud Architecture', 'FinOps'],
  },
  {
    id: 2, name: 'AI & Machine Learning', slug: 'ai-ml', icon: 'Brain',
    description: 'Generative AI, LLMs, PyTorch & production ML',
    courseCount: 2, color: 'from-pink-500 to-rose-500',
    subcategories: ['Generative AI', 'LLMs', 'PyTorch', 'TensorFlow', 'MLOps'],
  },
];

export const learningPaths = [
  {
    id: 1,
    title: 'Cloud Architect',
    description: 'AWS Fundamentals → Networking → Security → Architecture → Multi-Cloud',
    duration: '4 months',
    courses: 2,
    level: 'Basic to Intermediate',
    color: 'from-cyan-600 to-teal-500',
    icon: 'Cloud',
    skills: ['AWS', 'Cloud Architecture', 'Subnetting', 'Serverless', 'Security'],
  },
  {
    id: 2,
    title: 'AI & MLOps Engineer',
    description: 'Python Basics → ML Models → LLMs → RAG → Production MLOps',
    duration: '6 months',
    courses: 2,
    level: 'Basic to Advanced',
    color: 'from-pink-600 to-rose-500',
    icon: 'Brain',
    skills: ['Python', 'Machine Learning', 'LLMs', 'RAG', 'Vector DBs', 'MLOps'],
  },
];
