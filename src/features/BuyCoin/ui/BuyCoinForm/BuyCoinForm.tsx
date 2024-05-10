import { ControlWrapperForm } from '@/shared/ui/ControlWrapperForm/ControlWrapperForm';
import { ControllerInput } from '@/shared/ui/ControllerInput/ControllerInput';
import { Dropdown } from '@/shared/ui/Dropdown';
import { HStack } from '@/shared/ui/Stack';

export const BuyCoinForm = () => {
  return (
    <>
      <HStack align='end' gap='8' style={{ marginBottom: 16 }}>
        <ControllerInput
          name='fromSumm'
          placeholder='0'
          autoFocus
          label='I give'
        />
        <ControlWrapperForm name='fromCurrenency'>
          <Dropdown options={[]} showCleanBtn={false} disabled />
        </ControlWrapperForm>
      </HStack>
      <HStack align='end' gap='8'>
        <ControlWrapperForm name='toSum'>
          <ControllerInput
            name='toSum'
            placeholder='0'
            autoFocus
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
