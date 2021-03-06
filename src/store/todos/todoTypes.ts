import { Todo } from 'api/todos'
export { Todo, TodoStatus, TodoData } from 'api/todos'

export interface State {
  entities: Record<Todo['id'], Todo | undefined>;
  filters: {
    open: Todo['id'][];
    active: Todo['id'][];
    done: Todo['id'][];
  }
}

export enum ActionType {
  Fetch = 'TODOS/FETCH',
  Create = 'TODOS/CREATE',
  Edit = 'TODOS/EDIT',
  Delete = 'TODOS/DELETE'
}

export interface FetchAction {
  type: ActionType.Fetch;
  payload: Promise<Todo[]>;
}

export interface CreateAction {
  type: ActionType.Create;
  payload: Promise<Todo>;
}

export interface EditAction {
  type: ActionType.Edit;
  payload: Promise<Todo>;
}

export interface DeleteAction {
  type: ActionType.Delete;
  payload: Promise<Todo['id']>;
}

type ReducerAction<T extends { type: ActionType; payload?: any; }> = Omit<T, 'payload'> & {
  payload: T['payload'] extends Promise<infer R>
    ? R
    : T['payload']
}

export type Action = ReducerAction<FetchAction> | ReducerAction<DeleteAction> | ReducerAction<CreateAction> | ReducerAction<EditAction>;