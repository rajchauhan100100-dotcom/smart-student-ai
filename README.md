# Smart Student AI Toolkit

All-in-One AI Toolkit for Students & Job Seekers

## Features

### AI-Powered Tools (Requires Gemini API Key)
- **Text Summarizer** - Summarize long texts with AI
- **Paraphrasing Tool** - Rewrite text while maintaining meaning
- **Grammar Corrector** - Fix grammar and spelling errors
- **Bio Generator** - Create professional bios

### Productivity Tools
- **Word Counter** - Count words, characters, sentences
- **Percentage Calculator** - Calculate percentages easily
- **Study Planner** - Generate study schedules
- **Resume Generator** - Create professional resumes
- **To-Do List** - Manage tasks (localStorage)
- **Pomodoro Timer** - Focused work sessions

## Setup

1. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

2. Restart the server:
```bash
sudo supervisorctl restart nextjs
```

## Tech Stack

- Next.js 14
- Tailwind CSS + shadcn/ui
- Google Gemini AI (gemini-2.5-flash)
- MongoDB (optional)
- emergentintegrations library

## AI Integration

The AI service is modular - easily switch providers by modifying `/lib/aiService.js`.

Current provider: Google Gemini (gemini-2.5-flash)

## URLs

- Homepage: https://smart-student-ai-5.preview.emergentagent.com
- All tools accessible via navigation
