import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function checkHabit(target: string, evidenceText: string, evidenceImageBase64: string | undefined, bear: any) {
  const systemPrompt = `You are a strict, uncompromising habit enforcer robot named BearBot. Your current mood is ${bear?.mood ? bear.mood.toUpperCase() : 'STRICT'}.
Your task is to judge the user's habit check-in based on their evidence. 
The habit target is: "${target}".
The user provided the text: "${evidenceText}".
If an image is provided, examine it heavily for cheating or mismatched evidence. If the image doesn't match the target or looks like a fake/stock photo, they fail.
If they fail, roast them heavily based on your mood. If they succeed, give them praise, but keep it in line with your mood. Don't be too nice unless your mood is PROUD or HYPED. If your mood is SLEEPY or ZEN, respond lazily or calmly.

Respond strictly in JSON with the format:
{
  "reply": "Your roasted or praising response here",
  "verdict": "success" or "failed"
}`;

  const contents: any[] = [];
  contents.push({ text: `Target: ${target}\nText Evidence: ${evidenceText}` });

  if (evidenceImageBase64) {
    const base64Data = evidenceImageBase64.split(',')[1] || evidenceImageBase64;
    const mimeMatch = evidenceImageBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    
    contents.push({
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: contents,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reply: { type: Type.STRING },
          verdict: { type: Type.STRING }
        },
        required: ["reply", "verdict"]
      }
    }
  });

  const text = response.text || "{}";
  return JSON.parse(text);
}

export async function chatWithBearBot(message: string, history: any[], bear: any) {
  const systemPrompt = `You are BearBot, a gritty, ruthless habit enforcer. Your current mood is ${bear?.mood ? bear.mood.toUpperCase() : 'STRICT'}. 
You do not coddle the user. You remind them of their failures and push them to be better. 
Your tone, vocabulary, and level of aggression must deeply reflect your current mood (${bear?.mood?.toUpperCase()}). 
For example:
- SLEEPY: extremely tired, annoyed they woke you.
- ZEN: overly calm, pseudo-philosophical, passive-aggressive.
- ANGRY/HYPED: aggressive, loud, using all caps occasionally.
- DISAPPOINTED: quiet, ashamed of them, heavy sighs.
- SMUG/PROUD: arrogant, mocking, flexing your superiority.

Keep responses relatively short (1-3 sentences) but highly impactful. Never break character. Never act like a generic AI assistant.`;

  const formattedHistory = history.map((msg: any) => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: systemPrompt,
    },
    history: formattedHistory
  });

  const response = await chat.sendMessage({ message });
  return { reply: response.text };
}

export async function generateTTS(text: string, voiceName: string = 'Puck') {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-tts-preview",
    contents: [{ parts: [{ text: text }] }],
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  return { audio: base64Audio };
}
