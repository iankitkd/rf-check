export const models = {
    // "Google: Gemini" : "gemini-2.0-flash" // no api key,
    "OpenAI: gpt oss" : "openai/gpt-oss-120b:free",
    "Xiaomi: MiMo" : "xiaomi/mimo-v2-flash:free",
    "Google: Gemma" : "google/gemma-3-27b-it:free",
    "Meta: Llama" : "meta-llama/llama-3.3-70b-instruct:free",
    "Mistral: Devstral" : "mistralai/devstral-2512:free",
    // "Mistral: Mistral" : "mistralai/mistral-7b-instruct:free",
    "NVIDIA: Nemotron" : "nvidia/nemotron-3-nano-30b-a3b:free",
    "Deepseek: R1" : "deepseek/deepseek-r1-0528:free",
    // "TNG: Deepseek" : "tngtech/deepseek-r1t2-chimera:free"  // restriction,
}

export const modelsList = Object.keys(models);