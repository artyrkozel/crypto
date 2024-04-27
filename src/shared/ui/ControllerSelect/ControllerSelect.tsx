import { FC, MutableRefObject, SelectHTMLAttributes, memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import _ from 'lodash';
import { FormControl } from '../FormControl/FormControl';
import { Select } from '../Select';
import { IOptions } from '../Dropdown/Dropdown';

interface IControllerSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  inputLabel?: string;
  className?: string;
  placeHolder?: string;
  label?: string;
  name: string;
  options: IOptions[];
  ref?: MutableRefObject<HTMLSelectElement>;
}

export const ControllerSelect: FC<IControllerSelect> = memo(
  ({ name, label, className, options, placeHolder, ...rest }) => {
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
            <Select
              {...field}
              options={options}
              placeholder={placeHolder}
              {...rest}
            />
          </FormControl>
        )}
      />
    );
  },
);
