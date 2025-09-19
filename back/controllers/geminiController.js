const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateContentCalendar = async (req, res) => {
  try {
    const { profession } = req.body;

    const prompt = `
      Create a 7-day LinkedIn content calendar for a professional in "${profession}".
      Each day must include:
      - Day number (1–7)
      - Title (short post title)
      - Caption (LinkedIn caption, conversational style)

      Return ONLY valid JSON in this format:
      [
        { "day": 1, "title": "Title 1", "caption": "Caption 1" },
        { "day": 2, "title": "Title 2", "caption": "Caption 2" },
        ...
        { "day": 7, "title": "Title 7", "caption": "Caption 7" }
      ]
    `;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    // Try parsing JSON safely
    let calendar;
    try {
      calendar = JSON.parse(textResponse);
    } catch (err) {
      // Fallback if model adds extra text
      const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
      calendar = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    }

    res.json({ profession, calendar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateContentCalendar };
