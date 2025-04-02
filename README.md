# RF Check

**RF Check** is a Next.js web application that allows users to verify the authenticity of text or text extracted from images. Users can choose between **Gemini** and **DeepSeek** AI APIs to analyze the text and determine whether it is **Real, Fake, or Half-Truth**. The app also provides a ***score*** (0-100), detailed explanation, sources, categories, and keywords for better insight.

## Features
- **Text Authenticity Check**: Enter text to analyze whether it is real, fake, or half-truth.
- **Image Text Extraction**: Uses **Tesseract.js** to extract text from images before verification.
- **AI-Powered Analysis**: Users can choose between **Gemini** and **DeepSeek** APIs.
- **Detailed Results**:
  - **Classification**: Real, Fake, Half-Truth
  - **Score**: Scale of 0-100
  - **Detailed Description**: Explanation of the result
  - **Source Link**: Verified references for fact-checking
  - **Category & Keywords**: Contextual analysis of the input text
- **User-Friendly Interface**: Clean and intuitive UI for easy usage.

## Tech Stack
- **Next.js** – Frontend framework
- **Gemini API** – AI model for text verification
- **DeepSeek API** – Alternative AI model for analysis
- **Tesseract.js** – OCR for text extraction from images
- **Tailwind CSS** – Styling and UI design

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/iankitkd/rf-check.git
   ```
   ```sh
   cd rf-check
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```env
   API_KEY=your_openrouter_api_key
   BASE_URL=base_url
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.


## License
This project is licensed under the **MIT License**.

---

