import { useState } from 'react'
import { PrologEngine } from '../hooks/usePrologEngine'
import './SudokuSolver.css'

interface SudokuSolverProps {
  prologEngine: PrologEngine
  onBack?: () => void
}

const SudokuSolver: React.FC<SudokuSolverProps> = ({ prologEngine, onBack }) => {
  const [grid, setGrid] = useState<number[][]>(() => {
    // 解決可能な数独パズル（簡単）
    return [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ]
  })

  const [isLoading, setIsLoading] = useState(false)
  const [solution, setSolution] = useState<number[][] | null>(null)

  const handleCellChange = (row: number, col: number, value: string) => {
    const numValue = parseInt(value) || 0
    if (numValue >= 0 && numValue <= 9) {
      const newGrid = grid.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? numValue : c))
      )
      setGrid(newGrid)
      setSolution(null)
    }
  }

  const solvePuzzle = async () => {
    setIsLoading(true)
    try {
      const result = await prologEngine.solveSudoku(grid)
      setSolution(result)
    } catch (error) {
      console.error('Solving error:', error)
      alert('パズルの解決中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  const resetPuzzle = () => {
    setGrid([
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ])
    setSolution(null)
  }

  const clearGrid = () => {
    setGrid(Array(9).fill(null).map(() => Array(9).fill(0)))
    setSolution(null)
  }

  const displayGrid = solution || grid

  return (
    <div className="sudoku-solver">
      {onBack && (
        <div className="puzzle-header">
          <button onClick={onBack} className="back-button">
            ← Back to Selection
          </button>
        </div>
      )}
      
      <h2>🔢 Sudoku Solver</h2>
      <p>Backtracking algorithm for solving 9x9 Sudoku puzzles</p>
      
      <div className="sudoku-grid">
        {displayGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="number"
                min="0"
                max="9"
                value={cell === 0 ? '' : cell.toString()}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className={`sudoku-cell ${
                  solution ? 'solved' : ''
                } ${
                  grid[rowIndex][colIndex] !== 0 ? 'given' : 'empty'
                }`}
                disabled={isLoading}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="controls">
        <button 
          onClick={solvePuzzle} 
          disabled={isLoading}
          className="solve-button"
        >
          {isLoading ? '解決中...' : 'パズルを解く'}
        </button>
        
        <button 
          onClick={resetPuzzle} 
          disabled={isLoading}
          className="reset-button"
        >
          リセット
        </button>
        
        <button 
          onClick={clearGrid} 
          disabled={isLoading}
          className="clear-button"
        >
          全てクリア
        </button>
      </div>

      {solution && (
        <div className="solution-info">
          <p>✅ パズルが解決されました！</p>
        </div>
      )}
    </div>
  )
}

export default SudokuSolver
