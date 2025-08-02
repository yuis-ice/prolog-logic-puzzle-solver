import SWIPL, { type Module } from 'swipl-wasm'

// WASM Prolog + バックトラッキング数独ソルバーエンジン
export class PrologEngine {
  private module: Module | null = null
  private isInitialized = false

  constructor() {
    console.log('🧩 Initializing WASM Prolog engine...')
    this.initializeProlog()
  }

  private async initializeProlog() {
    try {
      this.module = await SWIPL()
      this.isInitialized = true
      console.log('✅ WASM Prolog engine initialized successfully!')
    } catch (error) {
      console.warn('⚠️ WASM Prolog initialization failed, using fallback solver:', error)
      this.isInitialized = false
    }
  }

  async loadProgram(program: string): Promise<boolean> {
    if (this.module && this.isInitialized) {
      try {
        const result = await this.module.prolog.consult_string(program)
        console.log('📝 Prolog program loaded successfully!')
        return result
      } catch (error) {
        console.error('❌ Failed to load Prolog program:', error)
        return false
      }
    } else {
      console.log('📝 Program loaded (using fallback solver)')
      return true
    }
  }

  async query(goal: string): Promise<string[]> {
    if (this.module && this.isInitialized) {
      try {
        const result = await this.module.prolog.query(goal)
        console.log('🔍 Prolog query executed:', goal, result)
        return result.answers.map(answer => JSON.stringify(answer))
      } catch (error) {
        console.error('❌ Prolog query failed:', error)
        return []
      }
    } else {
      console.log('🔍 Query executed with fallback:', goal)
      return []
    }
  }

  // Logic puzzle solver with WASM Prolog
  async solveLogicPuzzle(puzzleType: string, constraints: any): Promise<any> {
    if (this.module && this.isInitialized) {
      console.log(`🧩 Solving ${puzzleType} with WASM Prolog...`)
      
      switch (puzzleType) {
        case 'zebra':
          return await this.solveZebraPuzzle()
        case 'houses':
          return await this.solveHousesPuzzle()
        default:
          console.warn('Unknown puzzle type:', puzzleType)
          return null
      }
    } else {
      console.log(`🧩 Solving ${puzzleType} with fallback algorithm...`)
      return this.fallbackSolver(puzzleType, constraints)
    }
  }

  // Zebra puzzle solver using WASM Prolog
  private async solveZebraPuzzle(): Promise<any> {
    const zebraProgram = `
      % ゼブラパズルの論理推論
      solve(Houses) :-
        Houses = [house(norwegian, _, _, _, _), house(_, _, _, _, blue), house(_, _, milk, _, _), _, _],
        member(house(brit, _, _, _, red), Houses),
        member(house(swede, dog, _, _, _), Houses),
        member(house(dane, _, tea, _, _), Houses),
        next_to(house(_, _, _, _, green), house(_, _, _, _, white), Houses),
        member(house(_, _, coffee, _, green), Houses),
        member(house(_, bird, _, pall_mall, _), Houses),
        member(house(_, _, _, dunhill, yellow), Houses),
        next_to(house(_, _, _, blend, _), house(_, cat, _, _, _), Houses),
        next_to(house(_, horse, _, _, _), house(_, _, _, dunhill, _), Houses),
        member(house(_, _, beer, blue_master, _), Houses),
        member(house(german, _, _, prince, _), Houses),
        next_to(house(norwegian, _, _, _, _), house(_, _, _, _, blue), Houses),
        next_to(house(_, _, _, blend, _), house(_, _, water, _, _), Houses),
        member(house(_, zebra, _, _, _), Houses).

      member(X, [X|_]).
      member(X, [_|T]) :- member(X, T).

      next_to(X, Y, [X, Y|_]).
      next_to(X, Y, [Y, X|_]).
      next_to(X, Y, [_|T]) :- next_to(X, Y, T).
    `

    try {
      await this.loadProgram(zebraProgram)
      const solutions = await this.query('solve(Houses)')
      return solutions.length > 0 ? JSON.parse(solutions[0]) : null
    } catch (error) {
      console.error('Failed to solve zebra puzzle:', error)
      return null
    }
  }

  // Houses logic puzzle
  private async solveHousesPuzzle(): Promise<any> {
    const housesProgram = `
      % アリス、ボブ、チャーリーの家パズル
      solve_houses(People) :-
        People = [person(alice, House1, Color1, Pet1), 
                  person(bob, House2, Color2, Pet2), 
                  person(charlie, House3, Color3, Pet3)],
        permutation([1, 2, 3], [House1, House2, House3]),
        permutation([red, blue, green], [Color1, Color2, Color3]),
        permutation([dog, cat, bird], [Pet1, Pet2, Pet3]),
        
        % 制約条件
        ( member(person(alice, _, red, _), People) ; 
          member(person(alice, _, blue, _), People) ),
        
        member(person(bob, 2, _, _), People),
        
        ( (member(person(charlie, _, green, _), People), 
           member(person(charlie, _, _, dog), People)) ;
          (\\+ member(person(charlie, _, green, _), People), 
           \\+ member(person(charlie, _, _, dog), People)) ),
        
        \\+ (member(person(alice, _, red, dog), People)),
        
        ( member(person(_, _, blue, cat), People) ;
          member(person(_, _, blue, bird), People) ).

      permutation([], []).
      permutation([H|T], P) :- permutation(T, T1), select(H, P, T1).

      select(X, [X|T], T).
      select(X, [H|T], [H|R]) :- select(X, T, R).

      member(X, [X|_]).
      member(X, [_|T]) :- member(X, T).
    `

    try {
      await this.loadProgram(housesProgram)
      const solutions = await this.query('solve_houses(People)')
      return solutions.length > 0 ? JSON.parse(solutions[0]) : null
    } catch (error) {
      console.error('Failed to solve houses puzzle:', error)
      return this.fallbackHousesSolver()
    }
  }

  // Fallback solver for when WASM Prolog is not available
  private fallbackSolver(puzzleType: string, _constraints: any): any {
    console.log('Using JavaScript fallback solver for', puzzleType)
    
    if (puzzleType === 'houses') {
      return this.fallbackHousesSolver()
    }
    
    return null
  }

  private fallbackHousesSolver(): any {
    // Simple brute force solution for houses puzzle
    const houses = [1, 2, 3]
    const colors = ['red', 'blue', 'green']
    const pets = ['dog', 'cat', 'bird']

    // Generate all permutations and check constraints
    for (const housesPerm of this.permutations(houses)) {
      for (const colorsPerm of this.permutations(colors)) {
        for (const petsPerm of this.permutations(pets)) {
          const solution = [
            { person: 'alice', house: housesPerm[0], color: colorsPerm[0], pet: petsPerm[0] },
            { person: 'bob', house: housesPerm[1], color: colorsPerm[1], pet: petsPerm[1] },
            { person: 'charlie', house: housesPerm[2], color: colorsPerm[2], pet: petsPerm[2] }
          ]

          if (this.checkHousesConstraints(solution)) {
            return solution
          }
        }
      }
    }

    return null
  }

  private checkHousesConstraints(solution: any[]): boolean {
    const alice = solution.find(p => p.person === 'alice')
    const bob = solution.find(p => p.person === 'bob')
    const charlie = solution.find(p => p.person === 'charlie')

    // Constraint: Alice lives in a red or blue house
    if (alice.color !== 'red' && alice.color !== 'blue') return false

    // Constraint: Bob lives in house 2
    if (bob.house !== 2) return false

    // Constraint: Charlie has green house if and only if he has a dog
    const charlieHasGreen = charlie.color === 'green'
    const charlieHasDog = charlie.pet === 'dog'
    if (charlieHasGreen !== charlieHasDog) return false

    // Constraint: Alice doesn't have both red house and dog
    if (alice.color === 'red' && alice.pet === 'dog') return false

    // Constraint: The blue house has a cat or bird
    const blueHouse = solution.find(p => p.color === 'blue')
    if (blueHouse.pet === 'dog') return false

    return true
  }

  private permutations<T>(arr: T[]): T[][] {
    if (arr.length <= 1) return [arr]
    
    const result: T[][] = []
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
      const perms = this.permutations(rest)
      for (const perm of perms) {
        result.push([arr[i], ...perm])
      }
    }
    return result
  }

  async solveSudoku(puzzle: number[][]): Promise<number[][] | null> {
    console.log('🧩 Starting sudoku solving with backtracking algorithm...')
    
    // バックトラッキング数独ソルバー
    const solved = puzzle.map(row => [...row])
    
    if (this.solveSudokuRecursive(solved)) {
      console.log('✅ Sudoku solved successfully!')
      return solved
    } else {
      console.log('❌ No solution found')
      return null
    }
  }

  private solveSudokuRecursive(grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isValidPlacement(grid, row, col, num)) {
              grid[row][col] = num
              
              if (this.solveSudokuRecursive(grid)) {
                return true
              }
              
              grid[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }

  private isValidPlacement(grid: number[][], row: number, col: number, num: number): boolean {
    // 行のチェック
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false
    }

    // 列のチェック
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false
    }

    // 3x3ボックスのチェック
    const startRow = row - (row % 3)
    const startCol = col - (col % 3)

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) return false
      }
    }

    return true
  }
}
