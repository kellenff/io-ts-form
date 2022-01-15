import {VFC} from 'react';
import {useForm} from '../src';
import {fireEvent, render} from '@testing-library/react';

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

describe('useForm', () => {
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
