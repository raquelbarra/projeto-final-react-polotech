import {
  useState,
  KeyboardEvent,
  useEffect,
  useCallback,
} from "react";
import Spacer from "../../components/Spacer";
import { Header, ListContainer, TodoListContainer } from "./Listview.styles";
import { ITask } from "./Listview.types";
import { useTask } from "../../context/task.contex";
import { SearchTerm } from "../../components/SearchTerm";
import TodoListItem from "../../components/TodoListItem";
import AddTaskInput from "../../components/Input";

const Listview = () => {
  const { tasksFilter, addTask, updateTaskCompletion, deleteTask, Status } = useTask();
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const handleNewTaskKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && newTaskLabel !== "") {
        addTask(newTaskLabel);
        setNewTaskLabel("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newTaskLabel]
  );

  const handleTaskCompleteChange = (eachTask: ITask) => {
    updateTaskCompletion(eachTask.id, !eachTask.isComplete);
    setTimeout(() => {
      window.parent.location = window.parent.location.href;  
    }, 500);
  };

  const handleTaskDelete = (eachTask: ITask) => {
    deleteTask(eachTask.id);
  };

  const handleNewTaskLabelChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskLabel(event.target.value);
    },
    []
  );

  useEffect(() => {
    console.log("\n");
    console.log("🚀 ~ file: index.tsx:33 ~ Listview");
  }, []);

  return (
    <ListContainer>
      <SearchTerm />
      <Header>
        <span>Acompanhamento:</span>
        <h4>{Status}</h4>
      </Header>
      
      <TodoListContainer>
        {tasksFilter.map((eachTask) => (
          <TodoListItem
            eachTask={eachTask}
            handleTaskCompleteChange={handleTaskCompleteChange}
            handleTaskDelete={handleTaskDelete}
          />
        ))}
      </TodoListContainer>
      <Spacer height={1} />
      <AddTaskInput
        placeholder="Adicionar atividade"
        newTaskLabel={newTaskLabel}
        handleNewTaskLabelChange={handleNewTaskLabelChange}
        handleNewTaskKeyPress={handleNewTaskKeyPress}
      />
      
    </ListContainer>
  );
};

export default Listview;
