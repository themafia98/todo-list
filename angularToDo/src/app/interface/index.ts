interface TodoItem {
  id: string;
  uid: string;
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

interface EditableNote {}

interface User {
  email: string;
  password: string;
}

interface UserExist extends User {
  uid: string;
}

export { TodoItem, Day, EditableNote, User, UserExist };
