import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { updateStatusBarBackground, useRoute } from '@shopgate/engage/core';
import { ITEM_PATTERN } from '@shopgate/engage/product';
import Close from './components/Close';
import CartBadge from './components/CartBadge';

const styles = {
  bar: css({
    position: 'relative',
  }).toString(),
};

/**
 * @returns {JSX}
 */
const PdpAppBar = ({ children, updateStatusBarBackground: updateStatusBar }) => {
  const { pattern } = useRoute() || {};

  useEffect(() => {
    if (pattern === ITEM_PATTERN) {
      // Update status bar to transparent
      updateStatusBar('transparent');
    }

    return () => {
      if (pattern === ITEM_PATTERN) {
        updateStatusBar();
      }
    };
  }, [pattern, updateStatusBar]);

  if (pattern !== ITEM_PATTERN) {
    return children;
  }

  return (
    <div className={styles.bar}>
      <Close />
      <CartBadge />
    </div>
  );
};

PdpAppBar.propTypes = {
  children: PropTypes.node.isRequired,
  updateStatusBarBackground: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updateStatusBarBackground,
};

export default connect(null, mapDispatchToProps)(PdpAppBar);
