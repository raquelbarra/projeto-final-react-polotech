import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DivRegister, DivRegisterConfirmButton, DivRegisterFormTitle, DivRegisterLinkLoginButton, RegisterConfirmButton, RegisterContainer, RegisterForm, RegisterFormHeader, RegisterInput, RegisterInputBox, RegisterInputGroup, RegisterLabel, RegisterLeft, RegisterLinkLoginButton } from "./Register.styles"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IRegisterProps, IRegisterData } from './Register.types';
import imgRegister from "assets/imgs/register.svg";
import { useUser } from 'context/user.context';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from 'libs/firebase';

const Register: React.FC<IRegisterProps> = ({ onSubmit }) => {

    const { addUser } = useUser();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<IRegisterData>({
        name: '',
        email: '',
        age: '',
    })

    const validateName = (name: string): string | undefined => {
        if(name.trim().length < 3) {
            return 'O campo nome deve ter no mínimo 03 caracteres';
        }
    };

    const validateEmail = (email: string): string | undefined => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return 'O e-mail precisa ser válido';
        }
    };

    const validateAge = (age: string): number | string | undefined => {
        const ageNumber = Number(age);
        if (isNaN(ageNumber) || ageNumber < 18) {
            return 'Você precisa ter mais de 18 anos para entrar';
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

        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const ageError = validateAge(formData.age);

        if(nameError) { 
            customMessageError(nameError);
            return
        }

        if(emailError) {
            customMessageError(emailError);
            return
        }

        if(ageError) {
            customMessageError(ageError);
            return
        }

        addUser(formData.name, formData.email, formData.age);
        customMessageSuccess("Seja bem-vindo(a)");
        setTimeout(() => {
            navigate('/listview');    
        }, 1000);
        
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
                    customMessageSuccess("Bem-vindo(a) de volta");
                    setTimeout(() => {
                        navigate('/listview');    
                    }, 1500);
                }
        
                })  
            } catch (error) {
                console.log(error);
                
            }

        }


    }, []);

    return (
        <>
            <DivRegister>
                <RegisterContainer> 
                    <RegisterLeft>
                        <img src={imgRegister} alt="tela de Register" />
                    </RegisterLeft>
                    <RegisterForm  onSubmit={handleSubmit}>
                        <RegisterFormHeader>
                            <DivRegisterFormTitle>
                                <h1> Cadastre-se </h1>
                            </DivRegisterFormTitle>
                            <DivRegisterLinkLoginButton>
                                <RegisterLinkLoginButton href='/'>
                                    Acesse
                                </RegisterLinkLoginButton>
                            </DivRegisterLinkLoginButton>
                        </RegisterFormHeader>
                        <RegisterInputGroup>
                            <RegisterInputBox>
                                <RegisterLabel>Nome</RegisterLabel>
                                <RegisterInput type="text" name="name" placeholder="Informe seu nome para cadastro" value={formData.name} onChange={handleChange}/>
                            </RegisterInputBox>

                            <RegisterInputBox>
                                <RegisterLabel>E-mail</RegisterLabel>
                                <RegisterInput type="mail" name="email" placeholder="Informe sua idade para cadastro" value={formData.email} onChange={handleChange}/>
                            </RegisterInputBox>

                            <RegisterInputBox>
                                <RegisterLabel>Idade</RegisterLabel>
                                <RegisterInput type="number" name="age" placeholder="Informe sua idade para cadastrado (à partir de 18)" pattern="[0-9]+" value={formData.age} onChange={handleChange} />
                            </RegisterInputBox>
                        </RegisterInputGroup>
                        <DivRegisterConfirmButton>
                            <RegisterConfirmButton>Cadastrar</RegisterConfirmButton>
                        </DivRegisterConfirmButton>
                    </RegisterForm>
                    <ToastContainer />
                </RegisterContainer>
            </DivRegister>
        </>   
    );
  };
  
  export default Register;
  
