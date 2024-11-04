# VideoQADoc

An annotation platform that tracks users' thought processes when answering video Q&A questions.

## Tech Stack

- Backend: Python (FastAPI)
- Frontend: Next.js, NextUI, React Query

## Getting Started

### Backend Setup

Open a terminal and run:

```bash
cd api

# Create virtual environment (if not already created)
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

### Frontend Setup

Open another terminal and run:

```bash
cd videoqadoc

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser to access the application.

## To-Do List

### Features & Fixes
- [ ] Implement submit answer logic to record user responses
- [ ] Add validation for time input to prevent exceeding video duration
- [ ] Fix video player stopping when user interacts with:
  - Multiple-choice questions
  - Time input fields
- [ ] Implement tracking of watched video segments
- [ ] Add backend timer for task duration tracking

### Infrastructure
- [ ] Set up database
- [ ] Create data export functionality for analysis
- [ ] Code cleanup and optimization

### Discussion Points
- How to structure data export for analysis purposes?
- Best approach for tracking user interaction metrics?
