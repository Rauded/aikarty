/**
 * This file defines a React component called Spinner.
 * A "spinner" is a small animation that shows the user something is loading or processing.
 * It's helpful to let users know that the app is working and they should wait.
 * You can also show a message under the spinner to explain what is happening.
 *
 * Usage example:
 * <Spinner message="Loading your data..." />
 */

/**
 * The Spinner component takes one prop:
 * - message: an optional string to show under the spinner (default is an empty string, so nothing is shown if not provided).
 */
const Spinner = ({ message = '' }) => {
  return (
    // This <div> is a container for the spinner and the optional message.
    <div className="">
      {/* This <div> would be styled (with CSS) to show a spinning animation. */}
      <div className=""></div>
      {/* If a message is provided, show it in a <p> tag below the spinner. */}
      {message && <p className="">{message}</p>}
    </div>
  );
};

// This line makes the Spinner component available for use in other files.
export default Spinner;