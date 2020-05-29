import React from 'react';
import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';
import { useNavigation } from '@shopgate/engage/core';
import { CrossIcon, AppBarAndroid } from '@shopgate/engage/components';

const styles = {
  button: css({
    position: 'absolute',
    top: `calc(var(--safe-area-inset-top) + ${themeConfig.variables.gap.big}px)`,
    left: themeConfig.variables.gap.big,
    ' button': {
      alignItems: 'center',
      width: 45,
      height: 45,
      borderRadius: 100,
      background: '#E0E2ED !important',
      color: '#000 !important',
    },
  }).toString(),
};

/**
 * @returns {JSX}
 */
const Close = () => {
  const { pop } = useNavigation();

  return (
    <div className={styles.button}>
      <AppBarAndroid.Icon
        onClick={pop}
        icon={CrossIcon}
      />
    </div>
  );
};

export default Close;
