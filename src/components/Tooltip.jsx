/**
 * This file defines a React component called Tooltip.
 * A "tooltip" is a small box that appears when you hover your mouse over something, showing extra information or help.
 * This Tooltip component lets you wrap any element (like a button or icon) and show a message when the user hovers over it.
 *
 * Usage example:
 * <Tooltip text="This is more info!">
 *   <button>Hover me</button>
 * </Tooltip>
 */

/**
 * The Tooltip component takes two props:
 * - text: the message to show in the tooltip.
 * - children: the element(s) you want the tooltip to appear for (like a button or icon).
 */
const Tooltip = ({ text, children }) => {
  return (
    // This <div> is a container for the element and the tooltip message.
    <div className="">
      {/* {children} is the element you want to show the tooltip for. */}
      {children}
      {/* This <div> is where the tooltip message will appear.
          In a real app, you would use CSS to only show this when the user hovers over the children. */}
      <div className="">
        {text}
      </div>
    </div>
  );
};

// This line makes the Tooltip component available for use in other files.
export default Tooltip;