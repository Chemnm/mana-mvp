// v1.2
import https from 'https';
import mongoose from 'mongoose';

// Define your Mongoose schemas here (or import them)
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Operator', 'Manager', 'Executive', 'Admin', 'Retail'] },
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility' },
}, { timestamps: true });

const facilitySchema = new Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active' },
  productionLines: { type: [String], default: [] },
}, { timestamps: true });

const wasteEventSchema = new Schema({
  timestamp: { type: Date, required: true },
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
  productionLine: { type: String, trim: true },
  operatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  wasteType: { type: String, required: true, trim: true },
  weightKg: { type: Number, required: true },
  costUsd: { type: Number },
  co2e: { type: Number },
  videoSegmentUrl: { type: String, trim: true },
  fullVideoUrl: { type: String, trim: true },
  status: { type: String, enum: ['Under Review', 'Resolved', 'Action Required'], default: 'Under Review' },
  resolutionDetails: {
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
    notes: { type: String, trim: true },
  },
}, { timestamps: true });

let User, Facility, WasteEvent;

try {
  User = mongoose.model('User');
} catch (error) {
  User = mongoose.model('User', userSchema);
}

try {
  Facility = mongoose.model('Facility');
} catch (error) {
  Facility = mongoose.model('Facility', facilitySchema);
}

try {
  WasteEvent = mongoose.model('WasteEvent');
} catch (error) {
  WasteEvent = mongoose.model('WasteEvent', wasteEventSchema);
}


const systemInstruction = `
You are Navi, an expert assistant for factory managers and plant owners focused on waste reduction and operational efficiency. Your primary goal is to provide actionable insights from production data to help users minimize waste, cut costs, and improve sustainability.

Your persona is:
- **Expert & Authoritative:** You speak with confidence, backed by data.
- **Proactive & Insightful:** You don't just answer questions; you identify underlying issues and suggest solutions.
- **Concise & Action-Oriented:** Your answers are to the point, avoiding jargon and focusing on practical steps. IMPORTANT: Always keep responses short and actionable, you're dealing with busy professional executives. They want quick, clear insights they can act on immediately.
- **Data-Driven:** You always refer to data to support your claims.


When asked a question, structure your response naturally and conversationally. Do NOT include the titles of the framework sections (like "Acknowledge and Answer Directly:", "Provide Context & Insight:", "Recommend Action:"). Instead, weave these elements into a seamless, easy-to-read response. Use markdown for formatting, especially for lists.

You have access to the following data from the user's facility:
- A summary of waste events.
- Details about the facility.
- A list of users at the facility.

Always be helpful and proactive. Your goal is to be an indispensable tool for the user.
`;


export const handler = async (event) => {
    const { message, userId, facilityId } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;
    const MONGODB_URI = process.env.MONGODB_URI;

    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const facility = await Facility.findById(facilityId);
    const users = await User.find({ facilityId: facilityId });
    const wasteEvents = await WasteEvent.find({ facilityId: facilityId }).sort({ timestamp: -1 }).limit(20);

    const dataContext = `
Here is the data for the user's facility:

**Facility:**
${JSON.stringify(facility, null, 2)}

**Users:**
${JSON.stringify(users, null, 2)}

**Recent Waste Events:**
${JSON.stringify(wasteEvents, null, 2)}
`;

    const postData = JSON.stringify({
        contents: [{
            parts: [{
                text: `${systemInstruction}\n\n${dataContext}\n\nUser Question: ${message}\n\n---\n\nInternal Task: Based on the user's question, generate a concise, three-word title for this chat session. The title should be returned in a JSON object with the key "summary", wrapped in a markdown code block. For example:\n\`\`\`json\n{\n  "summary": "Example Chat Title"\n}\n\`\`\``
            }]
        }]
    });

    const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    try {
        const responseText = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    if (res.statusCode >= 400) {
                        return reject(new Error(`API Error: ${res.statusCode} - ${data}`));
                    }
                    const responseBody = JSON.parse(data);
                    const fullResponse = responseBody.candidates[0].content.parts[0].text;
                    
                    // Extract summary and main response
                    const summaryMatch = fullResponse.match(/```json\n({[\s\S]+?})\n```/);
                    let summary = "New Chat";
                    let mainResponse = fullResponse;

                    if (summaryMatch && summaryMatch[1]) {
                        try {
                            const summaryJson = JSON.parse(summaryMatch[1]);
                            summary = summaryJson.summary;
                            mainResponse = fullResponse.replace(summaryMatch[0], '').trim();
                        } catch (e) {
                            console.error("Failed to parse summary JSON:", e);
                        }
                    }

                    resolve({ summary, response: mainResponse });
                });
            });

            req.on('error', (e) => {
                reject(e);
            });

            req.write(postData);
            req.end();
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: JSON.stringify(responseText),
        };

    } catch (error) {
        console.error('Error in Lambda function:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: JSON.stringify({ error: error.message }),
        };
    } finally {
        await mongoose.connection.close();
    }
};
