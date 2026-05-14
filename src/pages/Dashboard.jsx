import { useState } from 'react'
import { Settings } from 'lucide-react'
import BiomeBackground from '../components/dashboard/BiomeBackground'
import ProfilePanel from '../components/dashboard/ProfilePanel'
import QuestArea from '../components/dashboard/QuestArea'
import RekBuddy from '../components/dashboard/RekBuddy'
import SanctuaryManager from '../components/dashboard/SanctuaryManager'
import SanctuaryMode from '../components/dashboard/SanctuaryMode'
import QuestSuccessModal from '../components/dashboard/QuestSuccessModal'
import QuestRetryModal from '../components/dashboard/QuestRetryModal'
import { PreferencesPanel } from '../context/ThemeContext'
import useStore from '../store/useStore'

/**
 * Dashboard — main student dashboard layout.
 * Integrated with SanctuaryManager and the new Global Theme System.
 */
export default function Dashboard() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
      {/* Feedback & Preference Overlays */}
      <SanctuaryMode />
      <QuestSuccessModal />
      <QuestRetryModal />
      
      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-sm animate-slide-in-right">
            <button 
              onClick={() => setShowSettings(false)}
              className="absolute -top-12 right-0 text-white font-black text-[10px] tracking-widest uppercase hover:opacity-80 transition-opacity"
            >
              ✕ Close Preferences
            </button>
            <PreferencesPanel />
          </div>
        </div>
      )}

      {/* Biome-specific ambient background */}
      <BiomeBackground />

      {/* Top bar */}
      <header className="relative z-20 flex shrink-0 items-center justify-between px-6 py-3 sm:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/40 shadow-sm overflow-hidden border border-[#E8E5DF]">
            <img src="/final_logo_docs.png" alt="Landas Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#4A5568]">
            Landas
          </span>
        </a>

        <div className="flex items-center gap-3">
          {/* Preferences Button */}
          <button
            id="open-settings-btn"
            onClick={() => setShowSettings(true)}
            className="group flex items-center gap-2 rounded-2xl border border-[#E8E5DF] bg-[#F4F7F6]/80 px-5 py-2.5 text-[11px] font-bold tracking-wider text-[#718096] backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md active:scale-95"
          >
            <Settings className="w-3.5 h-3.5 transition-transform group-hover:rotate-45" />
            Preferences
          </button>
        </div>
      </header>

      {/* Main layout with Sanctuary behavioral monitoring */}
      <SanctuaryManager>
        <div className="relative z-10 flex-1 mx-auto grid w-full max-w-6xl gap-4 px-4 pb-4 sm:px-6 lg:grid-cols-[240px_1fr] overflow-hidden">
          <ProfilePanel />
          <QuestArea />
        </div>
      </SanctuaryManager>

      {/* Floating mascot */}
      <RekBuddy />
    </div>
  )
}

