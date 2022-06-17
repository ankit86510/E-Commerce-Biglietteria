import React, {useState} from 'react'
import Layout from '../../componenti/Layout'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Input from '../../componenti/UI/input'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { registrazione } from '../../azioni'



/**
* @author
* @function Registrazione
**/

const Registrazione = (props) => {

  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();


  const auth = useSelector(state => state.auth);
  const utente = useSelector(state => state.utente);

  if (auth.authenticate) {
    return <Navigate to={"/"} />
  }

  if(utente.loading) {
    return <p>Loading...!!!</p>
  }


  const registrazioneUtente = (e) => {

    e.preventDefault();
    
    const utente = {
      nome, cognome, email, password
    }

    dispatch(registrazione(utente));
  }



  return (
    <Layout>
      <Form onSubmit = {registrazioneUtente}>
        <Row>
          <Col>
            <Input
              label="Nome"
              placeholder="Nome"
              value={nome}
              type="text"
              onChange={(e) => setNome(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              label="Cognome"
              placeholder="Cognome"
              value={cognome}
              type="text"
              onChange={(e) => setCognome(e.target.value)}
            />
          </Col>

        </Row>
        <Input
          label="Email"
          placeholder="Inserisci Email "
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          placeholder="Inserisci Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    </Layout>
  )

}
export default Registrazione