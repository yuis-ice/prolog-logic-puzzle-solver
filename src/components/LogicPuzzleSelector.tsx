import './LogicPuzzleSelector.css'

interface LogicPuzzleSelectorProps {
  selectedPuzzle: string
  onPuzzleChange: (puzzle: string) => void
}

const LogicPuzzleSelector: React.FC<LogicPuzzleSelectorProps> = ({
  selectedPuzzle,
  onPuzzleChange
}) => {
  const puzzles = [
    { id: 'sudoku', name: '数独', description: '9x9グリッドに1-9の数字を配置' },
    { id: 'nqueens', name: 'Nクイーン問題', description: 'N個のクイーンを配置（実装予定）' },
    { id: 'zebra', name: 'ゼブラパズル', description: '論理推論パズル（実装予定）' }
  ]

  return (
    <div className="puzzle-selector">
      <h3>論理パズルを選択</h3>
      <div className="puzzle-options">
        {puzzles.map((puzzle) => (
          <div
            key={puzzle.id}
            className={`puzzle-option ${selectedPuzzle === puzzle.id ? 'selected' : ''}`}
            onClick={() => onPuzzleChange(puzzle.id)}
          >
            <h4>{puzzle.name}</h4>
            <p>{puzzle.description}</p>
            {puzzle.id !== 'sudoku' && (
              <span className="coming-soon">実装予定</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogicPuzzleSelector
