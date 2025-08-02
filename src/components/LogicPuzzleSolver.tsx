import React, { useState } from 'react'
import { PrologEngine } from '../hooks/usePrologEngine'
import './LogicPuzzleSolver.css'

interface Person {
  person: string
  house: number
  color: string
  pet: string
}

interface PrologStep {
  step: number
  description: string
  query: string
  result: string
  facts: string[]
}

export const LogicPuzzleSolver: React.FC = () => {
  const [engine] = useState(() => new PrologEngine())
  const [solution, setSolution] = useState<Person[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [solvingSteps, setSolvingSteps] = useState<PrologStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showVisualization, setShowVisualization] = useState(false)

  const puzzleDescription = `
    🏠 アリス、ボブ、チャーリーの家パズル 🏠
    
    3人の人がいます：アリス、ボブ、チャーリー
    3つの家があります：1番、2番、3番
    3つの色があります：赤、青、緑
    3匹のペットがいます：犬、猫、鳥
    
    制約条件：
    1. アリスは赤い家か青い家に住んでいる
    2. ボブは2番の家に住んでいる
    3. チャーリーは緑の家に住んでいる場合のみ犬を飼っている
    4. アリスは赤い家に住んでいて犬を飼ってはいない
    5. 青い家の住人は猫か鳥を飼っている
  `

  const solvePuzzle = async () => {
    setIsLoading(true)
    setSolution(null)
    setSolvingSteps([])
    setCurrentStep(0)

    try {
      // デモ用の段階的解決プロセス
      const steps: PrologStep[] = [
        {
          step: 1,
          description: "問題設定：人、家、色、ペットの変数を定義",
          query: "solve_houses(People)",
          result: "変数を設定中...",
          facts: [
            "person(alice, House1, Color1, Pet1)",
            "person(bob, House2, Color2, Pet2)", 
            "person(charlie, House3, Color3, Pet3)"
          ]
        },
        {
          step: 2,
          description: "制約条件1: アリスは赤い家か青い家",
          query: "member(person(alice, _, red, _), People) ; member(person(alice, _, blue, _), People)",
          result: "アリスの家の色を制限",
          facts: [
            "alice_color ∈ {red, blue}",
            "bob_house = 2",
            "charlie: green_house ↔ dog"
          ]
        },
        {
          step: 3,
          description: "制約条件2: ボブは2番の家",
          query: "member(person(bob, 2, _, _), People)",
          result: "ボブの家番号が確定",
          facts: [
            "alice: house ∈ {1, 3}, color ∈ {red, blue}",
            "bob: house = 2, color ∈ {red, blue, green}",
            "charlie: house ∈ {1, 3}"
          ]
        },
        {
          step: 4,
          description: "制約条件3-5を適用して解を探索",
          query: "apply_all_constraints(People)",
          result: "バックトラッキングで解を発見",
          facts: [
            "alice: house=1, color=blue, pet=bird",
            "bob: house=2, color=red, pet=cat", 
            "charlie: house=3, color=green, pet=dog"
          ]
        }
      ]

      // 段階的にステップを表示
      for (let i = 0; i < steps.length; i++) {
        setSolvingSteps(prev => [...prev, steps[i]])
        setCurrentStep(i + 1)
        await new Promise(resolve => setTimeout(resolve, 1500))
      }

      // 実際の解決
      const result = await engine.solveLogicPuzzle('houses', {})
      setSolution(result)

    } catch (error) {
      console.error('Puzzle solving failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetPuzzle = () => {
    setSolution(null)
    setSolvingSteps([])
    setCurrentStep(0)
    setShowVisualization(false)
  }

  return (
    <div className="logic-puzzle-container">
      <div className="puzzle-header">
        <h2>🧩 Logic Puzzle Solver with WASM Prolog</h2>
        <p className="puzzle-subtitle">Step-by-step Prolog reasoning visualization</p>
      </div>

      <div className="puzzle-description">
        <pre>{puzzleDescription}</pre>
      </div>

      <div className="control-buttons">
        <button 
          onClick={solvePuzzle} 
          disabled={isLoading}
          className="solve-button"
        >
          {isLoading ? '🔍 Solving...' : '🚀 Solve with Prolog'}
        </button>
        
        <button 
          onClick={resetPuzzle}
          className="reset-button"
        >
          🔄 Reset
        </button>

        <label className="visualization-toggle">
          <input 
            type="checkbox" 
            checked={showVisualization}
            onChange={(e) => setShowVisualization(e.target.checked)}
          />
          Show step-by-step reasoning
        </label>
      </div>

      {showVisualization && solvingSteps.length > 0 && (
        <div className="solving-visualization">
          <h3>🔍 Prolog Reasoning Process</h3>
          
          {solvingSteps.map((step, index) => (
            <div 
              key={step.step} 
              className={`reasoning-step ${index < currentStep ? 'completed' : 'pending'}`}
            >
              <div className="step-header">
                <span className="step-number">Step {step.step}</span>
                <span className="step-status">
                  {index < currentStep ? '✅' : '⏳'}
                </span>
              </div>
              
              <div className="step-content">
                <p className="step-description">{step.description}</p>
                
                <div className="prolog-query">
                  <strong>Prolog Query:</strong>
                  <code>{step.query}</code>
                </div>
                
                <div className="step-result">
                  <strong>Result:</strong> {step.result}
                </div>
                
                <div className="current-facts">
                  <strong>Current Facts:</strong>
                  <ul>
                    {step.facts.map((fact, i) => (
                      <li key={i}><code>{fact}</code></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {solution && (
        <div className="solution-display">
          <h3>🎉 Solution Found!</h3>
          
          <div className="solution-grid">
            {solution.map((person, index) => (
              <div key={index} className="person-card">
                <div className="person-avatar">
                  {person.person === 'alice' ? '👩' : 
                   person.person === 'bob' ? '👨' : '🧑'}
                </div>
                
                <div className="person-info">
                  <h4>{person.person.charAt(0).toUpperCase() + person.person.slice(1)}</h4>
                  <div className="person-details">
                    <div className="detail-item">
                      <span className="detail-label">House:</span>
                      <span className="detail-value">#{person.house}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Color:</span>
                      <span 
                        className="detail-value color-badge"
                        style={{ backgroundColor: person.color, color: person.color === 'yellow' ? 'black' : 'white' }}
                      >
                        {person.color}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Pet:</span>
                      <span className="detail-value">
                        {person.pet === 'dog' ? '🐕' : 
                         person.pet === 'cat' ? '🐱' : '🐦'} {person.pet}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="prolog-code-section">
            <h4>📝 Equivalent Prolog Code</h4>
            <div className="prolog-code">
              <pre>{`
% 解答をPrologで表現
solution :-
  ${solution.map(p => 
    `person(${p.person}, ${p.house}, ${p.color}, ${p.pet})`
  ).join(',\n  ')}.

% 制約条件をすべて満たしている
check_constraints :-
  % 1. アリスは赤い家か青い家
  (person(alice, _, red, _) ; person(alice, _, blue, _)),
  
  % 2. ボブは2番の家
  person(bob, 2, _, _),
  
  % 3. チャーリーは緑の家 ↔ 犬を飼っている
  (person(charlie, _, green, dog) ; 
   (\\+ person(charlie, _, green, _), \\+ person(charlie, _, _, dog))),
  
  % 4. アリスは赤い家 → 犬以外
  \\+ person(alice, _, red, dog),
  
  % 5. 青い家 → 猫か鳥
  (person(_, _, blue, cat) ; person(_, _, blue, bird)).
              `}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
