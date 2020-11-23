import { Horizontal, Vertical } from "gls/lib";
import * as React from "react";

interface Props extends React.ComponentProps<typeof Vertical> {
  onClose?: () => any;
}

export const Modal: React.FC<Props> = ({ onClose, style, children, ...rest }) => {
  return (
    <Horizontal
      data-comment="Modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 100,
      }}
      horizontalAlign="center"
      verticalAlign="center"
    >
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 101,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />
      <Vertical
        style={{ backgroundColor: "white", padding: 20, borderRadius: 6, zIndex: 102, ...style }}
        {...rest}
      >
        {children}
      </Vertical>
    </Horizontal>
  );
};
