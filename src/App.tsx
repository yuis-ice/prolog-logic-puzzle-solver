import { useState } from 'react'
import { PrologEngine } from './hooks/usePrologEngine'
import { LogicPuzzleSelector } from './components/LogicPuzzleSelector'
import SudokuSolver from './components/SudokuSolver'
import { LogicPuzzleSolver } from './components/LogicPuzzleSolver'
import './App.css'

function App() {
  const [currentPuzzle, setCurrentPuzzle] = useState<string | null>(null)
  const [prologEngine] = useState(() => new PrologEngine())

  const handlePuzzleSelect = (puzzleType: string) => {
    setCurrentPuzzle(puzzleType)
  }

  const handleBackToSelector = () => {
    setCurrentPuzzle(null)
  }

  const renderCurrentPuzzle = () => {
    switch (currentPuzzle) {
      case 'sudoku':
        return <SudokuSolver prologEngine={prologEngine} onBack={handleBackToSelector} />
      case 'logic':
        return <LogicPuzzleSolver />
      case 'zebra':
        return (
          <div className="coming-soon-page">
            <h2>🦓 Zebra Puzzle</h2>
            <p>Einstein's riddle implementation coming soon...</p>
            <button onClick={handleBackToSelector} className="back-button">
              ← Back to Selection
            </button>
          </div>
        )
      default:
        return <LogicPuzzleSelector onPuzzleSelect={handlePuzzleSelect} />
    }
  }

  return (
    <div className="app">
      <div className="app-header">
        {currentPuzzle && (
          <button onClick={handleBackToSelector} className="back-button">
            ← Back to Puzzle Selection
          </button>
        )}
      </div>
      
      <main className="app-main">
        {renderCurrentPuzzle()}
      </main>
      
      <footer className="app-footer">
        <p>🧩 Logic Puzzle App with WASM Prolog • React + TypeScript</p>
      </footer>
    </div>
  )
}

export default App
