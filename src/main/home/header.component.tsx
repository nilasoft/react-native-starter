import {Ionicons} from '@expo/vector-icons';
import React, {ReactElement, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Banner} from 'react-native-paper';
import {useFlag} from '../../core/flag/flag.hook';
import {useTheme} from '../../core/theme/theme.hook';

export default function HeaderComponent(): ReactElement {

  const {colors} = useTheme();
  const {t} = useTranslation();
  const banner = useFlag(true);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Banner visible={banner.state}
            icon={props => (
              <Ionicons {...props}
                        name='md-time'
                        color={colors.grayscale.medium_emphasis}/>
            )}
            actions={[
              {
                label: t('hide'),
                onPress: banner.down
              }
            ]}
            style={{backgroundColor: colors.warning.default}}
    >
      {t('uptime', {timer})}
    </Banner>
  );

}
