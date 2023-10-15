import React, { Component } from "react";
// import { Label } from 'react-dom';
import CreatableSelect from "react-select/creatable";
import { productCategory } from "../profile/prodoctCategory.js";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

// interface State {
//   isLoading: boolean;
//   options: Array<{ label: string; value: string }>;
//   value?: ValueType<OptionType>;
// }

export default class CreatableAdvanced extends Component {
  state = {
    isLoading: false,
    options: productCategory,
    value: undefined,
  };

  handleChange = (newValue) => {
    this.setState({ value: newValue });
    this.props.onData(newValue);
  };

  handleCreate = (inputValue) => {
    // We do not assume how users would like to add newly created options to the existing options list.
    // Instead we pass users through the new value in the onCreate prop
    this.setState({ isLoading: true });
    console.group("Option created");
    console.log("Wait a moment...");
    const { options } = this.state;
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    this.setState({
      isLoading: false,
      options: [...options, newOption],
      value: newOption,
    });
    this.props.onData(newOption);
  };

  render() {
    const { isLoading, options, value } = this.state;
    return (
      <>
        <CreatableSelect
          inputId="category"
          isClearable
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={this.handleChange}
          onCreateOption={this.handleCreate}
          options={options}
          value={value}
        />
      </>
    );
  }
}
