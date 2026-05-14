import { useState } from 'react'
import useStore from '../../store/useStore'
import AdditionPairsLab from '../labs/AdditionPairsLab'
import SubtractionStoreLab from '../labs/SubtractionStoreLab'
import AlgebraBalanceLab from '../labs/AlgebraBalanceLab'

const quests = [
  {
    id: 'quest-1',
    title: 'Basic Addition Review',
    description: 'Practice fundamental addition with friendly number pairs.',
    energyLabel: 'Low Energy',
    energyColor: '#C6F6D5',
    energyTextColor: '#276749',
    reward: 15,
    icon: '➕',
    energyDots: 1,
    labComponent: AdditionPairsLab,
  },
  {
    id: 'quest-2',
    title: 'Word Problem Application',
    description: 'Apply math skills to real-world word problems.',
    energyLabel: 'Moderate Focus',
    energyColor: '#FEFCBF',
    energyTextColor: '#975A16',
    reward: 25,
    icon: '📝',
    energyDots: 2,
    labComponent: SubtractionStoreLab,
  },
  {
    id: 'quest-3',
    title: 'Multi-step Algebra',
    description: 'Solve multi-step equations with variables and expressions.',
    energyLabel: 'High Brain Power',
    energyColor: '#FED7D7',
    energyTextColor: '#9B2C2C',
    reward: 35,
    icon: '🧮',
    energyDots: 3,
    labComponent: AlgebraBalanceLab,
  },
]

function QuestCard({ quest, onStart, isCompleted }) {
  return (
    <article
      id={quest.id}
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 ${
        isCompleted
          ? 'border-[#C6F6D5] bg-[#F0FFF4]'
          : 'border-[#E8E5DF] bg-[#F4F7F6] hover:border-[#D4EAF5] hover:shadow-md'
      }`}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl"
        style={{ background: quest.energyColor }}
      />
      <div className="p-5 pl-6">
        <div className="mb-3 flex items-start gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-xl shadow-inner"
            style={{ background: `${quest.energyColor}80` }}
          >
            {quest.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-semibold tracking-wide text-[#4A5568]">
              {quest.title}
            </h3>
            <p className="mt-0.5 text-xs leading-relaxed tracking-wide text-[#718096]">
              {quest.description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase"
              style={{ background: quest.energyColor, color: quest.energyTextColor }}
            >
              {quest.energyLabel}
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: i < quest.energyDots ? quest.energyTextColor : '#E8E5DF',
                    opacity: i < quest.energyDots ? 0.6 : 1,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tracking-wide text-[#A0AEC0]">
              +{quest.reward} XP
            </span>
            {isCompleted ? (
              <div className="flex items-center gap-1.5 rounded-2xl bg-[#C6F6D5] px-4 py-2 text-xs font-semibold text-[#276749]">
                ✓ Done
              </div>
            ) : (
              <button
                onClick={() => onStart(quest)}
                className="rounded-2xl bg-[#E8F4F8] px-4 py-2 text-xs font-semibold tracking-wider text-[#4A5568] transition-all duration-300 hover:bg-[#D4EAF5] hover:shadow-sm"
              >
                Start Quest
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function QuestArea() {
  const addXP = useStore((s) => s.addXP)
  const incrementStreak = useStore((s) => s.incrementStreak)
  
  const [activeQuest, setActiveQuest] = useState(null)
  const [completedQuests, setCompletedQuests] = useState([])

  const handleStartQuest = (quest) => {
    if (!quest.labComponent) {
      completeQuest(quest, { timeSpent: 0, interactionCount: 0, energyLevel: quest.energyLabel })
      return
    }
    setActiveQuest(quest)
  }

  const completeQuest = (quest, telemetry) => {
    console.log('Quest Telemetry:', telemetry)
    addXP(quest.reward)
    incrementStreak()
    setCompletedQuests([...completedQuests, quest.id])
    setActiveQuest(null)
  }

  return (
    <section id="quest-area" className="flex flex-col gap-4">
      <div className="mb-1">
        <h2 className="text-xl font-bold tracking-wide text-[#4A5568]">
          🗺️ Active Quests
        </h2>
        <p className="mt-1 text-xs tracking-wide text-[#718096]">
          Choose a quest that matches your current energy level
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        {quests.map((quest) => (
          <QuestCard 
            key={quest.id} 
            quest={quest} 
            onStart={handleStartQuest}
            isCompleted={completedQuests.includes(quest.id)}
          />
        ))}
      </div>

      {/* Lab Overlay - Resized for better fit */}
      {activeQuest && activeQuest.labComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDFBF7]/90 backdrop-blur-sm p-4 sm:p-8">
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


