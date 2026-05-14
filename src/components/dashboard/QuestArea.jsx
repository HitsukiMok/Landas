import { useState } from 'react'
import useStore from '../../store/useStore'
import QuestMapManager from './QuestMapManager'

/**
 * QuestArea - Central container for the Quest Map and interactive labs.
 */
export default function QuestArea() {
  const addXP = useStore((s) => s.addXP)
  const incrementStreak = useStore((s) => s.incrementStreak)
  
  const [activeQuest, setActiveQuest] = useState(null)
  const [completedQuests, setCompletedQuests] = useState([])

  const handleStartQuest = (quest) => {
    // If no lab component, just mark as complete (for mockup purposes)
    if (!quest.labComponent) {
      completeQuest(quest, { timeSpent: 0, interactionCount: 0, energyLevel: quest.energy || 'low' })
      return
    }
    setActiveQuest(quest)
  }

  const completeQuest = (quest, telemetry) => {
    console.log('Quest Telemetry:', telemetry)
    addXP(quest.xpType || 'low')
    incrementStreak()
    setCompletedQuests([...completedQuests, quest.id])
    setActiveQuest(null)
  }

  return (
    <>
      <section id="quest-area" className="flex flex-col h-full overflow-hidden rounded-3xl border border-white/20 bg-black/50 backdrop-blur-md border-white/10 p-4 sm:p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold tracking-wide text-white flex items-center gap-2">
            🗺️ Quest Map
          </h2>
          <p className="text-[10px] tracking-wide text-white/70">
            Explore biomes & join the expedition
          </p>
        </div>
      </div>
      
      {/* Visual Map Interface */}
      <QuestMapManager onSelectQuest={handleStartQuest} />

      </section>

      {/* Lab Overlay */}
      {activeQuest && activeQuest.labComponent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-lg h-full max-h-[600px] animate-fade-in-up bg-[#1A202C] rounded-2xl border border-white/20 shadow-2xl overflow-y-auto">
            <button 
              onClick={() => setActiveQuest(null)}
              className="sticky top-2 float-right mr-2 z-50 text-white/50 hover:text-white font-bold text-[9px] tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full transition-colors"
            >
              ✕ Cancel
            </button>
            
            <div className="p-4 sm:p-6">
              <activeQuest.labComponent 
                onQuestComplete={(telemetry) => completeQuest(activeQuest, telemetry)} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}



