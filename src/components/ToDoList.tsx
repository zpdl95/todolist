import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  max-width: 580px;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  grid-column-start: 2;
`;

const AddBtn = styled.button`
  border: none;
  font-size: 25px;
  background: none;
  cursor: pointer;
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.8);
  }
`;

const CateForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CateInput = styled.input`
  width: 80%;
  outline: none;
  border: none;
  font-size: 20px;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.5);
`;

const CateBtn = styled.button`
  width: 20%;
  border: none;
  font-size: 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.1s ease;
  &:active {
    transform: scale(0.8);
  }
`;

const Select = styled.select`
  border: none;
  outline: none;
  font-size: 20px;
  border-radius: 15px;
  text-align: center;
  padding: 10px 0px;
`;

const ListBox = styled.ul`
  margin: 20px 0;
`;

interface IForm {
  addCate: string;
}

function ToDoList() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [addCate, setAddCate] = useState(false);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setCategory(value as string);
  };

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ addCate }: IForm) => {
    const optionTag = document.createElement("option");
    const textNode = document.createTextNode(addCate);
    optionTag.appendChild(textNode);
    optionTag.setAttribute("value", addCate);
    selectRef.current?.appendChild(optionTag);
    setValue("addCate", "");
  };

  return (
    <Container>
      <Header>
        <Title>To Dos</Title>
        <AddBtn onClick={() => setAddCate((prev) => !prev)}>➕</AddBtn>
      </Header>
      {addCate && (
        <CateForm onSubmit={handleSubmit(onValid)}>
          <CateInput
            {...register("addCate", { required: true })}
            type="text"
            placeholder="카테고리 이름을 써주세요"
          />
          <CateBtn>Add Category</CateBtn>
        </CateForm>
      )}
      <Select ref={selectRef} value={category} onInput={onInput}>
        <option value={"TO_DO"}>To Do</option>
        <option value={"DOING"}>Doing</option>
        <option value={"DONE"}>Done</option>
      </Select>
      <CreateToDo />
      <ListBox>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ListBox>
    </Container>
  );
}

export default ToDoList;
