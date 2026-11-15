/**
 * Runav Apps — product data (generated from project README/docs).
 * ----------------------------------------------------------------
 * To re-scan the projects under C:\Naveen and update this file, run:
 *     npm run generate   (in this folder)
 *
 * HOW TO USE:
 *   • Set "enabled": true  -> the product appears in the Products menu/grid.
 *   • Set "enabled": false -> the product is hidden everywhere on the site.
 *   • status: "live" | "beta" | "internal"
 */
// @generated-by: manual seed (edit freely — generate:scan will preserve this file)
const PRODUCTS = [
  {
    "enabled": true,
    "status": "live",
    "name": "Bharatham",
    "repoPath": "C:\\Naveen\\Bharatham",
    "tagline": "India's heritage, community-built",
    "category": "Knowledge Platform",
    "short": "A community-contributed, editorially controlled knowledge platform about India's history, civilisation, culture, knowledge and Sanatana Dharma.",
    "description": "Bharatham combines a Node/Express + Prisma + PostgreSQL API, a Next.js admin portal and an Expo mobile/web app so contributors can add entries, reviewers approve them, and readers explore India's heritage in English, Hindi and Kannada. The seed corpus ships with 219 entries, 96 references and quizzes, and deployment is a single Vercel deployment serving the API, admin and public web app.",
    "stack": [
      "Node 22",
      "Express 5",
      "Prisma 6",
      "PostgreSQL 16",
      "Redis",
      "Next.js 15",
      "React 19",
      "Expo SDK 58",
      "React Native Web",
      "TipTap",
      "Tailwind"
    ],
    "highlights": [
      "Multi-role editorial workflow: contributor → reviewer → moderator → admin",
      "Trilingual UI strings (English / Hindi / Kannada) via a shared package",
      "Interactive Swagger API docs and one-deployment hosting",
      "Quizzes and references for a credible, cited knowledge base"
    ],
    "docsUrl": ""
  },
  {
    "enabled": true,
    "status": "beta",
    "name": "BharatBolo",
    "repoPath": "C:\\Naveen\\BharathBolo",
    "tagline": "Secure messaging for Bharat",
    "category": "Communication",
    "short": "A secure messaging & community platform: chat, voice notes, media, 1:1 audio & video calls, status updates, communities and admin-controlled donations — end-to-end encrypted with the Signal protocol.",
    "description": "BharatBolo keeps private content end-to-end encrypted on users' devices: the server only routes ciphertext. The E2EE core passes a 21-test suite (tamper & replay rejection, multi-device fan-out, device revocation, safety numbers), and the API adds 50 unit tests and 15 e2e tests covering OTP, encrypted-at-rest PII, refresh-token replay and admin RBAC.",
    "stack": [
      "React Native 0.76",
      "Expo SDK 52",
      "NestJS",
      "MongoDB",
      "Socket.IO",
      "Redis",
      "Signal protocol",
      "SQLCipher",
      "Next.js 14",
      "Razorpay",
      "ZeptoMail"
    ],
    "highlights": [
      "Signal-protocol E2EE for chats and AES-256-GCM for media",
      "One-to-one audio & video calls with TURN (coturn)",
      "Admin-controlled donations with hidden donation support",
      "One-command app rename via app.identity.json"
    ],
    "docsUrl": ""
  },
  {
    "enabled": true,
    "status": "beta",
    "name": "K12 Sphere",
    "repoPath": "C:\\Naveen\\K12Sphere",
    "tagline": "Learning platform for Kindergarten to Grade 12",
    "category": "Education",
    "short": "A K-12 learning platform covering English (reading, writing, listening), Math, Science and Social Studies, with 363 ready-made tasks aligned to Common Core, NGSS and C3 standards.",
    "description": "One shared UI in packages/ui runs on iOS, Android and web. Students get grade-specific tasks, spaced-repetition reviews, a mistakes notebook, badges, weekly goals, read-aloud support and a daily 5-minute mix. Admins build tasks or generate them from the built-in US curriculum library stored in MongoDB.",
    "stack": [
      "React Native + Expo",
      "Next.js",
      "Express 5",
      "MongoDB",
      "Monorepo shared UI",
      "Text-to-speech",
      "Speech recognition"
    ],
    "highlights": [
      "363 curriculum-aligned tasks across 4 subjects",
      "12 interactive question types incl. read-aloud scoring and number lines",
      "Spaced repetition: reviews after 3, 7, 21 and 60 days",
      "Badges, streaks, weekly goals and teacher feedback"
    ],
    "docsUrl": ""
  },
  {
    "enabled": true,
    "status": "beta",
    "name": "CoffeeConnect",
    "repoPath": "C:\\Naveen\\CoffeeConnect",
    "tagline": "Gen Z friend-finding, one coffee at a time",
    "category": "Social",
    "short": "Find people in your town, chat, and meet up for coffee. Browsing is free; starting chats and meetup invites cost beans — in-app credits bought with real money.",
    "description": "A mobile-first social app with an Express/MongoDB/Socket.IO backend and a Vite admin console. It features distance-based discovery with interest filters, real-time chat with icebreakers, meetup invites, a bean wallet with promo codes, paid events with host payouts, and a CoffeeConnect Plus subscription — all configurable from the admin console.",
    "stack": [
      "React Native (Expo)",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Stripe",
      "React (Vite)"
    ],
    "highlights": [
      "Atomic bean ledger — balances can't go negative, no double charges",
      "Geo discovery with MongoDB 2dsphere queries",
      "Paid events with Stripe tickets and automatic host payouts",
      "Full admin console: revenue, moderation, pricing, promos, logs"
    ],
    "docsUrl": ""
  },
  {
    "enabled": true,
    "status": "beta",
    "name": "Dispatch",
    "repoPath": "C:\\Naveen\\DispatchTool",
    "tagline": "Scheduling & dispatch for small transport operators",
    "category": "Logistics",
    "short": "Scheduling and dispatch for shuttles, church vans, medical (NEMT) rides and school contractors — with live conflict checks, compliance tracking and billing.",
    "description": "A dispatcher board assigns trips to vehicles and drivers with live conflict detection (double bookings, capacity, wheelchair lifts, expired licenses or insurance — all overridable with an audit trail). Riders request rides from their own app, drivers follow a one-tap manifest, and billing exports per-payer CSV logs for Medicaid brokers. Email and SMS reminders ride on SMTP + Twilio/Telnyx.",
    "stack": [
      "Expo SDK 58",
      "React Native 0.88",
      "Expo Router",
      "NativeWind",
      "Express 5",
      "MongoDB",
      "Zod",
      "JWT",
      "Twilio/Telnyx"
    ],
    "highlights": [
      "Multi-tenant with admin, dispatcher, driver and rider roles",
      "Recurring rides with idempotent trip generation",
      "HIPAA-minimal reminders with SMS STOP opt-out",
      "Free OpenStreetMap address autocomplete with GPS coordinates"
    ],
    "docsUrl": ""
  },
  {
    "enabled": true,
    "status": "beta",
    "name": "Vybrasonic",
    "repoPath": "C:\\Naveen\\MyMusic",
    "tagline": "A music player that plays anything, anywhere",
    "category": "Media",
    "short": "A React Native music player with a local library, an in-app Discover browser for free music sites, background playback, CarPlay and Android Auto, plus Stripe paywall and donations.",
    "description": "Vybrasonic imports your audio files, streams or downloads from Discover, and keeps playing with lock-screen controls in the car or on the go. A small companion server holds Stripe keys and admin settings (paywall, pricing, donations, SMTP) so secrets never ship inside the app, and a MusicBrainz worker fills in song details at the API's rate limit.",
    "stack": [
      "React Native",
      "Expo SDK 58",
      "New Architecture",
      "react-native-nitro-player",
      "Stripe",
      "Node server",
      "MusicBrainz",
      "MongoDB"
    ],
    "highlights": [
      "CarPlay and Android Auto support",
      "In-app browser to find and save free/public-domain music",
      "Soft/hard paywall with Stripe one-time and subscription payments",
      "Background song-metadata worker respecting MusicBrainz limits"
    ],
    "docsUrl": ""
  },
  {
    "enabled": true,
    "status": "live",
    "name": "AudioRecorder",
    "repoPath": "C:\\Naveen\\AudioRecorder",
    "tagline": "Voice notes that keep recording, screen locked or not",
    "category": "Productivity",
    "short": "An iOS-first voice recorder (React Native + Expo) that keeps recording while the iPhone is locked or another app is in front.",
    "description": "Record with a live timer and waveform, manage recordings with play, seek, rename and delete, and see storage usage at a glance. Recordings can auto-delete after 7, 30 or 90 days. Ships with full EAS build and App Store / Play Store submit scripts.",
    "stack": [
      "React Native",
      "Expo SDK 58",
      "TypeScript",
      "iOS background audio",
      "AVAudioSession",
      "EAS"
    ],
    "highlights": [
      "True background recording via the iOS audio background mode",
      "Live waveform and metering while recording",
      "Auto-delete after 7 / 30 / 90 days",
      "One-command App Store build & submit"
    ],
    "docsUrl": ""
  },
  {
    "enabled": true,
    "status": "internal",
    "name": "Bharat AI Engine",
    "repoPath": "C:\\Naveen\\AI_Model_Project\\bharat-ai-engine",
    "tagline": "Self-hosted AI behind Bharatham",
    "category": "AI Platform",
    "short": "A self-hosted AI platform: source-grounded content generation (Qwen3), translation into 14 Indian languages (IndicTrans2), human review workflow and a learning loop from reviewer corrections.",
    "description": "Dockerised services pair a Node API + BullMQ workers with Python FastAPI inference (Qwen3 via vLLM, IndicTrans2, embeddings, quality checks and self-correction), LoRA fine-tuning, and Prometheus/Grafana monitoring. languages.json is the single source of truth for the 14 supported languages, and mock models keep development fast on machines without GPUs.",
    "stack": [
      "Docker",
      "FastAPI",
      "Python",
      "Qwen3 / vLLM",
      "IndicTrans2",
      "LoRA fine-tuning",
      "Express 5",
      "MongoDB",
      "BullMQ",
      "Prometheus",
      "Grafana"
    ],
    "highlights": [
      "Translation into 14 Indian languages",
      "Source-grounded generation with human review workflow",
      "Reviewer corrections feed back into fine-tuning",
      "Runs on CPU or GPU with docker-compose overrides"
    ],
    "docsUrl": ""
  }
];
