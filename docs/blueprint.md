# **App Name**: Pharma Insights Explorer

## Core Features:

- Query Molecules/Diseases: Accepts user queries about molecules and diseases, acting as the entry point to the platform.
- Clinical Trials Agent: Fetches clinical trial data from ClinicalTrials.gov and WHO ICTRP APIs based on user queries.
- Patent Agent: Retrieves patent information from USPTO and PatentsView APIs related to queried molecules or diseases.
- Web Intelligence Agent: Gathers relevant literature and guidelines from PubMed and NCBI APIs to provide comprehensive insights.
- Internal Knowledge Agent: Allows users to upload PDF and DOC files for internal knowledge integration, which are then summarized using a transformer model.
- AI-Driven Insights & Repurposing: Utilizes an AI tool powered by HuggingFace Transformers to generate insights and repurposing suggestions for molecules, and assigns repurposing scores (0-100).
- Report Generator Agent: Generates PDF and Excel reports compiling data from various agents, which includes AI insights and can be downloaded.
- Interactive User Onboarding: Provides a guided tour for first-time users, highlighting key features and functionalities with interactive tooltips and animations.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to convey professionalism and innovation, evoking trust and knowledge.
- Background color: Very light gray (#F0F2F5) to ensure a clean and readable interface.
- Accent color: Teal (#008080) for interactive elements and highlights, complementing the primary color and adding a touch of vibrancy.
- Body and headline font: 'Inter', a sans-serif for a modern, objective feel.
- Use a consistent set of professional icons for data representation.
- Implement a clean and structured layout for easy navigation and readability.
- Subtle 3D transitions and animations to enhance user experience without being distracting. Use smooth, modern effects for loading, data updates, and interactive elements.