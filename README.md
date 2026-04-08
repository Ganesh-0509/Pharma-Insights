<p align="center">
  <img src="https://img.shields.io/badge/🧬-PharmaInsights_AI-blue?style=for-the-badge&labelColor=0a0f1a" alt="PharmaInsights AI" />
</p>
<h1 align="center">1. Project Title: PharmaInsights</h1>

<p align="center">
  <b>AI-Powered Research & Intelligence Assistant</b><br/>
  <i>Synthesize data. Uncover treatments. Accelerate drug discovery.</i>
</p>

<p align="center">
  <a href="#">
  <img src="https://img.shields.io/badge/Deployed_Link-neon?style=flat-square&logo=vercel" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Genkit-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-1A73E8?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
</p>

---

## 🚨 2. Problem Statement

Pharmaceutical researchers, medical professionals, and biotech analysts face overwhelming amounts of fragmented data:
- **Disjointed Sources:** Clinical trials, patents, and web intelligence live in silos.
- **Time-Consuming:** Synthesizing this data to track disease trends is extremely manual.
- **Missed Opportunities:** Finding molecule repurposing opportunities is prone to human error, drastically slowing down critical drug discovery pipelines.

## 💡 3. Solution Overview

PharmaInsights is an **intelligent, context-aware platform** that aggregates and analyzes complex pharmaceutical data.

> **Not just a search engine. A reasoning engine for drug discovery.**

- **Data Transformation:** Converts raw data (trials, patents, literature) into actionable insights and automated reports.
- **Google-Powered Core:** Driven entirely by **Google's Genkit** and **Gemini AI models**.
- **Dynamic Intelligence:** Autonomously correlates cross-domain data to surface novel treatments and repurposing strategies.

## 🏥 4. Chosen Vertical

**Healthcare & Pharmaceutical Research Assistant**
- **Persona:** Medical Researchers, Biotech Analysts, Pharmacologists.
- **Justification:** AI-driven data synthesis can fundamentally accelerate drug discovery and optimize clinical trial analytics. This provides high real-world impact and perfectly demonstrates the power of reasoning engines in highly complex scientific domains.

## ✨ 5. Core Features

### 🧪 Automated Data Synthesis
- Intelligently aggregates and summarizes clinical trial and patent data.
- **Google Integration:** Uses *Genkit* to orchestrate API calls to PubMed and ClinicalTrials.gov.

### 🎯 Smart Molecule Repurposing
- Makes data-backed decisions on potential new uses for existing molecules by cross-referencing pharmacological properties with disease pathways.
- **Google Integration:** *Gemini AI* acts as the reasoning engine to deduce correlations.

### 🌐 Real-time Web Intelligence
- Adapts dynamically to recent biomedical publications and guidelines, enriching internal insights in real-time.

### 📊 Automated Report Generation
- Autonomously compiles synthesized insights into structured, professional reports for stakeholders.

## ☁️ 6. Google Services Integration

*This platform heavily relies on Google Services as the core infrastructure, not as optional add-ons.*

| Service | Why it was used & Role in the system | Enhancing Intelligence |
|---|---|---|
| **Google Genkit** | Acts as the core AI orchestration framework, managing complex, multi-step AI flows. | Ensures robust parallel execution of data fetching, context injection, and AI reasoning. |
| **Google Gemini API** | Serves as the primary heavy-lifting reasoning engine. | Processes complex unstructured medical PDFs, understands patent jargon, and generates intelligent repurposing recommendations. |
| **Firebase Firestore** | Real-time NoSQL database essential for storing dynamic AI insights and user queries. | Allows the Next.js UI to reflect new AI insights instantaneously via real-time listeners. |
| **Firebase App Hosting** | Provides a seamless, serverless deployment environment. | Optimizes modern web app delivery with zero-config SSR support. |
| **Firebase Auth** | Secures user access to sensitive proprietary workflows. | Ensures that confidential pharmaceutical research data remains protected. |

## 🏗️ 7. System Architecture & Working

\\\	ext
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js + React UI)               │
│  ┌─────────────────┐ ┌────────────────┐ ┌────────────────────┐  │
│  │ Query Molecules │ │ Upload Docs    │ │ Insight Dashboard  │  │
│  └─────────────────┘ └────────────────┘ └────────────────────┘  │
├───────────────────────────────┬─────────────────────────────────┤
│         ORCHESTRATION         │        AI REASONING ENGINE      │
│  ┌─────────────────────────┐  │  ┌───────────────────────────┐  │
│  │ Google Genkit Flows     │──┼─▶│ Google Gemini API         │  │
│  │ (Parallel Data Fetching)│◀─┼──│ (Decision & Summarization)│  │
│  └─────────────────────────┘  │  └───────────────────────────┘  │
├───────────────────────────────┴─────────────────────────────────┤
│                     DATA & HOSTING (Firebase)                   │
│  ┌─────────────────┐ ┌────────────────┐ ┌────────────────────┐  │
│  │ Auth (Security) │ │ Firestore (DB) │ │ App Hosting (Web)  │  │
│  └─────────────────┘ └────────────────┘ └────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
\\\
**Flow:** \User Input (UI)\ ➔ \Genkit Orchestration\ ➔ \External APIs + Firestore\ ➔ \Gemini Decisioning\ ➔ \Firestore Update\ ➔ \Real-time UI Output\.

## 🧰 8. Tech Stack

| Layer | Technologies |
|---|---|
| **AI / Orchestration** | **Google Genkit**, **Google Gemini API** |
| **Backend & DB** | **Firebase Firestore**, Next.js API Routes |
| **Auth & Hosting** | **Firebase Authentication**, **Firebase App Hosting** |
| **Frontend** | Next.js, React 18, Tailwind CSS, shadcn/ui |
| **Data Sources** | ClinicalTrials.gov API, PubMed, USPTO |

## ⚙️ 9. Installation & Setup

1. **Clone the repository:**
   \\\ash
   git clone <repository_url>
   cd Pharma-Insights
   \\\
2. **Install dependencies:**
   \\\ash
   npm install
   \\\
3. **Set up Google Cloud / Firebase credentials:**
   - Create a Firebase Project, enable Firestore & Authentication.
   - Obtain a **Google Gemini API Key**.
   - Update \.env.local\:
     \\\env
     NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_domain"
     NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
     GEMINI_API_KEY="your_gemini_key"
     \\\
4. **Run the development server:**
   \\\ash
   npm run dev
   \\\

## 🧑‍🔬 10. Usage

- **Scenario A (Molecule Repurposing):** A researcher inputs \"Aspirin"\. Genkit fetches recent clinical trials and patent expirations. Gemini analyzes the aggregated text and suggests novel anti-inflammatory applications in rare autoimmune diseases.
- **Scenario B (Knowledge Synthesis):** An analyst uploads proprietary lab notes. The platform summarizes the document via Genkit flows and integrates the findings with real-time web intelligence from PubMed, presenting a unified dashboard.

## 📌 11. Assumptions

- Users have valid Google Cloud, Gemini API, and Firebase credentials.
- Uploaded documents are in standard text or accessible PDF formats.
- External APIs (ClinicalTrials.gov, PubMed) remain active for real-time querying.

## 🚧 12. Challenges & Learnings

- **Challenge:** Preventing AI hallucinations in a strict medical context.
  - **Learning:** Leveraging **Google Genkit's** robust prompt engineering and schema validation allowed us to strictly constrain Gemini's outputs to factual, data-backed recommendations.
- **Challenge:** Managing asynchronous, long-running AI tasks without blocking the UI.
  - **Learning:** Implementing **Firestore's real-time listeners** enabled a reactive frontend that gracefully handles backend Genkit flow resolutions.

## 🚀 13. Future Enhancements

- **Deeper Google Integration:** Implement **Google Cloud Healthcare API** to ensure FHIR/HL7 compliance for exchanging medical data.
- **Advanced RAG:** Integrate **Vertex AI Search** to index and query massive corpuses of internal proprietary documentation more efficiently.
- **Predictive Analytics:** Utilize **Google Cloud Vertex AI pipelines** to train custom models for predicting clinical trial success rates based on historical data.
