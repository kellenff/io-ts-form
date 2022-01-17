# io-ts-form

Form helpers which speak `io-ts`.

# Usage

```typescript jsx
import * as t from 'io-ts';
import * as C from 'io-ts/Codec';
import * as D from 'io-ts/Decoder';
import * as E from 'fp-ts/Either';
import {emailType, passwordType} from './types';
import {pipe} from 'fp-ts/function';
import {useForm} from './index';

/**
 * The form data
 */
const myType = t.type({
  // Branded string representing an email address
  email: emailType,
  // Branded string which meets password requirements
  password: passwordType,
});
type MyType = t.OutputOf<typeof myType>;
const decoder: D.Decoder<unknown, MyType> = {
  decode: (v) =>
    pipe(
      myType.decode(v),
      E.fold(
        (e) => D.failure(v, e.toString()),
        (t) => D.success(t),
      ),
    ),
};
const encoder = myType.asEncoder();

const LoginForm = () => {
  const {field, submit} = useForm(C.make(decoder, encoder));

  // Called when form is submitted and form passes the decoder
  const submitHandler = (data: MyType) => {
    console.log(JSON.stringify(data));
  };

  return (
    <form onSubmit={submit(submitHandler)}>
      <input type="email" name="email" {...field('email')} />
      <input type="password" name="password" {...field('password')} />
      <button type="submit">Login</button>
    </form>
  );
};
```

# Inspiration

This project was heavily inspired by [cupcakearmy/formhero][formhero].

# License

This project is &copy; Kellen Frodelius-Fujimoto, distributed under the [Mozilla Public License 2.0][license].

[formhero]: https://github.com/cupcakearmy/formhero
[license]: https://spdx.org/licenses/MPL-2.0.html
