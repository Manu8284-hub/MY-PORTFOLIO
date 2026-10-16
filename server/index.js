import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Caching for /api/now (15 minutes)
let nowCache = {
  data: null,
  lastFetched: 0,
};
const CACHE_DURATION_MS = 15 * 60 * 1000;

// Rate limiting in-memory storage (IP based)
const chatRateLimits = new Map();
const guestbookRateLimits = new Map();

const checkRateLimit = (map, ip, maxLimit, windowMs) => {
  const now = Date.now();
  const userRecord = map.get(ip);

  if (!userRecord || now > userRecord.resetTime) {
    map.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxLimit - 1 };
  }

  if (userRecord.count >= maxLimit) {
    return { 
      allowed: false, 
      remaining: 0, 
      resetInMinutes: Math.ceil((userRecord.resetTime - now) / 60000) 
    };
  }

  userRecord.count += 1;
  return { allowed: true, remaining: maxLimit - userRecord.count };
};

// Fallback in-memory Guestbook messages if MongoDB is not connected
let fallbackGuestbookMessages = [
  {
    id: "1",
    name: "Alex Rivera",
    username: "alex-tech",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    message: "Impressive portfolio Manu! The MERN architecture in Campus Connect Hub looks very solid.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isModerated: true,
  },
  {
    id: "2",
    name: "Priya Patel",
    username: "priyacodes",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    message: "Love the terminal mode and clean design. Keep up the great work at Chitkara!",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    isModerated: true,
  }
];

// MongoDB Client Initialization (Optional / Resilient)
let db = null;
if (process.env.MONGODB_URI) {
  const client = new MongoClient(process.env.MONGODB_URI);
  client.connect()
    .then((connectedClient) => {
      db = connectedClient.db(process.env.MONGODB_DB_NAME || 'portfolio');
      console.log('Connected to MongoDB database');
    })
    .catch((err) => {
      console.warn('MongoDB connection failed, using in-memory guestbook fallback:', err.message);
    });
}

// System Prompt for Claude AI Recruiter Chat
const MANU_SYSTEM_PROMPT = `You are "Manu's AI Assistant", a professional and enthusiastic AI representative for Manu Sharma, a MERN Stack Developer and B.E. Computer Science Engineering student at Chitkara University (expected graduation 2028).

Manu's Core Profile:
- Skills: React.js 19, Node.js, Express.js, MongoDB, PostgreSQL, JavaScript (ES6+), Java, Data Structures & Algorithms (300+ LeetCode problems solved, top 12% contest rating), Git, RESTful APIs, Tailwind CSS.
- Key Projects:
  1. Campus Connect Hub: Student networking & resource sharing platform with JWT auth, dual DB (PostgreSQL + MongoDB), reduced resource latency by 40%, 500+ student connections.
  2. FitBot AI (Home Gym Bot): Full-stack AI fitness coaching platform integrating Google Gemini REST API, Python 3 exercise retrieval engine, MongoDB, and profile-aware recovery planner. (https://github.com/Manu8284-hub/HOME-GYM-BOT)
  3. Secure Authentication & Authorization System: Production-grade auth system featuring salted bcrypt password hashing, HttpOnly SameSite JWT cookie rotation, XSS/CSRF defense, and rate-limited endpoints. (https://github.com/Manu8284-hub/secure-auth-system)
  4. Autonomous Smart Following Suitcase: IoT luggage with ESP32, ultrasonic sensor arrays, embedded C++, sub-50ms distance tracking.
  5. Modern E-Commerce Storefront: Responsive shopping cart, sub-second loads, 0.00 CLS.
  6. Interactive Portfolio OS: CLI Terminal, AI assistant, live GitHub/LeetCode sync.
- Contact: Email manusharma15march2006@gmail.com, GitHub https://github.com/Manu8284-hub, LinkedIn https://www.linkedin.com/in/manu-sharma-866372318/.
- Availability: Open for software engineering internships, frontend/backend roles, and freelance opportunities.

Instructions:
- Keep responses concise, engaging, professional, and truthful.
- Highlight Manu's practical problem-solving skills and technical depth.
- Never invent metrics; stick strictly to the facts above.
- Offer to connect the recruiter with Manu's email if they want to schedule an interview.`;

// ----------------------------------------------------
// 1. GET /api/now (GitHub & LeetCode Live Sync + Fallback)
// ----------------------------------------------------
app.get('/api/now', async (req, res) => {
  const now = Date.now();
  if (nowCache.data && (now - nowCache.lastFetched < CACHE_DURATION_MS)) {
    return res.json({ ...nowCache.data, cached: true });
  }

  let githubData = {
    latestRepo: "Manu8284-hub/MY-PORTFOLIO",
    commitMessage: "feat: terminal CLI mode, recruiter AI chat & live metrics",
    commitDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: "Active coding"
  };

  let leetcodeData = {
    totalSolved: 305,
    ranking: "Top 12%",
    easy: 140,
    medium: 145,
    hard: 20
  };

  try {
    const ghRes = await fetch('https://api.github.com/users/Manu8284-hub/events/public', {
      headers: { 'User-Agent': 'ManuSharma-Portfolio-Sync' }
    });
    if (ghRes.ok) {
      const events = await ghRes.json();
      const pushEvent = events.find((e) => e.type === 'PushEvent');
      if (pushEvent && pushEvent.payload?.commits?.length > 0) {
        githubData = {
          latestRepo: pushEvent.repo?.name || "Manu8284-hub/MY-PORTFOLIO",
          commitMessage: pushEvent.payload.commits[0].message || "Recent commit",
          commitDate: new Date(pushEvent.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          status: "Live synced"
        };
      }
    }
  } catch (err) {
    console.warn('GitHub sync error, using fallback:', err.message);
  }

  try {
    const lcRes = await fetch('https://leetcode-stats-api.herokuapp.com/manu-1234');
    if (lcRes.ok) {
      const lc = await lcRes.json();
      if (lc.status === 'success' && lc.totalSolved) {
        leetcodeData = {
          totalSolved: lc.totalSolved,
          ranking: lc.ranking ? `Rank #${lc.ranking.toLocaleString()}` : "Top 12%",
          easy: lc.easySolved || 140,
          medium: lc.mediumSolved || 145,
          hard: lc.hardSolved || 20
        };
      }
    }
  } catch (err) {
    console.warn('LeetCode sync error, using fallback:', err.message);
  }

  const responsePayload = {
    github: githubData,
    leetcode: leetcodeData,
    lastUpdated: new Date().toISOString(),
    cached: false
  };

  nowCache = {
    data: responsePayload,
    lastFetched: now
  };

  return res.json(responsePayload);
});

// ----------------------------------------------------
// 2. POST /api/chat ("Ask Manu's AI" with Claude API)
// ----------------------------------------------------
app.post('/api/chat', async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  
  const rateCheck = checkRateLimit(chatRateLimits, clientIp, 10, 60 * 60 * 1000);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      error: `Rate limit exceeded. Please wait ${rateCheck.resetInMinutes} minutes before asking more questions.`
    });
  }

  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  if (message.length > 400) {
    return res.status(400).json({ error: 'Message is too long. Please keep questions under 400 characters.' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    const defaultReplies = [
      `Hello! I'm Manu's AI Assistant. Manu Sharma is a B.E. Computer Science Engineering student at Chitkara University (2024-2028) and a MERN Stack Developer.\n\nHe specializes in React.js, Node.js, Express, MongoDB, and PostgreSQL, and has solved over 300 problems on LeetCode.\n\n💡 *Note for Recruiter/Admin: To enable live Claude 3.5 Sonnet responses, provide your ANTHROPIC_API_KEY in .env.*`,
      `Manu is actively open for software engineering internships and full-stack positions! You can check his featured project 'Campus Connect Hub' or email him directly at manusharma15march2006@gmail.com.`
    ];

    const reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
    const words = reply.split(' ');
    for (const word of words) {
      res.write(`data: ${JSON.stringify({ text: word + ' ' })}\n\n`);
      await new Promise((r) => setTimeout(r, 40));
    }
    res.write('data: [DONE]\n\n');
    return res.end();
  }

  try {
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 600,
        system: MANU_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: message }],
        stream: true
      })
    });

    if (!claudeRes.ok) {
      const errJson = await claudeRes.json().catch(() => ({}));
      res.write(`data: ${JSON.stringify({ error: errJson.error?.message || 'Claude API encountered an error.' })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    const reader = claudeRes.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            res.write('data: [DONE]\n\n');
            continue;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              res.write(`data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`);
            }
          } catch {
            // ignore
          }
        }
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.write(`data: ${JSON.stringify({ error: 'Sorry, I encountered a temporary connection issue. Please try again in a few moments.' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// ----------------------------------------------------
// 3. Guestbook Routes (/api/guestbook)
// ----------------------------------------------------
const PROFANITY_LIST = ['spam', 'buy bitcoin', 'viagra'];

app.get('/api/guestbook', async (req, res) => {
  try {
    if (db) {
      const messages = await db.collection('guestbook')
        .find({ isModerated: true })
        .sort({ createdAt: -1 })
        .limit(30)
        .toArray();
      return res.json(messages);
    }
  } catch (err) {
    console.warn('MongoDB guestbook fetch error:', err.message);
  }

  return res.json(fallbackGuestbookMessages);
});

app.post('/api/guestbook', async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  
  const rateCheck = checkRateLimit(guestbookRateLimits, clientIp, 5, 60 * 60 * 1000);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      error: `Rate limit reached. Please wait ${rateCheck.resetInMinutes} minutes before posting another message.`
    });
  }

  const { name, username, message, avatar } = req.body;
  if (!name || !message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  if (message.length > 280) {
    return res.status(400).json({ error: 'Message must be under 280 characters.' });
  }

  const lowerMsg = message.toLowerCase();
  const containsSpam = PROFANITY_LIST.some((word) => lowerMsg.includes(word));
  
  const newEntry = {
    id: Date.now().toString(),
    name: name.slice(0, 50),
    username: (username || name.toLowerCase().replace(/\s+/g, '')).slice(0, 30),
    avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
    message: message.trim(),
    createdAt: new Date().toISOString(),
    isModerated: !containsSpam
  };

  try {
    if (db) {
      await db.collection('guestbook').insertOne(newEntry);
    } else {
      fallbackGuestbookMessages.unshift(newEntry);
    }
  } catch (err) {
    console.warn('Error saving to DB, added to memory:', err.message);
    fallbackGuestbookMessages.unshift(newEntry);
  }

  if (containsSpam) {
    return res.status(201).json({
      success: true,
      pendingModeration: true,
      message: 'Your message has been submitted and is pending review by Manu.'
    });
  }

  return res.status(201).json({
    success: true,
    data: newEntry
  });
});

// Start Express Server only when run directly (e.g., node server/index.js)
const isMainModule = process.argv[1] && process.argv[1].endsWith('server/index.js');
if (isMainModule) {
  app.listen(PORT, () => {
    console.log(`Portfolio Express API running on http://localhost:${PORT}`);
  });
}

export default app;
