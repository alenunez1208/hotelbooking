import React from "react";
import { Form } from "react-bootstrap";

type InputTextProps = {
  label: string;
  type: string;
  placeholder: string;
  onChangeEvent: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  value: string;
};

function InputText({
  label,
  type,
  placeholder,
  onChangeEvent,
  error,
  value,
}: InputTextProps) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChangeEvent(e.target.value)}
        isInvalid={error}
        value={value}
      />
    </Form.Group>
  );
}

export default InputText;
