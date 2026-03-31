import { Calculator, FileText, MessageSquare, FileCheck, Percent, Calendar, User, CheckCircle, ListTodo, Timer } from 'lucide-react';

export const categories = [
  { id: 'ai-writing', name: 'AI Writing Tools' },
  { id: 'resume-job', name: 'Resume & Job Tools' },
  { id: 'student', name: 'Student Tools' },
  { id: 'productivity', name: 'Productivity Tools' }
];

export const tools = [
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs instantly',
    icon: FileText,
    category: 'productivity',
    path: '/tools/word-counter'
  },
  {
    id: 'text-summarizer',
    title: 'Text Summarizer',
    description: 'AI-powered tool to summarize long texts quickly',
    icon: FileCheck,
    category: 'ai-writing',
    path: '/tools/text-summarizer',
    aiPowered: true
  },
  {
    id: 'paraphrasing',
    title: 'Paraphrasing Tool',
    description: 'Rewrite text while maintaining original meaning',
    icon: MessageSquare,
    category: 'ai-writing',
    path: '/tools/paraphrasing',
    aiPowered: true
  },
  {
    id: 'resume-generator',
    title: 'Resume Generator',
    description: 'Create professional resumes with clean formatting',
    icon: FileText,
    category: 'resume-job',
    path: '/tools/resume-generator'
  },
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, increase, and decrease easily',
    icon: Percent,
    category: 'student',
    path: '/tools/percentage-calculator'
  },
  {
    id: 'study-planner',
    title: 'Study Planner Generator',
    description: 'Generate personalized study schedules',
    icon: Calendar,
    category: 'student',
    path: '/tools/study-planner'
  },
  {
    id: 'bio-generator',
    title: 'Bio Generator',
    description: 'Create professional bios for social media and resumes',
    icon: User,
    category: 'ai-writing',
    path: '/tools/bio-generator',
    aiPowered: true
  },
  {
    id: 'grammar-corrector',
    title: 'Grammar Corrector',
    description: 'Fix grammar and spelling errors instantly',
    icon: CheckCircle,
    category: 'ai-writing',
    path: '/tools/grammar-corrector',
    aiPowered: true
  },
  {
    id: 'todo-list',
    title: 'To-Do List',
    description: 'Manage your tasks with a simple to-do list',
    icon: ListTodo,
    category: 'productivity',
    path: '/tools/todo-list'
  },
  {
    id: 'pomodoro-timer',
    title: 'Pomodoro Timer',
    description: 'Boost productivity with focused work sessions',
    icon: Timer,
    category: 'productivity',
    path: '/tools/pomodoro-timer'
  }
];