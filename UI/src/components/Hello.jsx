import React from "react";
import { useMyData } from "../context";

export default function Hello() {
  const { currentUserName } = useMyData();
  return currentUserName ? (
    <div>Hello, {currentUserName}</div>
  ) : (
    <div>"Welcome, please log in."</div>
  );
}
