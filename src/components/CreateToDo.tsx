import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const ToDoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToDoInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 20px;
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.5);
`;

const ErrorMessage = styled.span`
  color: red;
  margin: 20px;
  margin-top: 0px;
  text-shadow: 0 0 3px yellow;
`;

const ToDoButton = styled.button`
  text-transform: uppercase;
  width: 70%;
  background-color: skyblue;
  border-radius: 15px;
  height: 30px;
  border-color: blue;
  cursor: pointer;
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.8);
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const TODO = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  useEffect(() => {
    localStorage.setItem(toDoState.key, JSON.stringify(TODO));
  }, [TODO]);

  return (
    <ToDoForm onSubmit={handleSubmit(onValid)}>
      <ToDoInput
        {...register("toDo", { required: "할 일을 적어주세요" })}
        type="text"
        placeholder="할 일을 적어주세요"
      />
      <ErrorMessage>{errors.toDo?.message}</ErrorMessage>
      <ToDoButton>Add</ToDoButton>
    </ToDoForm>
  );
}
export default CreateToDo;
