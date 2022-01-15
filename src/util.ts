import {FormEvent} from 'react';

export const htmlInputExtractor = (e: FormEvent<HTMLInputElement>) => e.currentTarget.value;
