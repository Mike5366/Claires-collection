import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { productCategory } from "../profile/prodoctCategory.js";

const createOption = (label) => ({
  label: label.toLowerCase().replace(/\W/g, ""),
  value: label.toLowerCase().replace(/\W/g, ""),
});

export default function CreatableAdvanced(props) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(productCategory);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const getValue = () => {
      if(props.value){
        setValue(createOption(props.value));
      }
    };
    getValue();
  }, [props.value]);

  const handleChange = (newValue) => {
    setValue(newValue);
    props.onChange(newValue);
  };

  const handleCreate = (inputValue) => {
    // We do not assume how users would like to add newly created options to the existing options list.
    // Instead we pass users through the new value in the onCreate prop
    setLoading(true);
    console.group("Option created");
    console.log("Wait a moment...");
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    setLoading(false);
    setOptions([...options, newOption]), setValue(newOption);
    props.onChange(newOption);
  };

  return (
    <>
      <CreatableSelect
        inputId="category"
        isClearable
        isDisabled={loading}
        isLoading={loading}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    </>
  );
}
