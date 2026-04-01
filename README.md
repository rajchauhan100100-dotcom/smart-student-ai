# QuickTextTool AI

All-in-One AI Toolkit for Students & Professionals

## Features

### AI-Powered Tools (Requires Gemini API Key)
- **Text Summarizer** - Summarize long texts with AI (5000 char limit)
- **Paraphrasing Tool** - Rewrite text while maintaining meaning (5000 char limit)
- **Grammar Corrector** - Fix grammar and spelling errors (5000 char limit)
- **Bio Generator** - Create professional bios

### Productivity Tools (No API Key Required)
- **Word Counter** - Count words, characters, sentences
- **Percentage Calculator** - Calculate percentages easily
- **Study Planner** - Generate study schedules
- **Resume Generator** - Create professional resumes (downloadable HTML)
- **To-Do List** - Manage tasks (localStorage)
- **Pomodoro Timer** - Focused work sessions

## Setup

### For AI Tools to Work:

1. Get a free Google Gemini API key from: https://aistudio.google.com/app/apikey

2. Add to `.env` file:
```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
```

3. Restart the server:
```bash
sudo supervisorctl restart nextjs
```

**Important:** 
- Variable must be `NEXT_PUBLIC_GEMINI_API_KEY` (not just `GEMINI_API_KEY`)
- This allows frontend to access the key directly
- All AI processing happens client-side (lightweight & cost-efficient)

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, shadcn/ui
- **AI:** Google Gemini API (gemini-2.5-flash) - Direct frontend calls
- **Storage:** localStorage (for To-Do List)
- **Deployment:** No backend server needed for AI tools

## Architecture

- **Non-AI tools:** Pure client-side JavaScript
- **AI tools:** Direct fetch calls to Google Gemini API from browser
- **No Python backend required**
- **Fast, lightweight, cost-efficient**

## Live URL

https://smart-student-ai-5.preview.emergentagent.com

## Character Limits

- Text Summarizer: 5000 characters
- Paraphrasing Tool: 5000 characters
- Grammar Corrector: 5000 characters
- Bio Generator: 500 characters for achievements field
