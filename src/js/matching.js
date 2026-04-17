// matching.js for Workout Recommender
/**
 * @param {*} workout - The workout to check
 * @param {*} type - The type of workout the user wants
 * @returns boolean - True if the workout matches the type preference, false otherwise
 */
export function matchesType(workout, type) {
  if (!type) return true; // If no type is selected, match all
  return workout.type.toLowerCase().includes(type.toLowerCase());
}

/**
 * @param {*} workout - The workout to check
 * @param {*} targetArea - The target area the user wants
 * @returns boolean - True if the workout matches the target area preference, false otherwise
 */
export function matchesTarget(workout, targetArea) {
  if (!targetArea) return true; // If no target area is selected, match all
  return workout.targetArea.toLowerCase().includes(targetArea.toLowerCase());
}

/**
 * @param {*} workout - The workout to check
 * @param {*} equipment - The equipment the user wants
 * @returns boolean - True if the workout matches the equipment preference, false otherwise
 */
export function matchesEquipment(workout, equipment) {
  if (!equipment) return true; // If no equipment is selected, match all
  return workout.equipment.toLowerCase().includes(equipment.toLowerCase());
}

/**
 * @param {*} workout - The workout to check for
 * @param {*} duration - The duration the user wants
 * @returns boolean - True if the workout matches the duration preference, false otherwise
 */
export function matchesDuration(workout, duration) {
  if (!duration) return true; // If no duration is selected, match all
  const mins = workout.durationMinutes;
  if (duration === '15 minutes') return mins <= 15;
  if (duration === '30 minutes') return mins > 15 && mins <= 30;
  if (duration === '45 minutes') return mins > 30 && mins <= 45;
  if (duration === '60+ minutes') return mins > 45;
  return false;
}

/**
 *
 * @param {*} workout - The workout to check
 * @param {*} difficulty - The desired workout difficulty
 * @returns boolean - True if the workout matched the difficulty preference, false otherwise
 */
export function matchesDifficulty(workout, difficulty) {
  if (!difficulty) return true; // If no difficulty is selected, match all
  return workout.difficulty === difficulty;
}

export function matchesAllPreferences(workout, preference) {
  return (
    matchesType(workout, preference.type) &&
    matchesTarget(workout, preference.targetArea) &&
    matchesEquipment(workout, preference.equipment) &&
    matchesDuration(workout, preference.duration) &&
    matchesDifficulty(workout, preference.difficulty)
  );
}
