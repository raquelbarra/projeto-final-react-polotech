import { ITask } from "../../screens/Listview/Listview.types";
import Checkbox from "../Checkbox";
import Spacer from "../Spacer";
import { StyledTodoListItem } from "../../screens/Listview/Listview.styles";
import Trash from "../Trash";

interface ITodoListItem {
  eachTask: ITask;
  handleTaskCompleteChange: (
    eachTask: ITask
  ) => void;
  handleTaskDelete: (
    eachTask: ITask
  ) => void;
}

const TodoListItem = ({
  eachTask,
  handleTaskCompleteChange,
  handleTaskDelete,
}: ITodoListItem) => {
  return (
    <StyledTodoListItem key={eachTask.id} isComplete={eachTask.isComplete}>
      <Checkbox
        key={eachTask.id}
        checked={eachTask.isComplete}
        onClick={() =>
          handleTaskCompleteChange(eachTask)
        }
      />
      <Spacer width={1} />
      {eachTask.label}
      <Spacer width={1} />
      <Trash 
        onClick={() =>
          handleTaskDelete(eachTask)
        } />
      <Spacer flex={1} />
    </StyledTodoListItem>
  );
};

export default TodoListItem;
