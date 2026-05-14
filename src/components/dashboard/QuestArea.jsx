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
    <section id="quest-area" className="flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-xl font-bold tracking-wide text-[#4A5568]">
          🗺️ Quest Map
        </h2>
        <p className="mt-1 text-xs tracking-wide text-[#718096]">
          Explore biomes and join the global expedition
        </p>
      </div>
      
      {/* Visual Map Interface */}
      <QuestMapManager onSelectQuest={handleStartQuest} />

      {/* Lab Overlay */}
      {activeQuest && activeQuest.labComponent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FDFBF7]/90 backdrop-blur-sm p-4 sm:p-8">
          <div className="relative w-full max-w-xl animate-fade-in-up">
            <button 
              onClick={() => setActiveQuest(null)}
              className="absolute -top-10 right-0 text-[#718096] hover:text-[#4A5568] font-bold text-[10px] tracking-widest uppercase bg-white/50 px-3 py-1 rounded-full"
            >
              ✕ Cancel
            </button>
            
            <activeQuest.labComponent 
              onQuestComplete={(telemetry) => completeQuest(activeQuest, telemetry)} 
            />
          </div>
        </div>
      )}
    </section>
  )
}



