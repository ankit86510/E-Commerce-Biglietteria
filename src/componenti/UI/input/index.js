import React from 'react';
import {Form} from 'react-bootstrap';
/**
* @author
* @function Input
**/

const Input = (props) => {
  let input = null;
  return(
    input =   <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{props.label}</Form.Label>
                  <Form.Control
                      type={props.type} 
                      placeholder={props.placeholder}
                      value = {props.value}
                      pattern = {props.pattern}
                      onChange={props.onChange} />
              </Form.Group>

    )
}
export default Input