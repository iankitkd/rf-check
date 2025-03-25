import { NextResponse } from "next/server";

// Currently not using this google cloud vision api for ocr
export async function POST(request) {
  const { base64Image } = await request.json();
  const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Image.split(',')[1] },
            features: [{ type: 'TEXT_DETECTION' }]
          }
        ]
      })
    });

    const result = await response.json();
    return NextResponse.json({ text: result?.responses[0]?.fullTextAnnotation?.text || "" }, {status: 200});
  } catch (error) {
    return NextResponse.json({ message: 'OCR Failed', error: error.message }, {status: 500});
  }
}
