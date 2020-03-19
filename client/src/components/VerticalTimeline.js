import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './VerticalTimeline.css';

const VerticalTimeline = ({ animate, className, children, id }) => (
  <div
    className={classNames(className, 'vertical-timeline', {
      'vertical-timeline--animate': animate
    })}
    id={id}
  >
    {children}
  </div>
);

VerticalTimeline.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  animate: PropTypes.bool,
  layout: PropTypes.oneOf(['1-column', '2-columns'])
};

VerticalTimeline.defaultProps = {
  animate: true,
  className: '',
  layout: '2-columns'
};

export default VerticalTimeline;
