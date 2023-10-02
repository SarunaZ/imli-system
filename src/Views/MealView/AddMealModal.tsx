import React from "react";
import { useMutation } from "@apollo/client";
import withModal, { ModalProps } from "HOC/withModal";
import { SyntheticEvent, useRef } from "react";
import IngredientContainer from "./IngredientContainer";
import { IngredientsInput } from "./types";
import style from "./style.scss";
import Input from "Components/Input";
import { MEAL_NAME_MUTATION } from "Schema/mutations/mealMutations";
import useState from "Hooks/useState";

interface Props extends ModalProps {
  onChange: () => void;
}

interface State {
  addSuccessful: boolean;
}

const AddMealModal = ({ onChange }: Props) => {
  const [state, setState] = useState<State>({
    addSuccessful: false,
  });
  const mealInputRef = useRef<HTMLInputElement>(null);
  const ingredientInputRef = useRef<IngredientsInput[]>();
  const [addMealQ, addMealQData] = useMutation(MEAL_NAME_MUTATION, {
    errorPolicy: "all",
  });

  const setInputData = (data: IngredientsInput[]) => {
    ingredientInputRef.current = data;
  };

  const submitProduct = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMealQ({
      variables: {
        name: mealInputRef.current?.value,
        ingredients: ingredientInputRef.current,
      },
      update: () => {
        onChange();
        setState({ addSuccessful: true });
      },
    });
  };

  if (state.addSuccessful) {
    return (
      <div>
        <p>Meal has been succesfully added!</p>
      </div>
    );
  }

  return (
    <form className={style.addMealModalWrapper} onSubmit={submitProduct}>
      <Input required ref={mealInputRef} label="Meal name" name="productName" />
      <IngredientContainer
        error={addMealQData?.error}
        isLoading={addMealQData.loading}
        inputData={setInputData}
      />
    </form>
  );
};

export default withModal(AddMealModal);
