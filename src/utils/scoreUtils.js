// Score utility functions

/**
 * Check if a score qualifies as a high score
 */
export function checkIsHighScore(score, leaderboard) {
  return leaderboard.length < 10 || score > (leaderboard[leaderboard.length - 1]?.score || 0);
}
