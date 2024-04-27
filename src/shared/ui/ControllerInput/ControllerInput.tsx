import { FC, InputHTMLAttributes, MutableRefObject, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import _ from 'lodash';
import Input from '../Input/Input';
import { FormControl } from '../FormControl/FormControl';

interface IControllerInput extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel?: string;
  className?: string;
  label?: string;
  name: string;
  ref?: MutableRefObject<HTMLInputElement>;
}

export const ControllerInput: FC<IControllerInput> = memo(
  ({ name, label, className, ...rest }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl
            className={className}
            label={label}
            name={name}
            errorMessage={_.get(errors, name)?.message as string}
          >
            <Input {...field} {...rest} />
          </FormControl>
        )}
      />
    );
  },
);
