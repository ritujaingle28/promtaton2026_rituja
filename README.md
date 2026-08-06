# 🎵 MoodMuse AI – Intelligent Music Companion

## 🚀 PROMPT-A-THON 2026 Submission

An Agentic AI-powered music companion that understands a user's mood and recommends personalized playlists using a modular AI workflow.

---

# 📌 Problem Statement

People often struggle to find music that matches their current mood or activity. Traditional music applications rely heavily on manual searching or previous listening history and do not always understand the user's emotional context.

MoodMuse AI solves this problem by analyzing natural language input, identifying the user's mood, and recommending personalized playlists through an Agentic AI workflow.

---

# 💡 Solution Overview

MoodMuse AI is an intelligent music recommendation assistant that:

- Detects the user's mood from natural language.
- Understands user preferences.
- Uses specialized AI modules (agents) to process requests.
- Generates personalized playlist recommendations.
- Maintains lightweight user memory for better future recommendations.
- Provides a clean and interactive web interface.

---

# 🧠 Agentic AI Architecture

```
                User
                  │
                  ▼
          React Frontend
                  │
            POST /chat
                  │
                  ▼
            FastAPI Backend
                  │
                  ▼
           Planner Agent
                  │
      ┌───────────┼────────────┐
      ▼           ▼            ▼
 Mood Agent   Memory Module Recommendation Agent
                  │
                  ▼
           Playlist Agent
                  │
                  ▼
          JSON Response
                  │
                  ▼
          React Frontend
```

---

# 🔄 AI Workflow

```
User Message
      │
      ▼
Planner Agent
      │
      ▼
Mood Detection
      │
      ▼
Memory Retrieval
      │
      ▼
Recommendation Generation
      │
      ▼
Playlist Generation
      │
      ▼
Response to User
```

---

# 🤖 AI Models & Tools Used

- Google AI Studio (Frontend Development)
- Antigravity IDE (Backend Development)
- FastAPI
- Python
- React
- TypeScript
- Vite
- GitHub
- Prompt Engineering

---

# ✨ Agent Capabilities

### 🧠 Planner Agent
- Controls the execution workflow.
- Coordinates all specialized modules.

### 😊 Mood Agent
- Detects user mood.
- Estimates energy level.
- Calculates confidence score.

### 🎶 Recommendation Agent
- Selects suitable songs based on mood.
- Uses predefined recommendation logic.

### 🎧 Playlist Agent
- Builds the final playlist.
- Generates recommendation explanations.

### 💾 Memory Module
- Stores user preferences.
- Maintains lightweight conversational context.

---

# 📝 Prompt Engineering Strategy

The backend was developed using small, modular prompts to optimize token usage while maintaining a clean architecture.

Prompt design principles:

- One file per prompt
- Modular code generation
- Incremental development
- Structured debugging
- Agent-based architecture

This approach reduced token consumption and simplified debugging during development.

---


prompts used:
# System Prompt

You are an AI Music Companion.

Analyze the user's mood from natural language.

Recommend an appropriate playlist.

Provide a short explanation for every recommendation.

Respond in a friendly and supportive tone.

# Frontend Generation Prompt

Design a modern music recommendation web application.

Requirements:

- Responsive UI
- Clean dashboard
- Chat interface
- Playlist cards
- Mood indicators
- Modern typography
- Attractive color palette
-
- \# Prompt Strategy

The project uses modular prompts to:

- Generate UI components
- Improve frontend consistency
- Build reusable layouts
- Reduce prompt complexity
  
# 💻 Technologies Used
# Tools Used

Frontend
- Google AI Studio
- React
- TypeScript
- Vite
- Tailwind CSS

Development
- Antigravity IDE

Version Control
- Git
- GitHub

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

## Backend

- FastAPI
- Python
- Pydantic

## AI Tools

- Google AI Studio
- Antigravity IDE

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```
Promptathon2026_YourName/
│
├── frontend/
│
├── backend/
│   ├── agents/
│   ├── memory/
│   ├── models/
│   ├── routers/
│   ├── services/
│   ├── utils/
│   ├── main.py
│   └── requirements.txt
│
├── prompts/
├── workflows/
├── screenshots/
├── assets/
├── README.md
└── package.json
```

---

#workflow 
User
   │
   ▼
Frontend Interface
   │
   ▼
Mood Detection
   │
   ▼
Recommendation Logic
   │
   ▼
Playlist Display
# Project Architecture

Frontend

↓

User Input

↓

Mood Analysis

↓

Recommendation Engine

↓

Playlist Display
# Future Scope

- Spotify Integration
- Voice Commands
- Emotion Detection
- User Accounts
- AI Personalization
- # Presentation Notes

Problem

↓

Solution

↓

Architecture

↓

Workflow

↓

Demo

↓

Future Scope




---

# 📸 Screenshots

screenshots are in 
history tab.png
home page1.png
homepage 2.png
homepage 4.png
homepage3.png

playlist tab.png
progile tab.png

screenshot testacase.png
screenshot testcase.png
screenshottest care.png
Examples:

- Home Screen
- Chat Interface
- Playlist Recommendation
- Mood Detection
- Agent Workflow

---

# 🎯 Key Features

- Mood Detection
- Personalized Recommendations
- Agentic AI Workflow
- Modular Backend
- Lightweight Memory
- FastAPI REST API
- Interactive React Frontend

---

# 🌍 Real-World Impact

MoodMuse AI can help users:

- Improve emotional well-being
- Discover music based on feelings
- Reduce decision fatigue
- Enhance focus and productivity
- Support relaxation and stress relief

---

# 🔮 Future Improvements

- Spotify API Integration
- YouTube Music Integration
- Voice-based Mood Detection
- Facial Emotion Recognition
- User Authentication
- Persistent Database
- Machine Learning Recommendation Engine
- Multi-language Support

---

# 👩‍💻 Developed For

**PROMPT-A-THON 2026**

An Agentic AI Competition focused on solving real-world problems using intelligent AI systems, prompt engineering, reasoning, planning, and workflow automation.

---

# 📜 License

This project was developed for educational and competition purposes.

---

# 🙏 Acknowledgements

- Google AI Studio
- Antigravity IDE
- FastAPI
- React
- OpenAI
- PROMPT-A-THON 2026 Organizers
