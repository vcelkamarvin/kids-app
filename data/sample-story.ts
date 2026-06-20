export type WordTiming = {
  word: string;
  start: number; // seconds
  end: number;   // seconds
};

export type Story = {
  id: string;
  title: string;
  words: WordTiming[];
};

// Builds word-level timings from plain text at a calm TTS pace (~120 wpm).
// The same interface accepts real ElevenLabs timestamps — just swap the data.
function buildTimings(text: string, wpm = 120): WordTiming[] {
  const rawWords = text.split(/\s+/).filter(Boolean);
  const secPerWord = 60 / wpm;
  let cursor = 0;
  return rawWords.map(word => {
    const start = parseFloat(cursor.toFixed(3));
    const end = parseFloat((cursor + secPerWord).toFixed(3));
    cursor = end + 0.04; // small breath gap between words
    return { word, start, end };
  });
}

const STORY_TEXT = `
Once upon a time, in a little house at the edge of a quiet forest,
there lived a young rabbit named Milo.
Milo had the softest grey ears and the brightest button eyes you had ever seen.

Every night when the stars began to appear,
Milo would curl up in his cozy bed made of dried leaves and moss.
But tonight he could not fall asleep.
The moon was too bright and the crickets were singing too loudly.

Milo climbed out of bed and hopped to the window.
He looked up at the sky and saw a thousand little stars blinking back at him.

One star blinked more than the others.
It was small and gold and very far away.

Hello, said the little gold star.
I cannot sleep either.

You cannot sleep? asked Milo. But you are a star.
Stars do not need to sleep.

Oh but we do, said the star.
Every morning when the sun comes up,
we close our eyes and dream until the night returns.

What do stars dream about? Milo asked softly.

We dream about the children who look up at us,
said the star.
We dream about all the warm little beds below.

Milo smiled at that.
He turned back to his cozy bed and closed his eyes.
Far above, the little gold star smiled too
and slowly, slowly, blinked itself to sleep.

And so did Milo.
`.trim().replace(/\n/g, ' ');

export const SAMPLE_STORY: Story = {
  id: 'sample-milo-001',
  title: 'The Star Who Could Not Sleep',
  words: buildTimings(STORY_TEXT),
};
