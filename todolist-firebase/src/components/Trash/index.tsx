import styled, { StyledComponent } from "styled-components";
import { ComponentProps } from "react";

const TrashContainer = styled.button`
  vertical-align: middle;
  height: 25px;
  background: none;
  margin: 0;
  padding: 0;
  border: 0;
  cursor: pointer;
`;

const TrashTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1px;
`;

const TrashTopStart = styled.div`
  width: 10px;
  height: 2px;
  background: #FFC93F;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

const TrashTopEnd = styled.div`
  width: 20px;
  height: 4px;
  background: #FFC93F;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;


const TrashBase = styled.div`
  width: 20px;
  height: 17px;
  background: #FFC93F;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
`;

type Props = ComponentProps<StyledComponent<"button", {}>>;

const Trash = ({...props }: Props) => {
    return (
        <TrashContainer {...props} type="button" >
          <TrashTopContainer>
              <TrashTopStart/><TrashTopEnd/>
          </TrashTopContainer>
          <TrashBase/>
        </TrashContainer>
    );
};

export default Trash;