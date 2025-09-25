import React from 'react';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';

function PandaBridgeRoot({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

PandaBridgeRoot.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PandaBridgeRoot;
