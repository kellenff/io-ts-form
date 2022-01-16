import {VFC} from 'react';
import {useForm} from '../src';
import {fireEvent, render} from '@testing-library/react';
import * as t from 'io-ts';

const Update: VFC = () => {
  const {form, update} = useForm({test: ''});

  const test = form.test;

  return (
    <input data-testid="input" type="text" name="test" value={test} onChange={update('test')} />
  );
};

const Field: VFC = () => {
  const {field} = useForm({test: ''});

  return <input data-testid="input" type="text" {...field('test')} />;
};

const Validation: VFC<{type?: t.Type<any>}> = ({type}) => {
  const {field, isValid} = useForm({test: ''}, {type});

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
  describe('Values', () => {
    it('should update the form value when update is called', () => {
      const {getByTestId} = render(<Update />);

      fireEvent.change(getByTestId('input'), {target: {value: 'test'}});

      expect(getByTestId('input').getAttribute('value')).toEqual('test');
    });

    it('should update inputs created with field', () => {
      const {getByTestId} = render(<Field />);

      fireEvent.change(getByTestId('input'), {target: {value: 'test'}});

      expect(getByTestId('input').getAttribute('value')).toEqual('test');
    });
  });

  describe('Validation', () => {
    it('should always be valid if no type is passed', () => {
      const {getByTestId} = render(<Validation />);

      expect(getByTestId('input').getAttribute('value')).toEqual('true');

      fireEvent.change(getByTestId('input'), {target: {value: 'test'}});

      expect(getByTestId('input').getAttribute('value')).toEqual('true');
    });

    it('should validate on valid input', () => {
      const testType = t.type({
        test: t.literal('test'),
      });

      const {getByTestId} = render(<Validation type={testType} />);

      fireEvent.change(getByTestId('input'), {target: {value: 'test'}});

      expect(getByTestId('input').getAttribute('value')).toEqual('true');
    });

    it('should set isValid to false on invalid input', () => {
      const testType = t.type({
        test: t.literal('test'),
      });

      const {getByTestId} = render(<Validation type={testType} />);

      fireEvent.change(getByTestId('input'), {target: {value: 'tent'}});

      expect(getByTestId('input').getAttribute('value')).toEqual('false');
    });
  });
});
