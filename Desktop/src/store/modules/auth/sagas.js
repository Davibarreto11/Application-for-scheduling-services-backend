import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password, navigate } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é prestador');
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    navigate('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signInFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const {
      name, email, password, navigate,
    } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    navigate('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signInFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export function signOut({ payload }) {
  const { navigate } = payload;

  navigate('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGI_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
