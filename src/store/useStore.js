import { create } from 'zustand'

/**
 * Derives a user title from their current level.
 */
function getTitleFromLevel(level) {
  if (level >= 300) return 'Legendary Pathfinder'
  if (level >= 200) return 'Master Navigator'
  if (level >= 100) return 'Emerging Explorer'
  return 'Curious Student'
}

/**
 * Global Landas state store.
 * Tracks XP, leveling, streaks, biome, and UI mode.
 */
const useStore = create((set, get) => ({
  // ── XP & Leveling ──
  xp: 0,
  get level() {
    return Math.floor(get().xp / 50)
  },
  get title() {
    return getTitleFromLevel(Math.floor(get().xp / 50))
  },
  get xpInCurrentLevel() {
    return get().xp % 50
  },
  get xpToNextLevel() {
    return 50
  },

  addXP: (amount) =>
    set((state) => ({
      xp: state.xp + amount,
    })),

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
  currentBiome: 'Ocean', // "Ocean" | "Tropics" | "Desert"

  setBiome: (biome) => set({ currentBiome: biome }),

  // ── UI Mode ──
  uiMode: 'low-stim', // "low-stim" | "high-stim"

  toggleUIMode: () =>
    set((state) => ({
      uiMode: state.uiMode === 'low-stim' ? 'high-stim' : 'low-stim',
    })),

  // ── Sanctuary Mode ──
  sanctuaryActive: false,

  toggleSanctuary: () =>
    set((state) => ({
      sanctuaryActive: !state.sanctuaryActive,
    })),
}))

// Helper selectors (computed values require function calls since Zustand
// doesn't support ES5 getters on the plain object returned by create).
export const selectLevel = (state) => Math.floor(state.xp / 50)
export const selectTitle = (state) => getTitleFromLevel(Math.floor(state.xp / 50))
export const selectXPInCurrentLevel = (state) => state.xp % 50
export const selectXPToNextLevel = () => 50

export default useStore
