import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "../atoms";

const Container = styled.li`
  background-color: white;
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 10px 20px;
  border-radius: 15px;
  word-break: break-all;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const Text = styled.span`
  font-size: 20px;
`;

const ButtonArea = styled.div``;

const Button = styled.button`
  border: none;
  background-color: skyblue;
  border-radius: 30px;
  font-size: 15px;
  margin: 0 5px;
  cursor: pointer;
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.8);
  }
`;

function ToDo({ text, category, id }: IToDoState) {
  const setToDos = useSetRecoilState(toDoState);

  /* typescript에서 event의 type을 지정하는 방법 */
  /* React.EventName<HTMLElementName> */
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as string };
      const newToDos = [...oldToDos];
      newToDos[targetIndex] = newToDo;
      return newToDos;
    });
  };

  const onClickDelete = () => {
    setToDos((oldToDos) => {
      return oldToDos.filter((toDo) => toDo.id !== id);
    });
  };
  return (
    <Container>
      <Text>{text}</Text>
      <ButtonArea>
        {category !== "TO_DO" && (
          <Button name={"TO_DO"} onClick={onClick}>
            To Do
          </Button>
        )}
        {category !== "DOING" && (
          <Button name={"DOING"} onClick={onClick}>
            Doing
          </Button>
        )}
        {category !== "DONE" && (
          <Button name={"DONE"} onClick={onClick}>
            Done
          </Button>
        )}
        <Button onClick={onClickDelete}>❌</Button>
      </ButtonArea>
    </Container>
  );
}
export default ToDo;
