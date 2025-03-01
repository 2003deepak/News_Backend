const axios = require('axios');
const qs = require('querystring');

const translation = async (req, res) => {
    const { source_language, target_language, text } = req.body; // User sends these in request body

    if (!source_language || !target_language || !text) {
        return res.status(400).json({ status: "fail", message: "Missing required fields: source_language, target_language, text" });
    }

    try {
        const formData = qs.stringify({
            source_language ,
            target_language,
            text
        });

        const response = await axios.post(
            'https://text-translator2.p.rapidapi.com/translate',
            formData,  
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-rapidapi-host': 'text-translator2.p.rapidapi.com',
                    'x-rapidapi-key': process.env.RAPID_API_KEY,
                }
            }
        );

        const translatedText = response.data.data.translatedText;

        return res.status(200).json({
            status: "success",
            message : translatedText
        });

    } catch (error) {
        console.error("Translation Error:", error.response?.data || error.message);
        return res.status(500).json({ status: "error", message: "Translation failed", error: error.message });
    }
};

module.exports = translation;
