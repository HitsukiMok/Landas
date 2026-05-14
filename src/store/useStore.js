import { create } from 'zustand'

/**
 * Derives a user title from their current level.
 */
function getTitleFromLevel(level) {
  if (level >= 800) return 'Academic Wizard'
  if (level >= 700) return 'Expert Scholar'
  if (level >= 600) return 'Advanced Reasoner'
  if (level >= 500) return 'Deep Analyzer'
  if (level >= 400) return 'Elite Thinker'
  if (level >= 300) return 'Mind Builder'
  if (level >= 200) return 'Focused Learner'
  if (level >= 100) return 'Emerging Explorer'
  return 'Curious Student'
}

const XP_MAP = {
  low: 15,
  moderate: 25,
  high: 35,
  daily: 20
}

/**
 * Global Landas state store.
 */
const useStore = create((set, get) => ({
  // ── XP & Leveling ──
  xp: 0,
  get level() {
    return Math.floor(get().xp / 50) + 1
  },
  get title() {
    return getTitleFromLevel(Math.floor(get().xp / 50) + 1)
  },
  get xpInCurrentLevel() {
    return get().xp % 50
  },
  
  addXP: (questType) => {
    const amount = XP_MAP[questType] || 0;
    const oldLevel = Math.floor(get().xp / 50) + 1;
    const newXP = get().xp + amount;
    const newLevel = Math.floor(newXP / 50) + 1;
    
    set({ 
      xp: newXP,
      lastXPGained: amount,
      didLevelUp: newLevel > oldLevel,
      successModalActive: true
    });
  },

  // ── Feedback Modals ──
  successModalActive: false,
  retryModalActive: false,
  lastXPGained: 0,
  didLevelUp: false,

  setSuccessModal: (active) => set({ successModalActive: active }),
  setRetryModal: (active) => set({ retryModalActive: active }),

  // ── Neuro-Inclusive Preferences ──
  themeMode: 'sanctuary', // 'arcade' | 'sanctuary'
  fontStyle: 'standard', // 'standard' | 'dyslexic'
  animationIntensity: 'full', // 'full' | 'reduced'
  preferredInputMode: 'visual', // 'visual' | 'audio' | 'text'
  settingsPanelActive: false,

  setThemeMode: (mode) => set({ themeMode: mode }),
  setFontStyle: (style) => set({ fontStyle: style }),
  setAnimationIntensity: (intensity) => set({ animationIntensity: intensity }),
  setPreferredInputMode: (mode) => set({ preferredInputMode: mode }),
  setSettingsPanel: (active) => set({ settingsPanelActive: active }),

  // ── Streaks ──
  dailyStreak: 1,
  streakFreezeAvailable: true,

  incrementStreak: () =>
    set((state) => ({
      dailyStreak: state.dailyStreak + 1,
    })),

  freezeStreak: () =>
    set((state) => {
      if (!state.streakFreezeAvailable) return state
      return { streakFreezeAvailable: false }
    }),

  // ── Biome / Environment ──
  currentBiome: 'Ocean',
  setBiome: (biome) => set({ currentBiome: biome }),

  // ── Sanctuary Mode ──
  sanctuaryActive: false,
  toggleSanctuary: () =>
    set((state) => ({
      sanctuaryActive: !state.sanctuaryActive,
    })),
}))

export const selectLevel = (state) => Math.floor(state.xp / 50) + 1
export const selectTitle = (state) => getTitleFromLevel(Math.floor(state.xp / 50) + 1)
export const selectXPInCurrentLevel = (state) => state.xp % 50

export default useStore


