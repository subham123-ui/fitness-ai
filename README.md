# 🏋️‍♂️ FitnessAI | Next.js 15 & Voice-First Health

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Convex](https://img.shields.io/badge/Convex-Backend-orange?style=for-the-badge&logo=convex)](https://convex.dev/)
[![Vapi.ai](https://img.shields.io/badge/Vapi.ai-Voice_Agents-blue?style=for-the-badge)](https://vapi.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **"Stop typing. Start training."**

A revolutionary health platform that replaces static forms with **interactive AI Voice Agents**. Talk to your personal coach in real-time to generate hyper-personalized diet and workout plans.

[**Explore Live Demo »**](https://fitness-ai-plum.vercel.app)

---

## 🏗️ Architecture & Technical Decisions

### ⚡ Why This Stack?
* **Next.js 15 (App Router):** Chosen for its robust server-side rendering capabilities, ensuring fast load times and SEO optimization for a consumer-facing health app.
* **Convex (BaaS):** Replaced traditional SQL/NoSQL setups with Convex for **real-time database sync** and serverless functions. This allows instant updates to diet plans without manual refreshing.
* **Vapi.ai Integration:** The core "Wow" factor. Instead of boring text inputs, users engage in a **natural, voice-to-voice conversation** with an AI agent that captures nuanced health data (injuries, preferences, goals) better than any checkbox could.

### 🧠 The "Logic" Flow
1.  **Voice Interaction:** The user speaks to the AI Agent (powered by Vapi). The audio is processed in real-time with low-latency streaming.
2.  **Data Extraction:** The AI analyzes the conversation to extract key metrics (Age, Weight, Dietary Restrictions, Fitness Goals).
3.  **Plan Generation:** This structured data is sent to a background job (via Convex Actions) which prompts an LLM to generate a comprehensive 30-day plan.
4.  **Real-Time Sync:** The plan is stored in Convex and instantly pushed to the user's dashboard via WebSockets.

---

## 🛡️ Key Features

### 🗣️ **Conversational Onboarding**
Forget 20-step forms. Just **talk**. The AI asks follow-up questions like a real trainer would: *"You mentioned knee pain, should we avoid high-impact cardio?"*

### 🥗 **Dynamic Diet & Workout Engine**
* **Smart Calorie Calculation:** Adjusts daily targets based on the user's voice-reported activity levels.
* **Allergy-Aware:** The AI agent actively listens for dietary restrictions (Vegan, Gluten-free, Nut allergies) and strictly filters recommendations.

### ⚡ **Real-Time Performance**
* **Instant Feedback:** As you speak, the agent acknowledges inputs with sub-second latency.
* **Optimized Rendering:** Uses Next.js **Suspense** and **Streaming** to load the dashboard skeleton immediately while fetching heavy AI data in the background.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15, React 19, TailwindCSS, Shadcn UI |
| **Backend / DB** | Convex (Serverless Functions & Database) |
| **AI / Voice** | Vapi.ai (Voice Agents), LLM Integration |
| **Language** | TypeScript (Strict Mode) |
| **Linting** | ESLint, Prettier |

---

## 🧗 Engineering Challenges

### **Challenge: Handling Voice Latency**
**Problem:** Users expect an instant response when talking to an AI, but generating a full diet plan takes time.
**Solution:** I implemented a **streaming architecture**. The Vapi agent acknowledges the input immediately ("Got it, calculating your plan..."), while the heavy LLM processing happens asynchronously in a Convex Action. The UI updates optimistically, keeping the user engaged.

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- Convex Account
- Vapi.ai API Key

### Installation

```bash
# Clone the repository
git clone [https://github.com/subham123-ui/fitness-ai.git](https://github.com/subham123-ui/fitness-ai.git)

# Install dependencies
npm install

# Setup Environment Variables
cp .env.example .env.local
# Add: CONVEX_DEPLOYMENT, NEXT_PUBLIC_CONVEX_URL, VAPI_PUBLIC_KEY

# Start Convex Backend
npx convex dev

# Start Frontend
npm run dev
