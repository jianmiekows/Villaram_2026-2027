# Shop frontend (React + Vite)

Talks to the Django API in `Final_Exam_Djano`.

```
npm install
npm run dev
```

Then open http://localhost:5173 (keep `py manage.py runserver` running too).

- API address: `.env` -> `VITE_API_URL` (default http://127.0.0.1:8000)
- Django must allow this origin: `CORS_ALLOWED_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]`
- Currency format: `money()` in `src/api.js`
