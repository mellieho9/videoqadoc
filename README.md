# VideoQADoc

An annotation platform that tracks users' thought processes when answering video Q&A questions.

## Tech Stack

- Backend: Python (FastAPI)
- Frontend: Next.js, NextUI, React Query

## File Structure

```
- backend -> holding backend code
- frontend -> holding frontend code
  - app -> pages of the website
  - components 
    - controller -> custom components taking users between different pages
    - data -> custom components showing data to users
    - input -> custom components allowing users input values
  - config 
    - contexts -> setup for global state management
    - providers -> react providers 
    - site -> site-wide configuration 
  - interfaces -> holding all component props
  - utils -> holding frequently used functions
```

## Getting Started

### Backend Setup

Open a terminal and run:

```bash
cd backend

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
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser to access the application.

## To-Do List

### Features & Fixes
- [x] Implement submit answer logic to record user responses
- [ ] Add validation for time input to prevent exceeding video duration
- [ ] Fix video player stopping when user interacts with:
  - Multiple-choice questions
  - Time input fields
- [ ] Implement tracking of watched video segments
- [x] Add backend timer for task duration tracking

### Infrastructure
- [x] Set up database
- [ ] Create data export functionality for analysis
- [ ] Code cleanup and optimization

### Discussion Points
- How to structure data export for analysis purposes?
- Best approach for tracking user interaction metrics?
