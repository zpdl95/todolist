import { atom, selector } from "recoil";

export interface IToDoState {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDoState[]>({
  key: "toDos",
  default: JSON.parse(localStorage.getItem("toDos") as string) || [],
});

/* selector = atom의 output을 변형시킴 */
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    /* recoilValue를 가져오는 get함수 */
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
