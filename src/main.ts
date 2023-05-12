// easy
1
type MyPick<T, K extends keyof T> = {
  [k in K]: T[k]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo1: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
// ------------------------------------------
2
type MyReadonly<T> = {
  readonly [k in keyof T]: T[k]
}

interface Todo2 {
  title: string
  description: string
}

const todo2: MyReadonly<Todo2> = {
  title: "Hey",
  description: "foobar"
}

todo2.title = "Hello" // Error: cannot reassign a readonly property

// ---------------------------------------------
3
type TupleToObject<T extends readonly string[]> = {
  [k in T[number]]: k
}
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> 

// ---------------------------------------------
type First<T extends any[]> = T[0]
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> 

// ---------------------------------------------
type Length<T extends any[]> = T['length'] 
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX>

// ---------------------------------------------
type MyExclude<T, K> = T extends K ? never : T
type Result = MyExclude<'a' | 'b' | 'c', 'a'>

// ---------------------------------------------
type MyAwaited<T> = T extends Promise<infer U> ? U : never
type ExampleType = Promise<string>

type Result2 = MyAwaited<ExampleType> 

// ---------------------------------------------
type If<C extends boolean, T, F> = C extends true ? T : F
type A = If<true, 'a', 'b'> 
type B = If<false, 'a', 'b'> 

// ---------------------------------------------
type Concat<T extends unknown[], K extends unknown[]> = [...T, ...K]
type Result3 = Concat<[1], [31,132,321123,321]>

// ---------------------------------------------
type MyIncludes<T extends readonly unknown[], K> = K extends T[number] ? true : false
type isPillarMen = MyIncludes<['Kars', 'Esidisi', 'Wamuu', 'Santana', 'Dio'], 'Dio'>

// ---------------------------------------------
type Push<T extends readonly unknown[], U> = [...T, U]
type Result4 = Push<[1, 2], '3'> 

// ---------------------------------------------
type Unshift<T extends readonly unknown[], U> = [U, ...T]
type Result5 = Unshift<[1, 2], 0>

// ---------------------------------------------
type MyParameters<T extends (...args: any[]) => unknown> = T extends (...arg: infer U) => unknown ? U : never
const foo = (arg1: string, arg2: number): void => {}
type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]

