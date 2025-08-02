import React from 'react'
import './LogicPuzzleSelector.css'

interface LogicPuzzleSelectorProps {
  onPuzzleSelect: (puzzleType: string) => void
}

export const LogicPuzzleSelector: React.FC<LogicPuzzleSelectorProps> = ({ onPuzzleSelect }) => {
  const puzzles = [
    {
      id: 'sudoku',
      title: '🔢 Sudoku Solver',
      description: 'Classic 9x9 number puzzle with backtracking algorithm',
      difficulty: 'Medium',
      technology: 'Backtracking Algorithm',
      features: ['Interactive grid', 'Step-by-step solving', 'Constraint validation']
    },
    {
      id: 'logic',
      title: '🏠 Logic Puzzle',
      description: 'Alice, Bob, Charlie houses puzzle with Prolog reasoning',
      difficulty: 'Advanced',
      technology: 'WASM Prolog Engine',
      features: ['Visual reasoning steps', 'Prolog code generation', 'Constraint satisfaction']
    },
    {
      id: 'zebra',
      title: '🦓 Zebra Puzzle',
      description: 'Classic Einstein riddle with complex logical constraints',
      difficulty: 'Expert',
      technology: 'Pure Prolog Logic',
      features: ['Multi-dimensional constraints', 'Deductive reasoning', 'Complex relationships']
    }
  ]

  return (
    <div className="puzzle-selector-container">
      <div className="selector-header">
        <h1>🧩 Logic Puzzle Collection</h1>
        <p className="selector-subtitle">
          Choose your puzzle type and explore different reasoning approaches
        </p>
      </div>

      <div className="puzzles-grid">
        {puzzles.map((puzzle) => (
          <div 
            key={puzzle.id} 
            className="puzzle-card"
            onClick={() => onPuzzleSelect(puzzle.id)}
          >
            <div className="puzzle-card-header">
              <h3>{puzzle.title}</h3>
              <span className={`difficulty-badge ${puzzle.difficulty.toLowerCase()}`}>
                {puzzle.difficulty}
              </span>
            </div>

            <p className="puzzle-description">{puzzle.description}</p>

            <div className="puzzle-technology">
              <span className="tech-label">Engine:</span>
              <span className="tech-value">{puzzle.technology}</span>
            </div>

            <div className="puzzle-features">
              <h4>Features:</h4>
              <ul>
                {puzzle.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="puzzle-card-footer">
              <button className="select-puzzle-btn">
                🚀 Start Solving
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="technology-info">
        <h2>🔧 Technology Stack</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <span className="tech-icon">⚛️</span>
            <div>
              <h4>React + TypeScript</h4>
              <p>Modern frontend with type safety</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🧠</span>
            <div>
              <h4>Prolog Logic Engine</h4>
              <p>WASM-based logical reasoning</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🎯</span>
            <div>
              <h4>Constraint Satisfaction</h4>
              <p>Backtracking & forward checking</p>
            </div>
          </div>
          <div className="tech-item">
            <span className="tech-icon">✨</span>
            <div>
              <h4>Interactive Visualization</h4>
              <p>Step-by-step problem solving</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
