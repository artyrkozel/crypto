import { classNames } from 'helpers/classNames/classNames';
import { ReferalBanner } from 'widgets/Banners';
import { Text, TextColor, TextSize } from 'shared/ui/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import Button from 'shared/ui/Button/Button';
import { alert } from 'widgets/Notification';
import { CardTheme } from 'shared/ui/Card/ui/Card';
import { ContentWrapper } from 'widgets/ContentWrapper';
import styles from './DasboardReferal.module.scss';

export const DasboardReferal = () => {
  const copyLinkHandler = () => {
    navigator.clipboard.writeText('https://incrypto-merkulove/design');
    alert({ message: 'Link copied' });
  };

  return (
    <ContentWrapper title='Referal Program' theme={CardTheme.NORMAL} overflow>
      <div className={classNames(styles.DasboardReferal)}>
        <ReferalBanner />
        <div className={styles.referal_wr}>
          <HStack justify='between'>
            <VStack gap='4' style={{ marginLeft: 6 }}>
              <Text
                text='Referal Link'
                color={TextColor.grey}
                size={TextSize.XS}
              />
              <Text
                classNameText={styles.link}
                text='https://incrypto-merkulove/design'
                color={TextColor.secondary}
                size={TextSize.M}
              />
            </VStack>
            <Button onClick={copyLinkHandler}>copy</Button>
          </HStack>
        </div>
      </div>
    </ContentWrapper>
  );
};
