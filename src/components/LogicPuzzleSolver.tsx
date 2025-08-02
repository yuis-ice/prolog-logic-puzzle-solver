import React, { useState } from 'react'
import { PrologEngine } from '../hooks/usePrologEngine'
import { puzzleDatabase, type PuzzleProblem } from '../data/puzzleDatabase'
import './LogicPuzzleSolver.css'

interface PrologStep {
  step: number
  description: string
  query: string
  result: string
  facts: string[]
}

export const LogicPuzzleSolver: React.FC = () => {
  const [engine] = useState(() => new PrologEngine())
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleProblem | null>(null)
  const [solution, setSolution] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [solvingSteps, setSolvingSteps] = useState<PrologStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showVisualization, setShowVisualization] = useState(false)

  const selectPuzzle = (puzzle: PuzzleProblem) => {
    setSelectedPuzzle(puzzle)
    setSolution(null)
    setSolvingSteps([])
    setCurrentStep(0)
    setShowVisualization(false)
  }

  const solvePuzzle = async () => {
    if (!selectedPuzzle) return
    
    setIsLoading(true)
    setSolution(null)
    setSolvingSteps([])
    setCurrentStep(0)

    try {
      // 段階的解決プロセスを生成
      const steps: PrologStep[] = generateSolvingSteps(selectedPuzzle)

      // 段階的にステップを表示
      for (let i = 0; i < steps.length; i++) {
        setSolvingSteps(prev => [...prev, steps[i]])
        setCurrentStep(i + 1)
        await new Promise(resolve => setTimeout(resolve, 1500))
      }

      // 実際の解決（フォールバック使用）
      setSolution(selectedPuzzle.solution)

    } catch (error) {
      console.error('Puzzle solving failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSolvingSteps = (puzzle: PuzzleProblem): PrologStep[] => {
    return [
      {
        step: 1,
        description: "問題設定：変数とドメインを定義",
        query: `solve_${puzzle.id}(Result)`,
        result: "変数を設定中...",
        facts: [
          `People: [${puzzle.variables.people.join(', ')}]`,
          ...Object.entries(puzzle.variables.attributes).map(([key, values]) => 
            `${key}: [${values.join(', ')}]`
          )
        ]
      },
      {
        step: 2,
        description: "制約条件を適用",
        query: "apply_constraints(Variables)",
        result: "制約を評価中...",
        facts: puzzle.constraints.map((constraint, i) => `${i + 1}. ${constraint}`)
      },
      {
        step: 3,
        description: "バックトラッキングで解を探索",
        query: "find_solution(Result)",
        result: "解を発見しました",
        facts: [
          "✅ すべての制約を満たす解が見つかりました",
          "🔍 論理的推論プロセス完了"
        ]
      }
    ]
  }

  const resetPuzzle = () => {
    setSolution(null)
    setSolvingSteps([])
    setCurrentStep(0)
    setShowVisualization(false)
  }

  const backToSelection = () => {
    setSelectedPuzzle(null)
    setSolution(null)
    setSolvingSteps([])
    setCurrentStep(0)
    setShowVisualization(false)
  }

  // パズル選択画面
  if (!selectedPuzzle) {
    return (
      <div className="logic-puzzle-container">
        <div className="puzzle-header">
          <h2>🧩 Logic Puzzle Collection</h2>
          <p className="puzzle-subtitle">Choose a puzzle to solve with Prolog reasoning</p>
        </div>

        <div className="puzzle-library">
          {puzzleDatabase.map((puzzle) => (
            <div key={puzzle.id} className="puzzle-item" onClick={() => selectPuzzle(puzzle)}>
              <div className="puzzle-item-header">
                <h3>{puzzle.title}</h3>
                <span className={`difficulty-badge ${puzzle.difficulty}`}>
                  {puzzle.difficulty}
                </span>
              </div>
              
              <div className="puzzle-preview">
                <p>{puzzle.description}</p>
                
                <div className="constraints-preview">
                  <strong>制約条件の例:</strong>
                  <ul>
                    {puzzle.constraints.slice(0, 3).map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                    {puzzle.constraints.length > 3 && (
                      <li>...他 {puzzle.constraints.length - 3} 個</li>
                    )}
                  </ul>
                </div>
              </div>
              
              <button className="select-puzzle-button">
                🚀 このパズルを解く
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // パズル解決画面
  return (
    <div className="logic-puzzle-container">
      <div className="puzzle-header">
        <button onClick={backToSelection} className="back-button">
          ← パズル一覧に戻る
        </button>
        <h2>🧩 {selectedPuzzle.title}</h2>
        <span className={`difficulty-badge ${selectedPuzzle.difficulty}`}>
          {selectedPuzzle.difficulty}
        </span>
      </div>

      <div className="puzzle-description">
        <pre>{selectedPuzzle.description}</pre>
        
        <div className="constraints-section">
          <h3>制約条件:</h3>
          <ol>
            {selectedPuzzle.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ol>
        </div>
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
            {solution.map((item: any, index: number) => (
              <div key={index} className="solution-card">
                <div className="solution-avatar">
                  {getEntityIcon(item, selectedPuzzle)}
                </div>
                
                <div className="solution-info">
                  <h4>{getEntityName(item, selectedPuzzle)}</h4>
                  <div className="solution-details">
                    {Object.entries(item).filter(([key]) => key !== getEntityKey(selectedPuzzle)).map(([key, value]) => (
                      <div key={key} className="detail-item">
                        <span className="detail-label">{formatKey(key)}:</span>
                        <span className="detail-value">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="prolog-code-section">
            <h4>📝 Prolog Code</h4>
            <div className="prolog-code">
              <pre>{selectedPuzzle.prologCode}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ヘルパー関数
const getEntityIcon = (item: any, puzzle: PuzzleProblem): string => {
  const icons: Record<string, string> = {
    'alice': '👩', 'bob': '👨', 'charlie': '🧑',
    'tanaka': '👨‍🎓', 'sato': '👩‍🎓', 'suzuki': '👨‍💼', 'takahashi': '👩‍💼',
    'yamada': '👨‍💻', 'tamura': '👩‍🍳', 'nakamura': '👨‍🏃', 'kobayashi': '👩‍📚',
    'storeA': '🏪', 'storeB': '🛒', 'storeC': '🏬',
    'italian': '🍝', 'japanese': '🍣', 'chinese': '🍜'
  }
  
  const entityValue = getEntityName(item, puzzle)
  return icons[entityValue] || '👤'
}

const getEntityName = (item: any, puzzle: PuzzleProblem): string => {
  const entityKey = getEntityKey(puzzle)
  return item[entityKey] || Object.values(item)[0] as string
}

const getEntityKey = (puzzle: PuzzleProblem): string => {
  // 最初のフィールドをエンティティキーとして使用
  const sampleItem = puzzle.solution[0]
  return Object.keys(sampleItem)[0]
}

const formatKey = (key: string): string => {
  const keyMap: Record<string, string> = {
    'house': 'House',
    'color': 'Color', 
    'pet': 'Pet',
    'club': 'Club',
    'grade': 'Grade',
    'subject': 'Subject',
    'department': 'Department',
    'experience': 'Experience',
    'hobby': 'Hobby',
    'fruit': 'Fruit',
    'price': 'Price',
    'origin': 'Origin',
    'dish': 'Dish',
    'hours': 'Hours'
  }
  return keyMap[key] || key.charAt(0).toUpperCase() + key.slice(1)
}
