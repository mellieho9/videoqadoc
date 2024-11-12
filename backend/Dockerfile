# syntax=docker/dockerfile:1

# FROM --platform=linux/amd64 python:3.10.6-slim-buster 

FROM python:3.10.6-slim-buster 

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt


COPY . .

ENTRYPOINT ["uvicorn", "main:app", "--reload", "--port", "8000", "--host", "0.0.0.0"]