import React from 'react'
import Layout from '../../componenti/Layout'

/**
* @author
* @function Homepage
**/

const Homepage = (props) => {
  const utente = JSON.parse(localStorage.getItem('utente'));

  return (
    <Layout sidebar>
      <h1 style={{
        padding: "100px 0",
        textAlign: "center",
      }}>Benvenuto/a {utente.fullname}</h1>
    </Layout>
  );

}
export default Homepage