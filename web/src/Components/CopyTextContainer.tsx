import React, { useRef, ReactNode } from "react";

export const CopyTextContainer = ({
  children,
  text
}: {
  children(props: { onCopy() }): ReactNode;
  text: string;
}) => {
  const contactRef = useRef(null);

  const copyToClipboard = () => {
    if (contactRef.current) {
      contactRef.current.select();
      document.execCommand("copy");
    }
  };
  return (
    <>
      <input
        value={text}
        ref={contactRef}
        style={{
          position: "absolute",
          left: "-99999px"
        }}
        onChange={() => null}
      />
      {children({ onCopy: copyToClipboard })}
    </>
  );
};

export default CopyTextContainer;
