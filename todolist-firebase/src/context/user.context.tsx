import React, {
  Dispatch,
  SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { IUserData } from "screens/Login/Login.types";
  import { nanoid } from "nanoid";
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "libs/firebase";
  
  
  interface IUserContext {
    user: IUserData[];
    addUser: (name: string, email: string, age: string) => void;
    saveAccess: (id: string) => void;
    setUser: Dispatch<SetStateAction<IUserData[]>>;
  }
  
  const UserContext = createContext<IUserContext>({} as IUserContext);
  
  interface IProps {
    children: React.ReactNode;
  }
  
  const UserProvider = ({ children }: IProps) => {
    const [user, setUser] = useState<IUserData[]>([]);
  
    const addUser = async (name: string, email: string, age: string) => {
        const idUser = nanoid();
        const currentUser: IUserData = { idUser:idUser, name: name, email: email, age: age }
        const newUser = [currentUser]
        try {
            await addDoc(collection(db, 'users'),currentUser) 
        } catch (error) {
            console.log(error);
        }

        saveAccess(idUser);
        setUser(newUser);
    };

    const saveAccess = (id: string) => {
      const transformId = btoa(id);
      const userString = JSON.stringify(transformId);
      localStorage.setItem("jornada-todolist", userString);
    };
  
    useEffect(() => {
      console.log("🚀🚀🚀");
    }, []);
  
    return (
      <UserContext.Provider
        value={{
          user,
          setUser,
          addUser,
          saveAccess
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  const useUser = () => useContext(UserContext);
  
  export { UserProvider, useUser };
  