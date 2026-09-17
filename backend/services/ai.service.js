const { query } = require("../config/db.postgres");

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY ||
  process.env.AI_SERVICE_API_KEY ||
  "";

// Local fallback knowledge for Nashik places when DB is not populated
const LOCAL_KNOWLEDGE = `
Discover Nashik & Kumbh Mela 2027 Knowledge:
1. Trimbakeshwar Shiva Temple: One of the 12 sacred Jyotirlingas, source of river Godavari, located 28 km from Nashik city at the foot of Brahmagiri hill.
2. Ramkund Ghat: Sacred bathing ghat in Panchavati on River Godavari. Main venue for Kumbh Mela Shahi Snan (Holy Dips).
3. Kalaram Temple: Historic 1782 black stone temple dedicated to Lord Rama in Panchavati.
4. Sita Gufa & Panchavati: 5 ancient banyan trees and cave where Sita sheltered during exile.
5. Sula Vineyards: Pioneer winery, tours, tastings, 12 km from city off Gangapur road.
6. Pandavleni Caves: 24 rock-cut Buddhist caves (1st century BCE) on Trirashmi hill.
7. Brahmagiri & Anjaneri Hills: Popular treks; Anjaneri is the birthplace of Lord Hanuman.
8. Local Cuisine: Famous for authentic Chulivarchi Misal Pav (Sadhana Misal), Jalebi, and Maharashtrian thali.
9. Emergency Contacts: Police: 112 / 100, Ambulance: 108, Kumbh Helpline: 1912.
`;

async function getRelevantContext(userMessage) {
  try {
    const word = userMessage.trim().split(/\s+/)[0];
    const { rows } = await query(
      "select name, description from places where name ilike $1 or description ilike $1 limit 5",
      [`%${word}%`]
    );
    if (rows && rows.length > 0) {
      return rows.map((r) => `${r.name}: ${r.description}`).join("\n");
    }
  } catch {
    // Return empty if DB is unavailable
  }
  return "";
}

async function generateReply(message, locale = "en") {
  const dbContext = await getRelevantContext(message);

  const langInstruction =
    locale === "hi"
      ? "Please respond in Hindi (हिंदी)."
      : locale === "mr"
      ? "Please respond in Marathi (मराठी)."
      : "Please respond in English.";

  const systemPrompt = `You are the official AI Helpbot for Discover Nashik — Digital Companion for Pilgrims & Tourists visiting Nashik & Kumbh Mela 2027.
You provide helpful, polite, and accurate guidance on temples, ghats, bathing dates, travel, food, safety, and Kumbh Mela planning.

${langInstruction}

Verified Nashik Knowledge:
${LOCAL_KNOWLEDGE}
${dbContext ? `Additional Database Context:\n${dbContext}` : ""}

User Question: ${message}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return `I'm having trouble connecting to AI services right now (HTTP ${response.status}). Please ask about places, ghats, or Kumbh Mela details!`;
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (replyText) {
      return replyText.trim();
    }
  } catch (err) {
    console.error("Error generating AI reply:", err);
  }

  return "Welcome to Discover Nashik! You can explore Trimbakeshwar, Ramkund, Kalaram Temple, and Kumbh Mela guidance. How can I help you today?";
}

module.exports = { generateReply };
