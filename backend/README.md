# News Service with LLM

This project is a Flask-based news service that leverages a large language model (LLM) for tasks like summarization, categorization, and sentiment analysis.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   ├── utils.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── news.py
│   │   ├── user.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── llm_service.py
│   │   ├── news_scraper.py
│   ├── templates/
│   ├── static/
│   ├── config.py
│   ├── extensions.py
├── migrations/
├── tests/
│   ├── __init__.py
│   ├── test_routes.py
│   ├── test_llm_service.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── README.md
├── .env
├── .gitignore
```

## Setup Instructions

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the app:
   ```bash
   flask run
   ```
