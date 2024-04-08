import { useGetLeaderboardQuery } from 'entities/user/api/api';
import { Text } from 'shared/ui/Text';
import { VStack } from 'shared/ui/Stack';
import { LeaderBoardItem } from './LeaderBoardItem';
import styles from './Leaderboard.module.scss';

export const LeaderBoardList = () => {
  const { data: leaderUser } = useGetLeaderboardQuery({});

  if (!leaderUser || !leaderUser.length) {
    return <div>list id empty</div>;
  }

  return (
    <div style={{ gridArea: '1 / 4 / 3 / 5' }}>
      <Text title='Leaderboard' className={styles.title} />
      <VStack style={{ gap: 8 }}>
        {leaderUser.map((leader, index) => (
          <LeaderBoardItem
            leader={leader}
            key={leader.name}
            place={index + 1}
          />
        ))}
      </VStack>
    </div>
  );
};
