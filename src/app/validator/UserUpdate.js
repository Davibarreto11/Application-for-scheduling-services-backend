import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6).nullable().notRequired(),
      password: Yup.string()
        .min(6)
        .when('oldPassword', {
          is: (oldPassword) => oldPassword,
          then: () => Yup.string().required(),
        }),
      confirmPassword: Yup.string()
        .when('password', {
          is: (password) => password,
          then: () => Yup.string().required().oneOf([Yup.ref('password')]),
        }),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err.inner });
  }
};
