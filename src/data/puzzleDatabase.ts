// Logic Puzzle Problem Database
export interface PuzzleProblem {
  id: string
  title: string
  description: string
  constraints: string[]
  variables: {
    people: string[]
    attributes: {
      [key: string]: string[]
    }
  }
  prologCode: string
  solution: any
  difficulty: 'easy' | 'medium' | 'hard'
}

export const puzzleDatabase: PuzzleProblem[] = [
  {
    id: 'houses_basic',
    title: 'Alice, Bob, and Charlie Houses Puzzle',
    description: `Three people: Alice, Bob, Charlie
Three houses: 1st, 2nd, 3rd
Three colors: Red, Blue, Green
Three pets: Dog, Cat, Bird`,
    constraints: [
      'Alice lives in either a red or blue house',
      'Bob lives in house number 2',
      'Charlie has a dog only if he lives in a green house',
      'Alice lives in a red house and does not have a dog',
      'The person in the blue house has either a cat or bird'
    ],
    variables: {
      people: ['alice', 'bob', 'charlie'],
      attributes: {
        house: ['1', '2', '3'],
        color: ['red', 'blue', 'green'],
        pet: ['dog', 'cat', 'bird']
      }
    },
    prologCode: `
% Alice, Bob, and Charlie Houses Puzzle
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
    `,
    solution: [
      { person: 'alice', house: 1, color: 'blue', pet: 'bird' },
      { person: 'bob', house: 2, color: 'red', pet: 'cat' },
      { person: 'charlie', house: 3, color: 'green', pet: 'dog' }
    ],
    difficulty: 'medium'
  },

  {
    id: 'school_clubs',
    title: 'School Club Activities Puzzle',
    description: `Four students: Tanaka, Sato, Suzuki, Takahashi
Four clubs: Soccer, Tennis, Baseball, Basketball
Four grades: 1st year, 2nd year, 3rd year, 4th year
Four favorite subjects: Math, English, Science, Social Studies`,
    constraints: [
      'Tanaka is in the soccer club and likes math',
      'The 2nd year student is in the tennis club',
      'Suzuki likes science and is a 3rd year student',
      'The baseball club member likes English',
      'Takahashi is not a 1st year student',
      'The basketball club member likes social studies'
    ],
    variables: {
      people: ['tanaka', 'sato', 'suzuki', 'takahashi'],
      attributes: {
        club: ['soccer', 'tennis', 'baseball', 'basketball'],
        grade: ['1st', '2nd', '3rd', '4th'],
        subject: ['math', 'english', 'science', 'social']
      }
    },
    prologCode: `
% School Club Activities Puzzle
solve_clubs(Students) :-
  Students = [student(tanaka, Club1, Grade1, Subject1),
              student(sato, Club2, Grade2, Subject2),
              student(suzuki, Club3, Grade3, Subject3),
              student(takahashi, Club4, Grade4, Subject4)],
  
  permutation([soccer, tennis, baseball, basketball], [Club1, Club2, Club3, Club4]),
  permutation(['1st', '2nd', '3rd', '4th'], [Grade1, Grade2, Grade3, Grade4]),
  permutation([math, english, science, social], [Subject1, Subject2, Subject3, Subject4]),
  
  % Constraint conditions
  member(student(tanaka, soccer, _, math), Students),
  member(student(_, tennis, '2nd', _), Students),
  member(student(suzuki, _, '3rd', science), Students),
  member(student(_, baseball, _, english), Students),
  \\+ member(student(takahashi, _, '1st', _), Students),
  member(student(_, basketball, _, social), Students).
    `,
    solution: [
      { person: 'tanaka', club: 'soccer', grade: '4th', subject: 'math' },
      { person: 'sato', club: 'tennis', grade: '2nd', subject: 'social' },
      { person: 'suzuki', club: 'baseball', grade: '3rd', subject: 'science' },
      { person: 'takahashi', club: 'basketball', grade: '1st', subject: 'english' }
    ],
    difficulty: 'hard'
  },

  {
    id: 'fruit_market',
    title: 'Fruit Market Puzzle',
    description: `Three fruit stores: Store A, Store B, Store C
Three types of fruits: Apple, Banana, Orange
Three price ranges: Cheap, Normal, Expensive
Three origins: Domestic, Asian, American`,
    constraints: [
      'Store A sells domestic fruits',
      'Bananas are sold at normal price',
      'The store selling oranges has expensive pricing',
      'Asian fruits are sold at cheap prices',
      'Store C does not sell apples',
      'American fruits are sold by only one store'
    ],
    variables: {
      people: ['storeA', 'storeB', 'storeC'],
      attributes: {
        fruit: ['apple', 'banana', 'orange'],
        price: ['cheap', 'normal', 'expensive'],
        origin: ['domestic', 'asia', 'america']
      }
    },
    prologCode: `
% Fruit Market Puzzle
solve_market(Stores) :-
  Stores = [store(storeA, Fruit1, Price1, Origin1),
            store(storeB, Fruit2, Price2, Origin2),
            store(storeC, Fruit3, Price3, Origin3)],
  
  permutation([apple, banana, orange], [Fruit1, Fruit2, Fruit3]),
  permutation([cheap, normal, expensive], [Price1, Price2, Price3]),
  permutation([domestic, asia, america], [Origin1, Origin2, Origin3]),
  
  % Constraint conditions
  member(store(storeA, _, _, domestic), Stores),
  member(store(_, banana, normal, _), Stores),
  member(store(_, orange, expensive, _), Stores),
  member(store(_, _, cheap, asia), Stores),
  \\+ member(store(storeC, apple, _, _), Stores),
  % American fruits are sold by only one store (implicitly satisfied)
  member(store(_, _, _, america), Stores).
    `,
    solution: [
      { store: 'storeA', fruit: 'apple', price: 'expensive', origin: 'domestic' },
      { store: 'storeB', fruit: 'banana', price: 'normal', origin: 'america' },
      { store: 'storeC', fruit: 'orange', price: 'cheap', origin: 'asia' }
    ],
    difficulty: 'easy'
  },

  {
    id: 'office_workers',
    title: 'Office Workers Puzzle',
    description: `Four employees: Yamada, Tamura, Nakamura, Kobayashi
Four departments: Sales, Development, Accounting, HR
Four years of experience: 1 year, 3 years, 5 years, 10 years
Four hobbies: Reading, Movies, Sports, Cooking`,
    constraints: [
      'Yamada is in development department with 5 years experience',
      'The sales department person likes reading',
      'Tamura likes cooking and has 10 years experience',
      'The person with 1 year experience is in HR department',
      'Nakamura likes sports',
      'The accounting department person has 3 years experience',
      'The person who likes movies is not in sales department'
    ],
    variables: {
      people: ['yamada', 'tamura', 'nakamura', 'kobayashi'],
      attributes: {
        department: ['sales', 'development', 'accounting', 'hr'],
        experience: ['1year', '3years', '5years', '10years'],
        hobby: ['reading', 'movies', 'sports', 'cooking']
      }
    },
    prologCode: `
% Office Workers Puzzle
solve_office(Workers) :-
  Workers = [worker(yamada, Dept1, Exp1, Hobby1),
             worker(tamura, Dept2, Exp2, Hobby2),
             worker(nakamura, Dept3, Exp3, Hobby3),
             worker(kobayashi, Dept4, Exp4, Hobby4)],
  
  permutation([sales, development, accounting, hr], [Dept1, Dept2, Dept3, Dept4]),
  permutation(['1year', '3years', '5years', '10years'], [Exp1, Exp2, Exp3, Exp4]),
  permutation([reading, movies, sports, cooking], [Hobby1, Hobby2, Hobby3, Hobby4]),
  
  % Constraint conditions
  member(worker(yamada, development, '5years', _), Workers),
  member(worker(_, sales, _, reading), Workers),
  member(worker(tamura, _, '10years', cooking), Workers),
  member(worker(_, hr, '1year', _), Workers),
  member(worker(nakamura, _, _, sports), Workers),
  member(worker(_, accounting, '3years', _), Workers),
  \\+ member(worker(_, sales, _, movies), Workers).
    `,
    solution: [
      { person: 'yamada', department: 'development', experience: '5years', hobby: 'movies' },
      { person: 'tamura', department: 'sales', experience: '10years', hobby: 'cooking' },
      { person: 'nakamura', department: 'hr', experience: '1year', hobby: 'sports' },
      { person: 'kobayashi', department: 'accounting', experience: '3years', hobby: 'reading' }
    ],
    difficulty: 'hard'
  },

  {
    id: 'restaurant_menu',
    title: 'Restaurant Menu Puzzle',
    description: `Three restaurants: Italian, Japanese, Chinese
Three dishes: Pasta, Sushi, Ramen
Three prices: 1000 yen, 1500 yen, 2000 yen
Three operating hours: Lunch only, Dinner only, All day`,
    constraints: [
      'Italian restaurant operates all day',
      'Pasta costs 1500 yen',
      'Japanese restaurant has a 2000 yen menu item',
      'Ramen is served at lunch-only restaurant',
      '1000 yen menu is at dinner-only restaurant',
      'Chinese restaurant does not serve sushi'
    ],
    variables: {
      people: ['italian', 'japanese', 'chinese'],
      attributes: {
        dish: ['pasta', 'sushi', 'ramen'],
        price: ['1000yen', '1500yen', '2000yen'],
        hours: ['lunch_only', 'dinner_only', 'all_day']
      }
    },
    prologCode: `
% Restaurant Menu Puzzle
solve_restaurant(Restaurants) :-
  Restaurants = [restaurant(italian, Dish1, Price1, Hours1),
                 restaurant(japanese, Dish2, Price2, Hours2),
                 restaurant(chinese, Dish3, Price3, Hours3)],
  
  permutation([pasta, sushi, ramen], [Dish1, Dish2, Dish3]),
  permutation(['1000yen', '1500yen', '2000yen'], [Price1, Price2, Price3]),
  permutation([lunch_only, dinner_only, all_day], [Hours1, Hours2, Hours3]),
  
  % Constraint conditions
  member(restaurant(italian, _, _, all_day), Restaurants),
  member(restaurant(_, pasta, '1500yen', _), Restaurants),
  member(restaurant(japanese, _, '2000yen', _), Restaurants),
  member(restaurant(_, ramen, _, lunch_only), Restaurants),
  member(restaurant(_, _, '1000yen', dinner_only), Restaurants),
  \\+ member(restaurant(chinese, sushi, _, _), Restaurants).
    `,
    solution: [
      { restaurant: 'italian', dish: 'pasta', price: '1500yen', hours: 'all_day' },
      { restaurant: 'japanese', dish: 'sushi', price: '2000yen', hours: 'dinner_only' },
      { restaurant: 'chinese', dish: 'ramen', price: '1000yen', hours: 'lunch_only' }
    ],
    difficulty: 'medium'
  }
]

// Puzzle generation templates
export interface PuzzleTemplate {
  id: string
  name: string
  variables: {
    entities: number
    attributeTypes: number
    attributeValues: number
  }
  constraintPatterns: string[]
}

export const puzzleTemplates: PuzzleTemplate[] = [
  {
    id: 'classic_assignment',
    name: 'Classic Assignment Problem',
    variables: {
      entities: 3,
      attributeTypes: 3,
      attributeValues: 3
    },
    constraintPatterns: [
      '{entity} has {attribute1}',
      '{entity} is not {attribute2}',
      'Person with {attribute1} also has {attribute3}',
      '{value1} and {value2} do not belong to the same entity'
    ]
  },
  {
    id: 'conditional_logic',
    name: 'Conditional Logic Problem',
    variables: {
      entities: 4,
      attributeTypes: 3,
      attributeValues: 4
    },
    constraintPatterns: [
      'If {entity} has {attribute1} then {attribute2}',
      'Only if not {attribute1} then {attribute3}',
      'Either {value1} or {value2}',
      '{entity} and {entity2} have different {attribute}'
    ]
  }
]
