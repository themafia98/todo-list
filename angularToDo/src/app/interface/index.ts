interface TodoItem {
  id: string;
  name: string;
}

interface Day {
  id: string;
  disabled?: boolean;
  day: number;
}

export { TodoItem, Day };
