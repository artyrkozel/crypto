import { FC, InputHTMLAttributes, RefObject, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import _ from 'lodash';
import Input from '../Input/Input';
import { FormControl } from '../FormControl/FormControl';

interface IControllerInput extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel?: string;
  className?: string;
  inputType?: 'input' | 'mask';
  mask?: string;
  label?: string;
  name: string;
  ref?: RefObject<HTMLInputElement>;
}

export const ControllerInput: FC<IControllerInput> = memo(
  ({ name, label, className, ref, inputType = 'input', mask, ...rest }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { name, value, onBlur, onChange } }) => (
          <FormControl
            className={className}
            label={label}
            name={name}
            errorMessage={_.get(errors, name)?.message as string}
          >
            <Input
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              inputType={inputType}
              mask={mask}
              {...rest}
            />
          </FormControl>
        )}
      />
    );
  },
);
