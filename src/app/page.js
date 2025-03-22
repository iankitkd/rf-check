import { CheckerWindow, Footer, Header } from "@/components";

export default async function Home() {
//   const text = "i like ms dhoni"
//   const promt = "answer 4 questions for it and return js array 1: is this fact based or opinion based text(one word answer it) 2: if fact based rate it on scale of 0-100(0 for fake, 100 for real) 3:  mark it real, fake, half-truth or neutral(can not say) 4: explain in detail why do you rate it such (not make feel like it is asked via promt)";

//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${API_KEY}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       "model": "deepseek/deepseek-r1:free",
//       "messages": [
//         {
//           "role": "user",
//           "content": `${text} ${promt}`
//         }
//       ]
//     })
//   });
  
//   const data = await response.json();
//   console.log(data, "da")
//   console.log(data.choices[0].message.content, "ehefdg")

//   const formData = new FormData();
// formData.append("apikey", "helloworld");
// formData.append("language", "eng");
// formData.append("url", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Example_image.jpg/220px-Example_image.jpg");

// fetch("https://api.ocr.space/parse/image", {
//   method: "POST",
//   body: formData,
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data.ParsedResults?.[0]?.ParsedText, "imag ocr"));


  return (
    <div className="w-full min-h-screen scrollbar-none flex flex-col">
      <Header />
      <CheckerWindow />
      <Footer />
    </div>
  );
}
