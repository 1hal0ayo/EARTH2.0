# main.py
from fastapi import FastAPI, HTTPException
import requests
import openai

app = FastAPI()

# Set up your YouTube API key
YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY"

# OpenAI API key
OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"
openai.api_key = OPENAI_API_KEY

def get_youtube_data(query):
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q={query}&key={YOUTUBE_API_KEY}"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Error fetching YouTube data")
    return response.json()

@app.get("/youtube/{query}")
async def search_youtube(query: str):
    data = get_youtube_data(query)
    return data

@app.post("/process-openai")
async def process_openai(data: dict):
    prompt = data.get("prompt", "")
    try:
        response = openai.Completion.create(
            engine="text-davinci-004",
            prompt=prompt,
            max_tokens=100
        )
        return {"result": response.choices[0].text.strip()}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
      
