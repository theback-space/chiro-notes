// Phrase variation pools to avoid cloned-feeling notes.
// selectVariant() picks based on a daily hash so variants rotate
// but stay consistent within a session.

const PHRASE_POOLS: Record<string, string[]> = {
  opening_ongoing: [
    'Client presents for ongoing chiropractic care for',
    'Client reports for continued chiropractic care addressing',
    'Client is here for ongoing chiropractic care for',
    'Client returns for continued chiropractic care for',
  ],
  opening_new: [
    'Client presents for initial chiropractic evaluation and care for',
    'New client presents for chiropractic evaluation regarding',
    'Client presents for first visit addressing',
  ],
  opening_reactivation: [
    'Client returns for reactivation of chiropractic care for',
    'Client presents for reactivation of care addressing',
    'Client returns to resume chiropractic care for',
  ],
  adverse_denial: [
    'Client denies any adverse response to previous session.',
    'No adverse response to previous care reported.',
    'Client reports no adverse effects from last session.',
  ],
  no_new_sensations: [
    'No new sensations, injuries, or incidents reported.',
    'No new complaints, injuries, or incidents since last visit.',
    'Client reports no new sensations or incidents.',
  ],
  tolerance_well: [
    'Client tolerated procedures well.',
    'Procedures were well-tolerated.',
    'Client tolerated today\'s procedures without incident.',
  ],
  tolerance_without_incident: [
    'Client tolerated procedures without incident.',
    'Procedures were tolerated without incident.',
    'No adverse response during procedures.',
  ],
  motion_palpation_intro: [
    'Motion palpation reveals segmental joint dysfunction in the',
    'On motion palpation, segmental joint dysfunction identified in the',
    'Motion palpation findings indicate segmental dysfunction in the',
  ],
};

function getDailyHash(): number {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function selectVariant(key: string): string {
  const pool = PHRASE_POOLS[key];
  if (!pool || pool.length === 0) return '';
  const hash = getDailyHash();
  return pool[hash % pool.length];
}

export const LOCKED_ASSESSMENT = 'Segmental joint dysfunction consistent with vertebral subluxation patterns identified on motion palpation. Care today provided as Maintenance Care with a Preventive/Wellness intent focused on supporting spinal joint mechanics and overall mobility.';

export const VERBAL_CONSENT = 'Verbal consent obtained prior to care.';
