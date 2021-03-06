import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Container, Form, ContainerForm } from './styles';

import app from '../../services/firebase';

class SignUp extends Component {
  handleSignUp = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      await app.auth().createUserWithEmailAndPassword(email.value, password.value);

      this.props.history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <Container>
        <ContainerForm>
          <h3>Cadastre-se</h3>

          <Form onSubmit={this.handleSignUp}>
            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                name="email"
                id="email"
                className="form-control"
                type="email"
                placeholder="Digite seu E-mail"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>

              <input
                name="password"
                id="password"
                type="password"
                placeholder="Digite sua Senha"
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary login-button">
              Criar conta
            </button>
          </Form>

          <Link to="/login">Voltar</Link>
        </ContainerForm>
      </Container>
    );
  }
}

export default withRouter(SignUp);
