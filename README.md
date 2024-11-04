# videoqadoc
An annotation platform that tracks users' thought process when answering video Q&amp;A

# stack
python, fastapi, nextjs, nextui, react-query

# getting started
open 2 terminals
## run the backend
'''
cd api
python3 -m venv venv // if you haven't alr
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app -reload --port 8000
'''
## run the client
'''
cd videoqadoc
npm install
npm run dev
'''
go to your localhost

# to-dos
- fix the submit answer logic to record the user's answers
- add a condition in the time input to ensure the ending timestamp do not exceed the duration of the video
- fix bug: videoplayer stops when user interace with multiple-choice question and time-input
- get timestamps of the video segments the user's watch from the video-player
- add a timer in the backend to track user's time per task
- set up database
- discuss: how do we produce a sheet for gedas's analysis?
- clean up code
