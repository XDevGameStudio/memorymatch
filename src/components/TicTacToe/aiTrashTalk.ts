const trashTalkPhrases = [
  "Is that the best move you've got?",
  "My algorithms are laughing at you",
  "Even a random number generator plays better",
  "Did you learn that move from a tutorial?",
  "Calculating your defeat...",
  "Your strategy is... interesting",
  "I've seen better moves in tic-tac-toe tutorials",
  "Are you even trying?",
  "Beep boop, that was predictable",
  "Processing... yep, that was a mistake",
  "My circuits are not impressed",
  "Did you mean to make that move?",
  "Error 404: Good move not found",
  "I'm playing tic-tac-toe, what game are you playing?",
  "You're making this too easy"
];

export const getTrashTalk = (): string => {
  const randomIndex = Math.floor(Math.random() * trashTalkPhrases.length);
  return trashTalkPhrases[randomIndex];
};