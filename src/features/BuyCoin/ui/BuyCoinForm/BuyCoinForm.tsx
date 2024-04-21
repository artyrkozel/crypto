import { useFormContext } from 'react-hook-form';
import { ControlWrapperForm } from 'shared/ui/ControlWrapperForm/ControlWrapperForm';
import { Dropdown } from 'shared/ui/Dropdown';
import Input from 'shared/ui/Input/Input';
import { HStack } from 'shared/ui/Stack';

export const BuyCoinForm = () => {
  const { register } = useFormContext();

  return (
    <>
      <HStack align='end' gap='8' style={{ marginBottom: 16 }}>
        <ControlWrapperForm name='fromSumm'>
          <Input
            placeholder='0'
            autoFocus
            {...register('fromSumm')}
            label='I give'
          />
        </ControlWrapperForm>
        <ControlWrapperForm name='fromCurrenency'>
          <Dropdown options={[]} showCleanBtn={false} disabled />
        </ControlWrapperForm>
      </HStack>
      <HStack align='end' gap='8'>
        <ControlWrapperForm name='toSum'>
          <Input
            placeholder='0'
            autoFocus
            {...register('toSum')}
            label='I receive'
          />
        </ControlWrapperForm>
        <ControlWrapperForm name='toCurrenency'>
          <Dropdown options={[]} showCleanBtn={false} />
        </ControlWrapperForm>
      </HStack>
    </>
  );
};
