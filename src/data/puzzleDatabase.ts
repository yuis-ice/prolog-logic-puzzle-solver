// 論理パズル問題データベース
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
    title: 'アリス、ボブ、チャーリーの家パズル',
    description: `3人の人がいます：アリス、ボブ、チャーリー
3つの家があります：1番、2番、3番
3つの色があります：赤、青、緑
3匹のペットがいます：犬、猫、鳥`,
    constraints: [
      'アリスは赤い家か青い家に住んでいる',
      'ボブは2番の家に住んでいる',
      'チャーリーは緑の家に住んでいる場合のみ犬を飼っている',
      'アリスは赤い家に住んでいて犬を飼ってはいない',
      '青い家の住人は猫か鳥を飼っている'
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
    title: '学校のクラブ活動パズル',
    description: `4人の学生がいます：田中、佐藤、鈴木、高橋
4つのクラブがあります：サッカー、テニス、野球、バスケ
4つの学年があります：1年、2年、3年、4年
4つの好きな科目があります：数学、英語、理科、社会`,
    constraints: [
      '田中はサッカー部で数学が好き',
      '2年生はテニス部に所属している',
      '鈴木は理科が好きで3年生',
      '野球部の人は英語が好き',
      '高橋は1年生ではない',
      'バスケ部の人は社会が好き'
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
% 学校のクラブ活動パズル
solve_clubs(Students) :-
  Students = [student(tanaka, Club1, Grade1, Subject1),
              student(sato, Club2, Grade2, Subject2),
              student(suzuki, Club3, Grade3, Subject3),
              student(takahashi, Club4, Grade4, Subject4)],
  
  permutation([soccer, tennis, baseball, basketball], [Club1, Club2, Club3, Club4]),
  permutation(['1st', '2nd', '3rd', '4th'], [Grade1, Grade2, Grade3, Grade4]),
  permutation([math, english, science, social], [Subject1, Subject2, Subject3, Subject4]),
  
  % 制約条件
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
    title: 'フルーツマーケットパズル',
    description: `3つの果物店があります：A店、B店、C店
3種類の果物があります：りんご、バナナ、オレンジ
3つの価格帯があります：安い、普通、高い
3つの産地があります：国内、アジア、アメリカ`,
    constraints: [
      'A店は国内産の果物を扱っている',
      'バナナは普通の価格で売られている',
      'オレンジを扱う店は高い価格設定',
      'アジア産の果物は安い価格',
      'C店はりんごを扱っていない',
      'アメリカ産の果物は1つの店のみ'
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
% フルーツマーケットパズル
solve_market(Stores) :-
  Stores = [store(storeA, Fruit1, Price1, Origin1),
            store(storeB, Fruit2, Price2, Origin2),
            store(storeC, Fruit3, Price3, Origin3)],
  
  permutation([apple, banana, orange], [Fruit1, Fruit2, Fruit3]),
  permutation([cheap, normal, expensive], [Price1, Price2, Price3]),
  permutation([domestic, asia, america], [Origin1, Origin2, Origin3]),
  
  % 制約条件
  member(store(storeA, _, _, domestic), Stores),
  member(store(_, banana, normal, _), Stores),
  member(store(_, orange, expensive, _), Stores),
  member(store(_, _, cheap, asia), Stores),
  \\+ member(store(storeC, apple, _, _), Stores),
  % アメリカ産は1つの店のみ（暗黙的に満たされる）
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
    title: 'オフィス勤務パズル',
    description: `4人の社員がいます：山田、田村、中村、小林
4つの部署があります：営業、開発、経理、人事
4つの勤務年数があります：1年、3年、5年、10年
4つの趣味があります：読書、映画、スポーツ、料理`,
    constraints: [
      '山田は開発部で5年の経験',
      '営業部の人は読書が趣味',
      '田村は料理が趣味で10年の経験',
      '1年の経験の人は人事部',
      '中村はスポーツが趣味',
      '経理部の人は3年の経験',
      '映画が趣味の人は営業部ではない'
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
% オフィス勤務パズル
solve_office(Workers) :-
  Workers = [worker(yamada, Dept1, Exp1, Hobby1),
             worker(tamura, Dept2, Exp2, Hobby2),
             worker(nakamura, Dept3, Exp3, Hobby3),
             worker(kobayashi, Dept4, Exp4, Hobby4)],
  
  permutation([sales, development, accounting, hr], [Dept1, Dept2, Dept3, Dept4]),
  permutation(['1year', '3years', '5years', '10years'], [Exp1, Exp2, Exp3, Exp4]),
  permutation([reading, movies, sports, cooking], [Hobby1, Hobby2, Hobby3, Hobby4]),
  
  % 制約条件
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
    title: 'レストランメニューパズル',
    description: `3つのレストランがあります：イタリアン、和食、中華
3つの料理があります：パスタ、寿司、ラーメン
3つの価格があります：1000円、1500円、2000円
3つの営業時間があります：昼のみ、夜のみ、終日`,
    constraints: [
      'イタリアンレストランは終日営業',
      'パスタは1500円',
      '和食レストランは2000円のメニューがある',
      'ラーメンは昼のみ営業の店で提供',
      '1000円のメニューは夜のみ営業の店',
      '中華レストランは寿司を提供しない'
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
% レストランメニューパズル
solve_restaurant(Restaurants) :-
  Restaurants = [restaurant(italian, Dish1, Price1, Hours1),
                 restaurant(japanese, Dish2, Price2, Hours2),
                 restaurant(chinese, Dish3, Price3, Hours3)],
  
  permutation([pasta, sushi, ramen], [Dish1, Dish2, Dish3]),
  permutation(['1000yen', '1500yen', '2000yen'], [Price1, Price2, Price3]),
  permutation([lunch_only, dinner_only, all_day], [Hours1, Hours2, Hours3]),
  
  % 制約条件
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

// パズル生成用のテンプレート
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
    name: '古典的な割り当て問題',
    variables: {
      entities: 3,
      attributeTypes: 3,
      attributeValues: 3
    },
    constraintPatterns: [
      '{entity} は {attribute1} を持つ',
      '{entity} は {attribute2} ではない',
      '{attribute1} を持つ人は {attribute3} も持つ',
      '{value1} と {value2} は同じエンティティに属さない'
    ]
  },
  {
    id: 'conditional_logic',
    name: '条件論理問題',
    variables: {
      entities: 4,
      attributeTypes: 3,
      attributeValues: 4
    },
    constraintPatterns: [
      'もし {entity} が {attribute1} なら {attribute2} である',
      '{attribute1} でない場合のみ {attribute3} である',
      '{value1} または {value2} のいずれか',
      '{entity} と {entity2} は異なる {attribute} を持つ'
    ]
  }
]
