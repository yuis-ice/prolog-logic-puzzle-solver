declare module 'swipl-wasm' {
  export interface Module {
    prolog: {
      query(goal: string): Promise<QueryResult>
      call(goal: string): Promise<boolean>
      assertz(fact: string): Promise<boolean>
      retract(fact: string): Promise<boolean>
      consult_string(program: string): Promise<boolean>
    }
    
    FS: {
      writeFile(filename: string, content: string): void
      readFile(filename: string): Uint8Array
    }
  }

  export interface QueryResult {
    success: boolean
    answers: Answer[]
  }

  export interface Answer {
    [variable: string]: any
  }

  export default function SWIPL(options?: any): Promise<Module>
}
