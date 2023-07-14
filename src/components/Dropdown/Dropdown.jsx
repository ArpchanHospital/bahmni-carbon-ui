import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { ComboBox } from "carbon-components-react";
import Title from "../Title/Title.jsx";
import "../../styles/carbon-conflict-fixes.scss";
import "../../styles/carbon-theme.scss";

const Dropdown = (props) => {
  const {
    id,
    options,
    placeholder,
    onChange,
    isDisabled,
    selectedValue,
    autoFocus,
    isRequired,
    width,
    titleText,
  } = props;
  const filterItems = (data) => {
    return data.item.label
      .toLowerCase()
      .includes(data.inputValue.toLowerCase());
  };
  const dropdownRef = useRef(null);
  useEffect(() => {
    autoFocus && dropdownRef && !isDisabled && dropdownRef.current.focus();
  }, [autoFocus, isDisabled]);

  const handleOnChange = (selected) => {
    onChange(selected.selectedItem);
  };
  const title = <Title text={titleText} isRequired={isRequired} />;

  return (
    <div data-testid="select">
      <ComboBox
        id={id}
        ref={dropdownRef}
        items={options}
        onChange={handleOnChange}
        itemToString={(item) => (item ? item.label : "")}
        titleText={title}
        disabled={isDisabled}
        style={{ width: width || "250px" }}
        shouldFilterItem={filterItems}
        placeholder={placeholder}
        selectedItem={selectedValue}
      />
    </div>
  );
};

export default injectIntl(Dropdown);

Dropdown.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  selectedValue: PropTypes.string,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  autoFocus: PropTypes.bool,
  width: PropTypes.string,
  id: PropTypes.string,
  titleText: PropTypes.string,
};
