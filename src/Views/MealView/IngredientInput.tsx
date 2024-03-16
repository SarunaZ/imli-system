import Button from "Components/Button";
import Input from "Components/Input";
import { SyntheticEvent } from "react";
import style from "./style.scss";

interface Props {
  index: number;
  inputValue: string;
  onDelete: (index: number) => void;
  onChange: (inputValue: string) => (index: number) => void;
}
const IngredientInput = ({ index, onDelete, onChange, inputValue }: Props) => {
  const handleButtonAdd = (e: SyntheticEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    onChange(e.currentTarget.value)(index);
  };

  return (
    <div className={style.ingredientFormInputWrapper}>
      <Input required value={inputValue} onChange={handleButtonAdd} />
      <Button
        className={style.ingredientFormButton}
        onClick={() => onDelete(index)}
      >
        -
      </Button>
    </div>
  );
};

export default IngredientInput;
