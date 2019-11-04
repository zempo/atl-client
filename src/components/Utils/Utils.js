import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

export const Loader = ({ loading, status }) => {
  // little spinner for editor on "save"
};

export function AtlSection({ className, list, ...props }) {
  const classes = ["Section", list && "Section--list", className].filter(Boolean).join(" ");
  return <section className={classes} {...props} />;
}

export const Hyph = () => {
  return <span className="Hyph">{" - "}</span>;
};
