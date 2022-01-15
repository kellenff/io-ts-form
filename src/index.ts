import {FormEvent, useState} from 'react';
import {htmlInputExtractor} from './util';

export const useForm = <T extends object>(init: T) => {
  const [form, setForm] = useState<T>(init);

  const update =
    <K extends keyof T>(key: K) =>
    (event: FormEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [key]: htmlInputExtractor(event),
      });
    };

  const field = (key: keyof T) => ({
    onChange: update(key),
    value: form[key],
  });

  return {form, setForm, field, update};
};
