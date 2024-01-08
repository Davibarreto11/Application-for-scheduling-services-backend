import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { singInRequest } from '../../store/modules/auth/actions';

import AuthLayout from '../_layouts/auth';

import logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = ({ email, password }) => {
    dispatch(singInRequest(email, password, navigate));
  };

  return (
    <AuthLayout>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">{ loading ? 'Carregando...' : 'Acessar' }</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>

    </AuthLayout>
  );
}

export default Signin;
