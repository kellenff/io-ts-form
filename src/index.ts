import {FormEvent, useEffect, useState} from 'react';
import * as t from 'io-ts';

const htmlInputExtractor = (e: FormEvent<HTMLInputElement>) => e.currentTarget.value;

export type UseFormOptions<V> = {
  type?: t.Type<V>;
};

export const useForm = <V extends object>(init: V, options?: UseFormOptions<V>) => {
  const [form, setForm] = useState<V>(init);
  const [isValid, setIsValid] = useState(options?.type?.is(init) ?? true);

  useEffect(() => {
    if (options?.type) {
      setIsValid(options.type.is(form));
    }
  }, [options?.type, setIsValid, form]);

  const update =
    <K extends keyof V>(key: K) =>
    (event: FormEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [key]: htmlInputExtractor(event),
      });
    };

  const field = (key: keyof V) => ({
    onChange: update(key),
    value: form[key],
  });

  return {form, setForm, field, update, isValid, setIsValid};
};
