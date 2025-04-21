/**
 * This file defines a React component called Textarea.
 * A "textarea" is a box where users can type in multiple lines of text, like writing a paragraph or a note.
 * This Textarea component is styled to look nice and can show a label above the box.
 *
 * Usage example:
 * <Textarea label="Your Notes" value={text} onChange={...} />
 */

/**
 * The Textarea component takes these props:
 * - label: an optional label to show above the textarea.
 * - ...props: any other settings you want to pass to the textarea (like value, onChange, placeholder, etc.).
 */
const Textarea = ({ label, ...props }) => {
  return (
    // This <div> is a container for the label and the textarea box.
    <div className="">
      {/* If the "label" prop is provided, show a <label> element above the textarea. */}
      {label && <label className="">{label}</label>}
      {/* This is the actual textarea box where the user can type multiple lines.
          The style={{ ... }} part gives the textarea a custom look (colors, border, rounded corners, etc.).
          The {...props} part means we pass all other settings (like value, onChange) to the textarea element. */}
      <textarea
        style={{
          color: '#667197', // Text color inside the textarea
          width: 'calc(100% - 5px)', // Makes the textarea almost as wide as its container
          height: '430px', // Sets the height of the textarea
          border: '4px dashed #ccd4f3', // Dashed border style
          background: 'rgba(239, 242, 254, 0.2)', // Light background color
          borderRadius: '12px', // Rounded corners
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '20px',
          cursor: 'pointer',
          flexDirection: 'column'
        }}
        {...props}
      />
    </div>
  );
};

// This line makes the Textarea component available for use in other files.
export default Textarea;