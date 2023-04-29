import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ITask } from "screens/Listview/Listview.types";
import { nanoid } from "nanoid";
import { query, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc, where } from "firebase/firestore";
import { db } from "libs/firebase";

interface ITaskContext {
  tasks: ITask[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  tasksFilter: ITask[];
  addTask: (label: string, user: any) => void;
  updateTaskCompletion: (taskId: string, isComplete: boolean) => void;
  deleteTask: (taskId: string) => void;
  fetchTasks: (createdUser: string) => void;
  Status: JSX.Element;
}

const TaskContext = createContext<ITaskContext>({} as ITaskContext);

interface IProps {
  children: React.ReactNode;
}

const TaskProvider = ({ children }: IProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [createdUser, setCreatedUser] = useState("");
  const [tasksFilter, setTaskFilter] = useState<ITask[]>([]);

  const fetchTasks = (user: string) => {

      setCreatedUser(createdUser);

      const queryTodo = query(collection(db, 'todos'), where("createdUser","==", user))
      
      try {
        onSnapshot(queryTodo, (querySnapshot) => {
          let todosArray:any[] = [];
          querySnapshot.forEach((doc)=>{
            todosArray.push({...doc.data(),id: doc.id})
          })
          setTasks(todosArray)
        })  
      } catch (error) {
        console.log(error)
      }

    };

  useEffect(() => {
    const listTask = tasks.filter((eachTask) =>
      eachTask.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTaskFilter(listTask);
  }, [searchTerm, tasks]);

  const addTask = async (label: string, user: string) => {
    const currentTask: ITask = { id:nanoid(), label: label, isComplete: false, createdUser: user }
    const updateTasks = [...tasks, currentTask]

    try {
      const result = await addDoc(collection(db, 'todos'),currentTask) 
      if(result) setTasks(updateTasks);
    } catch (error) {
      console.log(error);
    }

    setTasks(updateTasks);
  };

  const deleteTask = async (taskId: string) => {
    let updateTasks = [...tasks];
    updateTasks = updateTasks.filter(function(task){return task.id !== taskId});

    try {
      await deleteDoc(doc(db, 'todos', taskId)) 
    } catch (error) {
      console.log(error);
    }

    setTasks(updateTasks);
    
  };

  const updateTaskCompletion = async (taskId: string, isComplete: boolean) => {
    
    await updateDoc(doc(db, 'todos', taskId),{
      isComplete: isComplete
    })
    
    let updateTasks = [...tasks];
    
    updateTasks.forEach((element)=>{
      if(element.id === taskId) element.isComplete = isComplete
    })
    
    setTasks(updateTasks);
  };

  const Status = useMemo(() => {

    const data = tasks.reduce(
      (previous, item) => {
        if (item.isComplete === true) {
          return {
            complete: previous.complete + 1,
            progress: previous.progress,
          };
        } else {
          return {
            complete: previous.complete,
            progress: previous.progress + 1,
          };
        }
      },
      { complete: 0, progress: 0 }
    );

    return (
      <p>
        Total: {tasks.length} - Concluidas: {data.complete} - Em progresso:{" "}
        {data.progress}{" "}
      </p>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.length]);

  useEffect(() => {
    console.log("🚀🚀🚀");
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        searchTerm,
        setSearchTerm,
        tasksFilter,
        addTask,
        updateTaskCompletion,
        deleteTask,
        Status,
        fetchTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => useContext(TaskContext);

export { TaskProvider, useTask };
