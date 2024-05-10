import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  FocusEvent,
  memo,
  FC,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import _ from 'lodash';
import Input from '../Input/Input';
import { FormControl } from '../FormControl/FormControl';

/* eslint-disable */

interface IControllerInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputLabel?: string;
  className?: string;
  mask?: string;
  label?: string;
  name: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ControllerInput: FC<IControllerInputProps> = memo(
  forwardRef<HTMLInputElement, IControllerInputProps>(
    ({ name, label, className, mask, ...rest }) => {
      const {
        control,
        formState: { errors },
      } = useFormContext();

      return (
        <Controller
          name={name}
          control={control}
          defaultValue=''
          render={({ field: { value, onBlur, onChange, ref } }) => (
            <FormControl
              className={className}
              label={label}
              name={name}
              errorMessage={_.get(errors, name)?.message as string}
            >
              <Input
                {...rest}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={(e: FocusEvent<HTMLInputElement>) => {
                  onBlur();
                  rest.onBlur && rest.onBlur(e);
                }}
                ref={ref}
                mask={mask}
              />
            </FormControl>
          )}
        />
      );
    },
  ),
);
