from fastapi import FastAPI
from google.generativeai import GenerativeModel, configure
from dotenv import load_dotenv
import os

load_dotenv()
configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

# simple model
model = GenerativeModel("gemini-1.5-flash")


@app.get("/")
async def root():
    return {"status": "AI model started"}


@app.get("/ai")
async def ai(prompt: str):
    response = model.generate_content(prompt)
    return {"response": response.text}
