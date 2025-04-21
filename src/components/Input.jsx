/**
 * This file defines a React component called Input.
 * In React, a component is like a reusable building block for your user interface.
 * This Input component is used to create a text box where users can type information, like their name or email.
 * It can also show a label above the input box to tell the user what to enter.
 *
 * Usage example:
 * <Input label="Username" type="text" value={value} onChange={...} />
 */

 /**
  * The Input component is a function that takes some properties (called "props").
  * Props are like settings you can give to a component to change how it looks or works.
  * Here, we use the "label" prop to show a label, and "...props" means we accept any other settings you want to pass to the input box (like type, value, onChange, etc.).
  */
const Input = ({ label, ...props }) => {
  return (
    // This <div> is a container for the label and the input box.
    <div className="">
      {/* If the "label" prop is provided, show a <label> element above the input box. */}
      {label && <label className="">{label}</label>}
      {/* This is the actual input box where the user can type.
          The {...props} part means we pass all other settings (like type, value, onChange) to the input element. */}
      <input
        className=""
        {...props}
      />
    </div>
  );
};

// This line makes the Input component available for use in other files.
export default Input;