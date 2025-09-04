#!/usr/bin/env node

// CLI to generate a gesture question using a random gesture from the database and an OpenAI-compatible LLM
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// Load prompt template
const promptPath = path.join(__dirname, '../../supabase/prompts/GenerateGestureQuestion.txt');
const promptTemplate = fs.readFileSync(promptPath, 'utf8');

// Supabase config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// OpenAI-compatible API config
const openaiApiUrl = process.env.GEMINI_URL 
const openaiApiKey = process.env.GEMINI_API_KEY;

async function getRandomGesture() {
  const { data, error } = await supabase.rpc('get_random_gesture');
  if (error) throw error;
  return data[0];
}

async function generateQuestion(gesture) {
  // Fill prompt template
  const prompt = promptTemplate.replace('{{gesture}}', JSON.stringify(gesture));

  // Call OpenAI-compatible API
  const response = await axios.post(
    openaiApiUrl,
    {
      model: "gemini-2.5-flash-lite",
      reasoning_effort: "low",
      messages: [
        {
          role: "system",
          content:
            "Eres un generador de preguntas deportivas. Responde siempre en español.",
        },
        { role: "user", content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}

(async () => {
  try {
    const gesture = await getRandomGesture();
    console.log('Selected gesture:', gesture);
    const question = await generateQuestion(gesture);
    console.log('\nGenerated question:\n');
    console.log(question);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
