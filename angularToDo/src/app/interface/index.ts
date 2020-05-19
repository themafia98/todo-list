interface TodoItem {
  id: string;
  name: string;
  date: string;
  additionalNote?: string;
}

interface Day {
  id: string;
  disabled?: boolean;
  day: number;
  formated: string;
}

interface EditableNote {

}

export { TodoItem, Day, EditableNote };
