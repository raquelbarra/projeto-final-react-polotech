import {
  useState,
  KeyboardEvent,
  useEffect,
  useCallback,
} from "react";
import Spacer from "../../components/Spacer";
import { DivList, HeaderList, ListContainer, TodoListContainer } from "./Listview.styles";
import { ITask } from "./Listview.types";
import { useTask } from "../../context/task.contex";
import { SearchTerm } from "../../components/SearchTerm";
import TodoListItem from "../../components/TodoListItem";
import AddTaskInput from "../../components/Input";
import { useUser } from 'context/user.context';
import { useNavigate } from 'react-router-dom';
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "libs/firebase";
import imgList from "assets/imgs/list.svg";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Listview = () => {
  const { tasksFilter, addTask, updateTaskCompletion, deleteTask, Status, fetchTasks } = useTask();
  const { setUser, user } = useUser();
  const [nameUser, setNameUser] = useState("");
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const navigate = useNavigate();

  const handleExit = () => {

    MySwal.fire({
      title: 'Alerta!',
      text: "Você realmente deseja sair?",
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then((result) => {
      
      if(result.isConfirmed){
        localStorage.setItem("jornada-todolist", "");
        navigate('/');  
      }

    })
  }

  const handleNewTaskKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && newTaskLabel !== "") {
        
        MySwal.fire({
          title: 'Show!',
          text: "Você realmente deseja cadastrar?",
          icon: 'question',
          showCancelButton: true,
          showConfirmButton: true,
          showCloseButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim!',
          cancelButtonText: 'Não!'
        }).then((result) => {
          
          if(result.isConfirmed){
            addTask(newTaskLabel, user);
            setNewTaskLabel("");
            MySwal.fire({
              title: <p>Aguarde</p>,
              html: <i>A tarefa está sendo cadastrada!</i>,
              didOpen: () => {
                // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                MySwal.showLoading()
              },
            })
            setTimeout(() => {
              MySwal.fire({
                title: <p>Sucesso!</p>,
                html: <i>Tarefa cadastrada!</i>,
                icon: 'success',
                showConfirmButton:false
              })
              setTimeout(() => {
                window.parent.location = window.parent.location.href;  
              }, 2000);
            }, 1000);
          }
    
        })
        
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
    MySwal.fire({
      title: 'Alerta!',
      text: "Você realmente deseja deletar esta tarefa?",
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      showCloseButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Não!'
    }).then((result) => {
      
      if(result.isConfirmed){
        deleteTask(eachTask.id);
        MySwal.fire({
          title: <p>Aguarde</p>,
          html: <i>A tarefa está sendo deletada!</i>,
          didOpen: () => {
            // `MySwal` is a subclass of `Swal` with all the same instance & static methods
            MySwal.showLoading()
          },
        })
        setTimeout(() => {
          MySwal.fire({
            title: <p>Sucesso!</p>,
            html: <i>Tarefa deletada!</i>,
            icon: 'success',
            showConfirmButton:false
          })
          setTimeout(() => {
            window.parent.location = window.parent.location.href;  
          }, 2000);
        }, 1000);
      }

    })
  };

  const handleNewTaskLabelChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskLabel(event.target.value);
    },
    []
  );

  useEffect(() => {

    const userString = localStorage.getItem("jornada-todolist");
    if(userString != "" || userString != undefined){
        const idUser = atob(JSON.parse(userString || JSON.stringify("invalido")));
        const queryTodo = query(collection(db, 'users'), where("idUser","==", idUser));
        console.log(idUser,"teste");
        let userSelectedArray:any[] = [];

        try {
            onSnapshot(queryTodo, (querySnapshot) => {
            querySnapshot.forEach((doc)=>{
                userSelectedArray.push({...doc.data(),id: doc.id})
            })
            
            if(userSelectedArray.length == 0){
              navigate('/');
            } else {
              setUser(userSelectedArray[0].idUser);
              setNameUser(userSelectedArray[0].name);
              fetchTasks(userSelectedArray[0].idUser);
            }
    
            })  
        } catch (error) {
            console.log(error);
            
        }

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <DivList>
      <ListContainer>
        <HeaderList>
          <img src={imgList} alt="Lista" />
          <h3>Olá, {nameUser}</h3>
          <p> <span> Acompanhamento:</span> {Status} </p>
          <button onClick={() =>
            handleExit()
          }>Sair</button>
        </HeaderList>
        <SearchTerm />
        
        <TodoListContainer>
          {tasksFilter.map((eachTask) => (
            <TodoListItem
              key={eachTask.id}
              eachTask={eachTask}
              handleTaskCompleteChange={handleTaskCompleteChange}
              handleTaskDelete={handleTaskDelete}
            />
          ))}
        </TodoListContainer>
        <Spacer height={1} />
        <AddTaskInput
          placeholder="Digite a atividade e clique no enter para cadastrar"
          newTaskLabel={newTaskLabel}
          handleNewTaskLabelChange={handleNewTaskLabelChange}
          handleNewTaskKeyPress={handleNewTaskKeyPress}
        />
        
      </ListContainer>
    </DivList>
  );
};

export default Listview;
