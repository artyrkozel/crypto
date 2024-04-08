import { LeaderUser } from 'entities/user/model/types';
import { FC } from 'react';
import { HStack } from 'shared/ui/Stack';
import { TextSize, Text, TextColor } from 'shared/ui/Text';
import { ChangePrice } from 'widgets/ChangePrice';
import styles from './LeaderBoardItem.module.scss';

interface ILeaderBoardItem {
  leader: LeaderUser;
  place: number;
}

export const LeaderBoardItem: FC<ILeaderBoardItem> = ({ leader, place }) => {
  return (
    <HStack justify='between' className={styles.LeaderBoardItem}>
      <HStack>
        <span className={styles.place}>{place}</span>
        <div style={{ marginLeft: 8 }}>{leader.name}</div>
      </HStack>
      <HStack align='center' gap='8'>
        <Text
          text='Wallet Increase'
          size={TextSize.XS}
          color={TextColor.secondary}
        />
        <ChangePrice changeValue={leader.changePersent} />
      </HStack>
    </HStack>
  );
};
