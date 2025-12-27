# Setting up Vertex AI Search

To use the "Grounding" features for the TechFact Trader agents (so they can verify claims against real sources), you have two options:

## Option 1: Grounding with Google Search (Simpler)
If you just want the agents to use Google Search to verify facts from the open web, you might not strictly need a specific Vertex Datastore ID if the code falls back to `GoogleSearchRetrieval`.
*   **Requirement**: Enable **Vertex AI API** in your Google Cloud Project.
*   **Env Var**: You can leave `VERTEX_DATASTORE_ID` empty in `.env`. The backend is configured to use Google Search default grounding if no ID is present.

## Option 2: Vertex AI Search Data Store (Custom/Focused)
If you want to restrict search to specific news sites (e.g. TechCrunch, Bloomberg) or your own Firestore data, you need a Data Store.

### Steps to get `VERTEX_DATASTORE_ID`:
1.  Go to the **[Google Cloud Console](https://console.cloud.google.com/)**.
2.  Navigate to **Vertex AI Agent Builder** (formerly Search & Conversation).
3.  Click **Create App**.
4.  Select **Search**.
5.  Choose **General** (or "Website" if you want to index specific URLs).
6.  **Data Store**:
    *   Create a new Data Store.
    *   **Source**: Select "Cloud Firestore" (if you want to search your `techfact` collection) or "Web" (to search public sites you define).
    *   If you chose Firestore, select your `techfact` collection.
7.  Create the App.
8.  Once created, go to the **Data Stores** tab in the left menu.
9.  Click on your Data Store name.
10. On the details page, look for **Data Store ID**. It usually looks like `techfact-news-search_12345`.
11. Copy this ID and paste it into your `.env` file:
    ```bash
    VERTEX_DATASTORE_ID=your-copied-id
    ```
