import styled from "styled-components";

export const DivList = styled.div`
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #282c34;
`;

export const HeaderList = styled.div`
    background: #bf8373;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 20px;

    & img {
      width: 5rem;
    }

    & span {
      font-weight: 600;
    }

    & button {
      border: none;
      background-color: #ffc93f;
      padding: 0.62rem;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
    }

    @media (max-width: 1064px) {
        flex-direction: column;
    }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 80%;
  height: 80vh;
`;

export const TodoListContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  background: #bf8373;
  border-radius: 1rem;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  max-height: 60%;
  overflow-y: auto;
  ::-webkit-scrollbar-track {
    background-color: #F4F4F4;
  }
  ::-webkit-scrollbar {
      width: 15px;
      background: #F4F4F4;
  }
  ::-webkit-scrollbar-thumb {
      background: #dad7d7;
  }

  @media (max-width: 1064px) {
    max-height: 80% !important;
  }

`;

interface ITodoListItemProps {
  isComplete: boolean;
}

export const StyledTodoListItem = styled.label<ITodoListItemProps>`
  display: flex;
  padding: 0.5rem 0;
  align-items: center;
  font-size: 1.2rem;
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
  text-decoration-color: #fff;
`;

export const StyledInput = styled.input`
  background: black;
  border: none;
  border-radius: 15px;
  color: #fff;
  padding: 20px 24px;
`;
