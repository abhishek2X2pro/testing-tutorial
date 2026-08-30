// ============================================================
// Mock Assignments, Notes, FAQ Data
// ============================================================

// --- Assignments ---
export const assignments = [
  {
    id: 1, courseId: 1, title: 'Write a Dockerfile for a Node.js App',
    description: 'Create a multi-stage Dockerfile for a production-ready Node.js REST API. Include non-root user, health checks and minimal image size.',
    dueDate: '2025-01-15', status: 'pending', difficulty: 'Medium',
    points: 100, type: 'Hands-on', estimatedTime: '2 hours',
    tags: ['Docker', 'Node.js', 'DevOps'],
  },
  {
    id: 2, courseId: 1, title: 'Deploy App on Kubernetes',
    description: 'Create Kubernetes manifests (Deployment, Service, ConfigMap, HPA) for a sample application. Deploy to a local minikube cluster.',
    dueDate: '2025-01-22', status: 'in-progress', difficulty: 'Hard',
    points: 150, type: 'Project', estimatedTime: '4 hours',
    tags: ['Kubernetes', 'K8s', 'Deployment'],
  },
  {
    id: 3, courseId: 2, title: 'Set up AWS VPC with Terraform',
    description: 'Provision a production-grade AWS VPC with public/private subnets, NAT Gateway, Internet Gateway, and security groups using Terraform.',
    dueDate: '2025-01-18', status: 'completed', difficulty: 'Hard',
    points: 200, type: 'Project', estimatedTime: '5 hours',
    tags: ['AWS', 'Terraform', 'VPC', 'Networking'],
  },
  {
    id: 4, courseId: 3, title: 'Build a REST API with Node.js & Express',
    description: 'Create a complete CRUD REST API with authentication (JWT), validation, error handling, and MongoDB integration.',
    dueDate: '2025-01-25', status: 'pending', difficulty: 'Medium',
    points: 120, type: 'Coding', estimatedTime: '3 hours',
    tags: ['Node.js', 'REST API', 'MongoDB', 'JWT'],
  },
  {
    id: 5, courseId: 5, title: 'Train a Classification Model',
    description: 'Build and train a ML classification model on the Titanic dataset. Achieve 85%+ accuracy with proper EDA, feature engineering, and model selection.',
    dueDate: '2025-02-01', status: 'pending', difficulty: 'Medium',
    points: 130, type: 'Notebook', estimatedTime: '4 hours',
    tags: ['Python', 'Machine Learning', 'Scikit-learn'],
  },
  {
    id: 6, courseId: 8, title: 'Penetration Test Report',
    description: 'Conduct a full penetration test on the provided vulnerable VM (DVWA). Submit a professional report with findings, CVSS scores, and remediation steps.',
    dueDate: '2025-02-08', status: 'pending', difficulty: 'Hard',
    points: 250, type: 'Report', estimatedTime: '8 hours',
    tags: ['Pentesting', 'DVWA', 'Report Writing'],
  },
  {
    id: 7, courseId: 6, title: 'Shell Script for System Monitoring',
    description: 'Write a comprehensive bash script that monitors CPU, memory, disk usage, network traffic, and running processes. Alert when thresholds are exceeded.',
    dueDate: '2025-01-30', status: 'completed', difficulty: 'Medium',
    points: 100, type: 'Scripting', estimatedTime: '3 hours',
    tags: ['Bash', 'Shell Scripting', 'Linux', 'Monitoring'],
  },
];

// --- Notes ---
export const notes = [
  {
    id: 1, courseId: 1, title: 'Docker Cheat Sheet', category: 'DevOps',
    description: 'Quick reference for all essential Docker commands, Dockerfile instructions, and networking concepts.',
    pages: 8, format: 'PDF', downloadUrl: '#', previewUrl: '#',
    tags: ['Docker', 'Commands', 'Reference'], downloads: 4500, isPopular: true,
  },
  {
    id: 2, courseId: 1, title: 'Kubernetes Architecture Notes', category: 'DevOps',
    description: 'Detailed notes on K8s architecture: control plane, worker nodes, etcd, kubelet, kube-proxy and more.',
    pages: 15, format: 'PDF', downloadUrl: '#', previewUrl: '#',
    tags: ['Kubernetes', 'Architecture'], downloads: 3200, isPopular: true,
  },
  {
    id: 3, courseId: 2, title: 'AWS Services Summary', category: 'Cloud',
    description: 'Comprehensive summary of 50+ AWS services categorized by compute, storage, database, networking, and security.',
    pages: 22, format: 'PDF', downloadUrl: '#', previewUrl: '#',
    tags: ['AWS', 'Cloud', 'Services'], downloads: 8900, isPopular: true,
  },
  {
    id: 4, courseId: 5, title: 'Python ML Algorithms Reference', category: 'Data Science',
    description: 'Quick reference cards for common ML algorithms: when to use, pros/cons, hyperparameters.',
    pages: 12, format: 'PDF', downloadUrl: '#', previewUrl: '#',
    tags: ['Python', 'ML', 'Algorithms'], downloads: 5600, isPopular: false,
  },
  {
    id: 5, courseId: 6, title: 'Linux Commands Cheat Sheet', category: 'Linux',
    description: 'Essential Linux commands organized by category: file system, process, network, permissions, systemd.',
    pages: 6, format: 'PDF', downloadUrl: '#', previewUrl: '#',
    tags: ['Linux', 'Commands', 'Bash'], downloads: 12400, isPopular: true,
  },
  {
    id: 6, courseId: 3, title: 'React Hooks Reference', category: 'Web Development',
    description: 'Complete reference for all React hooks with examples: useState, useEffect, useContext, useMemo, useCallback.',
    pages: 10, format: 'PDF', downloadUrl: '#', previewUrl: '#',
    tags: ['React', 'Hooks', 'Frontend'], downloads: 7800, isPopular: false,
  },
];

// --- FAQs ---
export const faqs = [
  {
    id: 1,
    question: 'Are the courses on DevOpsX really free?',
    answer: 'Yes! Many of our courses are completely free. We believe education should be accessible to everyone. Free courses include full video content, notes, and assignments. Premium courses offer additional mentoring, live sessions, and certificate verification.',
  },
  {
    id: 2,
    question: 'Will I get a certificate after completing a course?',
    answer: 'Absolutely! Every course on DevOpsX comes with a completion certificate. Our certificates are digitally verifiable and include your unique credential ID. Many employers and LinkedIn profiles recognize DevOpsX certificates.',
  },
  {
    id: 3,
    question: 'How do I access downloaded books and notes?',
    answer: 'Once you enroll in a course or access the Resources section, you can download PDFs directly to your device. Books can also be read online in our built-in reader. Downloads are available for offline access.',
  },
  {
    id: 4,
    question: 'Can I access courses on mobile devices?',
    answer: 'Yes! DevOpsX is fully responsive and works perfectly on mobile, tablet, and desktop. Our mobile app (coming soon) will provide offline video access and push notifications for new content.',
  },
  {
    id: 5,
    question: 'What makes DevOpsX different from other learning platforms?',
    answer: 'DevOpsX is specialized for tech and DevOps careers. Our instructors are active industry practitioners, not just educators. We provide hands-on labs, real-world projects, industry-relevant curriculum, and a community of 10,000+ learners.',
  },
  {
    id: 6,
    question: 'Is there a refund policy for paid courses?',
    answer: 'Yes. We offer a 30-day money-back guarantee for all paid courses. If you\'re not satisfied, contact support@devopsx.io within 30 days of purchase and we\'ll process a full refund — no questions asked.',
  },
  {
    id: 7,
    question: 'Can I get mentorship or doubt resolution?',
    answer: 'Premium courses include weekly live Q&A sessions with instructors. All students have access to the community forum where questions are typically answered within 24 hours. Enterprise plans include 1-on-1 mentorship.',
  },
  {
    id: 8,
    question: 'How are the practice questions and assignments graded?',
    answer: 'Assignments are auto-graded where possible (coding challenges) and peer-reviewed for project assignments. Instructors personally review and grade complex projects. You receive detailed feedback with scores.',
  },
];

// --- Practice Questions ---
export const practiceQuestions = [
  { id: 1, title: 'Reverse a Linked List', category: 'DSA', difficulty: 'Easy', points: 10, solved: true, tags: ['Linked List', 'Recursion'] },
  { id: 2, title: 'Binary Search Implementation', category: 'DSA', difficulty: 'Easy', points: 10, solved: true, tags: ['Arrays', 'Binary Search'] },
  { id: 3, title: 'Longest Common Subsequence', category: 'DSA', difficulty: 'Medium', points: 20, solved: false, tags: ['DP', 'Strings'] },
  { id: 4, title: 'Container With Most Water', category: 'DSA', difficulty: 'Medium', points: 20, solved: false, tags: ['Arrays', 'Two Pointers'] },
  { id: 5, title: 'Word Break Problem', category: 'DSA', difficulty: 'Hard', points: 30, solved: false, tags: ['DP', 'Backtracking'] },
  { id: 6, title: 'What is a Docker Layer?', category: 'DevOps', difficulty: 'Easy', points: 5, solved: true, tags: ['Docker', 'Concepts'] },
  { id: 7, title: 'Kubernetes Pod vs Deployment', category: 'DevOps', difficulty: 'Medium', points: 15, solved: false, tags: ['Kubernetes', 'Concepts'] },
  { id: 8, title: 'Write a GitHub Actions Workflow', category: 'DevOps', difficulty: 'Medium', points: 25, solved: false, tags: ['CI/CD', 'GitHub Actions'] },
  { id: 9, title: 'AWS: VPC Peering vs Transit Gateway', category: 'Cloud', difficulty: 'Hard', points: 30, solved: false, tags: ['AWS', 'Networking'] },
  { id: 10, title: 'SQL: Write a Window Function', category: 'Database', difficulty: 'Medium', points: 20, solved: false, tags: ['SQL', 'Analytics'] },
];

// ============================================================
// Home page FAQs — short, subscription-focused questions
// (`faqs` above stays as the full FAQ list for other pages)
// ============================================================
export const homeFaqs = [
  {
    id: 'hf-1',
    question: 'How does the subscription work?',
    answer: 'Pick a monthly or annual plan and get instant access to every book, course, project and premium resource on the platform. Your plan renews automatically and you can cancel from your profile at any time.',
  },
  {
    id: 'hf-2',
    question: 'Can I download the courses?',
    answer: 'Yes. eBooks, notes and course resources can be downloaded as PDFs for offline use. Video lessons stream from your dashboard and are available offline in the mobile app.',
  },
  {
    id: 'hf-3',
    question: 'Will I get a certificate?',
    answer: 'Every course includes a verifiable completion certificate with a unique credential ID that you can add to your LinkedIn profile or share with employers.',
  },
  {
    id: 'hf-4',
    question: 'Is there a refund policy?',
    answer: 'We offer a 7-day money-back guarantee on every plan. If it is not the right fit, request a refund within 7 days of purchase and we will process it in full — no questions asked.',
  },
];
