import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { themeConfig } from '@shopgate/engage';
import { useNavigation } from '@shopgate/engage/core';
import { getCartProductDisplayCount, CART_PATH } from '@shopgate/engage/cart';
import { AppBarAndroid, CartIcon } from '@shopgate/engage/components';
import { styles as config, showEmptyCartBadge } from '../../../../config';

const styles = {
  button: css({
    position: 'absolute',
    top: `calc(var(--safe-area-inset-top) + ${themeConfig.variables.gap.big}px)`,
    right: themeConfig.variables.gap.big,
    ' button': {
      alignItems: 'center',
      width: 45,
      height: 45,
      borderRadius: 100,
      background: '#E0E2ED !important',
      color: '#000 !important',
      ...config.cartButton,
    },
  }).toString(),
  badge: css({
    position: 'absolute',
    fontSize: '0.625rem',
    lineHeight: '1.2',
    fontWeight: 700,
    background: '#000',
    color: '#A8A4A2',
    borderRadius: 100,
    border: '2px solid #E0E2ED',
    height: themeConfig.variables.gap.big,
    minWidth: themeConfig.variables.gap.big,
    paddingLeft: (themeConfig.variables.gap.xsmall / 2),
    paddingRight: (themeConfig.variables.gap.xsmall / 2),
    top: 8,
    right: 15,
    transform: 'translateX(50%)',
    ...config.cartBadge,
  }),
};

/**
 * @returns {JSX}
 */
const CartBadge = ({ count }) => {
  const { push } = useNavigation();

  if (!count && !showEmptyCartBadge) {
    return null;
  }

  const productCount = count >= 100 ? `${99}+` : count;

  return (
    <div className={styles.button}>
      <AppBarAndroid.Icon
        onClick={() => push({
          pathname: CART_PATH,
        })}
        icon={CartIcon}
        badge={() => !!count && <div className={styles.badge}>{productCount}</div>}
      />
    </div>
  );
};

CartBadge.propTypes = {
  count: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  count: getCartProductDisplayCount(state),
});

export default connect(mapStateToProps)(memo(CartBadge));
