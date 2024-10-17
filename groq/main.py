# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "groq",
# ]
# ///
from groq import Groq

IMAGE_DATA_URL = "..."

client = Groq()
completion = client.chat.completions.create(
    model="llama-3.2-90b-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "これは何？"},
                {"type": "image_url", "image_url": {"url": IMAGE_DATA_URL}},
            ],
        }
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=False,
    stop=None,
)

print(completion.choices[0].message)
