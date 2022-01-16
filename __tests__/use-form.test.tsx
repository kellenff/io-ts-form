import {VFC} from 'react';
import {useForm} from '../src';
import {fireEvent, render} from '@testing-library/react';
import * as t from 'io-ts';
import * as C from 'io-ts/Codec';
import * as D from 'io-ts/Decoder';
import * as En from 'io-ts/Encoder';
import * as E from 'fp-ts/Either';
import {pipe} from 'fp-ts/function';

type Props = {
  decoder: D.Decoder<any, any>;
  encoder: En.Encoder<any, any>;
};

const Update: VFC<Props> = ({decoder, encoder}) => {
  const {form, update} = useForm<{test: string}, any, any>(C.make(decoder, encoder));

  const test = form['test'];

  return (
    <input data-testid="input" type="text" name="test" value={test} onChange={update('test')} />
  );
};

const Field: VFC<Props> = ({decoder, encoder}) => {
  const {field} = useForm<{test: string}, any, any>(C.make(decoder, encoder));

  return <input data-testid="input" type="text" {...field('test')} />;
};

const Validation: VFC<Props> = ({decoder, encoder}) => {
  const {field, isValid} = useForm<{test: string}, any, any>(C.make(decoder, encoder));

  return (
    <input
      data-testid="input"
      type="text"
      onChange={field('test').onChange}
      value={String(isValid)}
    />
  );
};

describe('useForm', () => {
  const testType = t.type({test: t.literal('test')});
  type TestType = t.OutputOf<typeof testType>;
  const decoder: D.Decoder<unknown, TestType> = {
    decode: (v) =>
      pipe(
        testType.decode(v),
        E.fold(
          (e) => D.failure(v, e.toString()),
          (v) => D.success(v),
        ),
      ),
  };
  const encoder = testType.asEncoder();

  describe('Values', () => {
    it('should update the form value when update is called', () => {
      const {getByTestId} = render(<Update decoder={decoder} encoder={encoder} />);

      fireEvent.change(getByTestId('input'), {target: {value: 'test'}});

      expect(getByTestId('input').getAttribute('value')).toEqual('test');
    });

    it('should update inputs created with field', () => {
      const {getByTestId} = render(<Field decoder={decoder} encoder={encoder} />);

      fireEvent.change(getByTestId('input'), {target: {value: 'test'}});

      expect(getByTestId('input').getAttribute('value')).toEqual('test');
    });
  });

  describe('Validation', () => {
    it('should validate on valid input', () => {
      const {getByTestId} = render(<Validation decoder={decoder} encoder={encoder} />);

      fireEvent.change(getByTestId('input'), {target: {value: 'test'}});

      expect(getByTestId('input').getAttribute('value')).toEqual('true');
    });

    it('should set isValid to false on invalid input', () => {
      const {getByTestId} = render(<Validation decoder={decoder} encoder={encoder} />);

      fireEvent.change(getByTestId('input'), {target: {value: 'tent'}});

      expect(getByTestId('input').getAttribute('value')).toEqual('false');
    });
  });
});
