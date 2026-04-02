export type ColumnId = 'backlog' | 'ready' | 'inProgress' | 'finished';

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: ColumnId;
}

export interface Column {
  id: ColumnId;
  title: string;
}
