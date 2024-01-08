import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '../../store/modules/auth/actions';
import { updateProfileRequest } from '../../store/modules/user/actions';

import AvatarInput from './AvatarInput';

import { Container } from './syles';

import DefaultLayout from '../_layouts/default';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const handleSubmit = (data) => {
    dispatch(updateProfileRequest(data));
  };

  const handleSignOut = () => {
    dispatch(signOut(navigate));
  };

  return (
    <DefaultLayout>
      <Container>
        <Form initialData={profile} onSubmit={handleSubmit}>
          <AvatarInput name="avatar_id" />

          <Input name="name" placeholder="Nome completo" />
          <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

          <hr />

          <Input type="password" name="oldPassword" placeholder="Senha atual" />
          <Input type="password" name="password" placeholder="Nova senha" />
          <Input type="password" name="confirmPassword" placeholder="Confirme senha" />

          <button type="submit">Atualizar perfil</button>
        </Form>

        <button type="button" onClick={handleSignOut}>Sair</button>
      </Container>
    </DefaultLayout>
  );
}

export default Profile;
