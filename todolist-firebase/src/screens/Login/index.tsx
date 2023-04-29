import { useEffect, useState } from "react";
import { DivLogin, DivLoginConfirmButton, DivLoginFormTitle, DivLoginLinkRegisterButton, LoginConfirmButton, LoginContainer, LoginForm, LoginFormHeader, LoginInput, LoginInputBox, LoginInputGroup, LoginLabel, LoginLeft, LoginLinkRegisterButton } from "./Login.styles";
import imgLogin from "assets/imgs/login.svg";
import { useUser } from 'context/user.context';
import { useNavigate } from 'react-router-dom';
import { IUserData, IUserProps } from "./Login.types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { query, collection, onSnapshot, addDoc, where, updateDoc, doc, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "libs/firebase";

const Login: React.FC<IUserProps> = ({ onSubmit }) => {

    const { saveAccess } = useUser();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<IUserData>({
        idUser: '',
        name: '',
        age: '',
        email: ''
    })

    const validateEmail = (email: string): string | undefined => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return 'O e-mail precisa ser válido';
        }
    };

    const handleChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value})
    };

    const customMessageError = (erro: string | number) => {
        const toastPosition = toast.POSITION.TOP_RIGHT
        toast.error(erro, {position: toastPosition});
    }

    const customMessageSuccess = (msg: string | number) => {
        const toastPosition = toast.POSITION.TOP_RIGHT
        toast.success(msg, {position: toastPosition});
    }

    const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const emailError = validateEmail(formData.email);

        if(emailError) {
            customMessageError(emailError);
            return
        }

        const queryTodo = query(collection(db, 'users'), where("email","==", formData.email));
      
        let userSelectedArray:any[] = [];
  
        try {
          onSnapshot(queryTodo, (querySnapshot) => {
            querySnapshot.forEach((doc)=>{
              userSelectedArray.push({...doc.data(),id: doc.id})
            })
            if(userSelectedArray.length > 0) {
                saveAccess(userSelectedArray[0].idUser);
                customMessageSuccess("Bem-vindo(a) de volta");
                setTimeout(() => {
                    navigate('/listview');    
                }, 1500);
                
            } else {
                customMessageError('Usuário não identificado, verifique se o e-mail está correto');
                return
            }
  
          })  
        } catch (error) {
          console.log(error);
        }
        
    };

    useEffect(() => {


        const userString = localStorage.getItem("jornada-todolist");
        if(userString != "" || userString != undefined){
            const idUser = atob(JSON.parse(userString || JSON.stringify("invalido")));
            
            const queryTodo = query(collection(db, 'users'), where("idUser","==", idUser));
        
            let userSelectedArray:any[] = [];
    
            try {
                onSnapshot(queryTodo, (querySnapshot) => {
                querySnapshot.forEach((doc)=>{
                    userSelectedArray.push({...doc.data(),id: doc.id})
                })
                
                if(userSelectedArray.length > 0){
                    saveAccess(userSelectedArray[0].idUser);
                    navigate('/listview');
                }
        
                })  
            } catch (error) {
                console.log(error);
                
            }

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DivLogin>
            <LoginContainer> 
                <LoginLeft>
                    <img src={imgLogin} alt="tela de login" />
                </LoginLeft>
                <LoginForm onSubmit={handleSubmit}>
                    <LoginFormHeader>
                        <DivLoginFormTitle>
                            <h1> Acesse </h1>
                        </DivLoginFormTitle>
                        <DivLoginLinkRegisterButton>
                            <LoginLinkRegisterButton href="/register">
                                Cadastre-se
                            </LoginLinkRegisterButton>
                        </DivLoginLinkRegisterButton>
                    </LoginFormHeader>
                    <LoginInputGroup>
                        <LoginInputBox>
                            <LoginLabel>E-mail</LoginLabel>
                            <LoginInput type="mail" name="email" placeholder="Informe seu e-mail cadastrado" onChange={handleChange}/>
                        </LoginInputBox>
                    </LoginInputGroup>
                    <DivLoginConfirmButton>
                        <LoginConfirmButton>Acessar</LoginConfirmButton>
                    </DivLoginConfirmButton>
                </LoginForm>
                <ToastContainer />
            </LoginContainer>
        </DivLogin>
    );
  };
  
  export default Login;
  