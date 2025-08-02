import { useState, useCallback } from 'react'
import { PrologEngine } from './hooks/usePrologEngine'
import SudokuSolver from './components/SudokuSolver'
import LogicPuzzleSelector from './components/LogicPuzzleSelector'
import './App.css'

function App() {
  const [selectedPuzzle, setSelectedPuzzle] = useState<string>('sudoku')
  const prologEngine = new PrologEngine()

  const handlePuzzleChange = useCallback((puzzle: string) => {
    setSelectedPuzzle(puzzle)
  }, [])

  const renderPuzzle = () => {
    switch (selectedPuzzle) {
      case 'sudoku':
        return <SudokuSolver prologEngine={prologEngine} />
      default:
        return <div>パズルを選択してください</div>
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Prolog論理パズルソルバー</h1>
        <p>Tau PrologとWASMを使った論理パズル解決アプリ</p>
      </header>
      
      <main className="app-main">
        <LogicPuzzleSelector 
          selectedPuzzle={selectedPuzzle}
          onPuzzleChange={handlePuzzleChange}
        />
        
        <div className="puzzle-container">
          {renderPuzzle()}
        </div>
      </main>
    </div>
  )
}

export default App
