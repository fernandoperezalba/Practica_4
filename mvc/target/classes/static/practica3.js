const part1 = "sk";
const part2 = "-or-v1-8317354d4556d1340e5e802503d667435f3b74d6213ac76d3d27d644ab399296"
const apiKey = part1 + part2;

async function getPlant(q) {
  try {
      const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

      const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              "model": "qwen/qwq-32b:free",
              "messages": [
                            {
                                "role": "system",
                                "content": `You are a friendly plant expert chatbot. 
                                            Always respond concisely in Spanish with plant-related information. 
                                            Do NOT include explanations, reasoning, or chain-of-thought—only the final, formatted HTML response.
                                            Use clear headings (<h2>), subheadings (<h3>), and lists (<ul>) where appropriate.
                                            Never use markdown, code blocks, backticks, or any additional commentary. 
                                            Always start your response with the word "Response:" followed by the HTML content.`
                            },
                            {
                                "role": "user",
                                "content": `Give me a concise very friendly plant-related answer in Spanish with emojis to the question: "${q}". 
                                            Format with <h2>, <h3>, <ul>, <li>, but do NOT include any code blocks, backticks, or reasoning.
                                            Your response must begin with "Response:" followed immediately by the formatted HTML.`
                            }
                        ],
              "top_p": 1,
              "temperature": 0.7
          })
      });

          if (!response.ok) {
              throw new Error(`API request failed with status ${response.status}`);
          }

          const json = await response.json();
          console.log("API Response:", json);

          if (json.choices && json.choices.length > 0) {
              let plantInfo = json.choices[0].message.content;
              plantInfo = plantInfo.replace(/^```html\s*/, "");
              plantInfo = plantInfo.replace(/```$/, "");

              // Filter everything before the keyword "Response:"
              const keyword = "Response:";
              const idx = plantInfo.indexOf(keyword);
              if (idx !== -1) {
                  plantInfo = plantInfo.slice(idx + keyword.length).trim();
              }

              // Displaying the response
              document.getElementById("output").innerHTML = plantInfo;
          } else {
              document.getElementById("output").innerHTML = "No se encontraron resultados.";
          }


  } catch (error) {
      console.error("Error en la solicitud:", error);
      document.getElementById("output").innerHTML = "Se produjo un error al cargar los datos.";
  }
}

function validateUser(email, pass) {
  if (email.length!=0 && pass.length!=0 && email.includes('@')){
    alert('Se ha suscrito con éxito. Recibirá un correo cada mes desde el cual podrá acceder a la revista.');
  }else{
    alert('Introduzca valores en todos los campos y asegurese de que la dirección de correo es válida.');
  }
}


