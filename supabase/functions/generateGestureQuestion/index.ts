// Supabase Edge Function: generateGestureQuestion
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'npm:@supabase/supabase-js@2'
// axios is not supported in Deno Edge Functions; use fetch instead

serve(async (req) => {
  // Load environment variables
  // These environment variables must be set in the Supabase dashboard for Edge Functions
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const openaiApiUrl = Deno.env.get('GEMINI_URL');
  const openaiApiKey = Deno.env.get('GEMINI_API_KEY');

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // Get a random gesture from the DB
  const { data, error } = await supabase.rpc('get_random_gesture');
  if (error || !data) {
    return new Response(JSON.stringify({ error: error?.message || 'No gesture found' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
  const gesture = Array.isArray(data) ? data[0] : data;

  // Spanish prompt template requesting JSON output
  // Spanish prompt template requesting JSON output
const prompt = `Con los siguientes datos de un gesto de árbitro de hockey linea:

${JSON.stringify(gesture)}

Usa únicamente la información proporcionada en los datos del gesto para generar la pregunta y las respuestas.
No inventes detalles que no estén presentes en los datos. 
No incluyas en nombre del gesto en la pregunta, aunque puedes incluirla en la resupuesta.

IMPORTANTE: La pregunta NO debe contener la descripción de la acción o comportamiento que representa el gesto. No incluyas en la pregunta palabras o frases que revelen directamente la respuesta correcta. En su lugar, haz preguntas sobre:
- ¿Qué significa este gesto del árbitro?
- ¿Qué penalización se aplica por este gesto?
- ¿Qué tipo de falta representa este gesto?
- ¿Cuánto tiempo de penalización corresponde?

Genera una pregunta de opción múltiple para jugadores jóvenes sobre este gesto. 
La pregunta y las 4 opciones de respuesta deben estar en español: una respuesta correcta y tres opciones plausibles pero incorrectas. 
El índice de la respuesta correcta (correct) debe ser aleatorio entre 0 y 3, y las respuestas deben estar mezcladas en orden aleatorio.
Devuelve la respuesta en formato JSON con las siguientes claves: 
 question, 
 answers (array), 
 correct (índice de la respuesta correcta, empezando en 0).

Ejemplos de preguntas correctas (que NO contienen la respuesta):
{
  "question": "¿Qué significa el gesto mostrado?",
  "answers": ["Empujar con el stick", "Golpear con el stick", "Interferir con el stick", "Defender con el stick"],
  "correct": 2
}
{
  "question": "¿Cuánto tiempo de penalización recibe un jugador por este gesto?",
  "answers": ["2 minutos", "5 minutos", "10 minutos", "Sin penalización"],
  "correct": 1
}
{
  "question": "¿Qué tipo de falta representa este gesto?",
  "answers": ["Falta leve", "Falta grave", "Penalización de partido", "Advertencia"],
  "correct": 0
}

Usa un lenguaje claro y sencillo.`;

  // Call LLM API

const model='gemini-2.5-flash-lite'
const reasoning_effort="low"

  try {
    const llmResponse = await fetch(openaiApiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model ,
        reasoning_effort: reasoning_effort,
        messages: [
          { role: 'system', content: 'Eres un generador de preguntas deportivas. Responde siempre en español.' },
          { role: 'user', content: prompt },
        ]
      }),
    });
    const responseData = await llmResponse.json();
    // Extract and parse JSON from code block


// Helper to extract and parse JSON from code block
const extractJsonFromCodeBlock = (text) => {
  const cleaned = text.replace(/```json|```/g, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    return { error: 'Failed to parse JSON', raw: cleaned };
  }
};

    let questionText = "";
    if (responseData.choices && responseData.choices[0]?.message?.content) {
      questionText = responseData.choices[0].message.content;
    } else if (responseData.candidates && responseData.candidates[0]?.content?.parts) {
      questionText = responseData.candidates[0].content.parts.map(p => p.text).join("\n");
    } else {
      questionText = "[No question returned from LLM]";
    }

    let parsedQuestion = extractJsonFromCodeBlock(questionText);
    // If parsing failed, return a fallback question
    if (parsedQuestion.error || !parsedQuestion.question || !parsedQuestion.answers || typeof parsedQuestion.correct !== 'number') {
      parsedQuestion = {
        question: 'No se pudo generar una pregunta válida.',
        answers: ['Error de formato', 'Intenta de nuevo', 'Pregunta inválida', 'Sin datos'],
        correct: 0,
        error: parsedQuestion.error || 'Formato inesperado de la respuesta LLM',
        raw: parsedQuestion.raw || questionText
      };
    }
    return new Response(JSON.stringify({ gesture, question: parsedQuestion }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
});
