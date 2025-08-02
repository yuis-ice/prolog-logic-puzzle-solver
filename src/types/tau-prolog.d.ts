declare module 'tau-prolog' {
  export interface Session {
    consult(program: string): void;
    query(goal: string): void;
    answer(callback: (answer: Answer) => void): void;
    answers(callback: (answer: Answer) => void): void;
  }

  export interface Answer {
    id: string;
    goal: string;
    substitution?: Substitution;
    toString(): string;
  }

  export interface Substitution {
    lookup(variable: string): any;
  }

  export function create(): Session;
}
