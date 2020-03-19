import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import VisibilitySensor from 'react-visibility-sensor';
import './VerticalTimelineElement.css';

const VerticalTimelineElement = ({
  children,
  className,
  contentStyle,
  infoStyle,
  date,
  dateStyle,
  icon,
  iconClassName,
  iconOnClick,
  iconStyle,
  id,
  position,
  style,
  textClassName,
  visibilitySensorProps,
  stats
}) => {
  const [visible, setVisible] = useState(false);
  const onVisibilitySensorChange = isVisible => {
    const { onChange } = visibilitySensorProps;

    if (typeof onChange === 'function') {
      onChange(isVisible);
    }

    if (isVisible) {
      setVisible(true);
    }
  };

  return (
    <div
      id={id}
      className={classNames(className, 'vertical-timeline-element', {
        'vertical-timeline-element--left': position === 'left',
        'vertical-timeline-element--right': position === 'right',
        'vertical-timeline-element--no-children': children === ''
      })}
      style={style}
    >
      <span
        style={dateStyle}
        className={classNames(textClassName, 'vertical-timeline-element-date')}
      >
        {date}
      </span>
      <VisibilitySensor {...visibilitySensorProps} onChange={onVisibilitySensorChange}>
        <React.Fragment>
          <span // eslint-disable-line jsx-a11y/no-static-element-interactions
            style={iconStyle}
            onClick={iconOnClick}
            className={classNames(iconClassName, 'vertical-timeline-element-icon', {
              'bounce-in': visible,
              'is-hidden': !visible
            })}
          >
            {icon}
          </span>
          <div
            style={contentStyle}
            className={classNames(textClassName, 'vertical-timeline-element-content', {
              'bounce-in': visible,
              'is-hidden': !visible
            })}
          >
            {stats && (
              <div className="vertical-timeline-element-stats">
                <div className="vertical-timeline-element-stats-row">
                  <h4>TOTAL CONFIRMED</h4>
                  <h2>{stats.totalConf}</h2>
                  <p>{stats.confPctIncDec}</p>
                  <p>
                    <b>ACTIVE CASES:</b> 108,120
                  </p>
                </div>
                <div className="vertical-timeline-element-stats-row">
                  <h4>TOTAL DEATHS</h4>
                  <h2>{stats.totalDead}</h2>
                  <p>{stats.deadPctIncDec}</p>
                </div>
                <div className="vertical-timeline-element-stats-row">
                  <h4>TOTAL RECOVERED</h4>
                  <h2>{stats.totalRecr}</h2>
                  <p>{stats.recrPctIncDec}</p>
                </div>
              </div>
            )}
            <div style={infoStyle} className="vertical-timeline-element-info">
              {children}
            </div>
          </div>
        </React.Fragment>
      </VisibilitySensor>
    </div>
  );
};

VerticalTimelineElement.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  contentStyle: PropTypes.shape({}),
  infoStyle: PropTypes.shape({}),
  date: PropTypes.node,
  dateStyle: PropTypes.shape({}),
  icon: PropTypes.element,
  iconClassName: PropTypes.string,
  iconStyle: PropTypes.shape({}),
  iconOnClick: PropTypes.func,
  id: PropTypes.string,
  position: PropTypes.string,
  style: PropTypes.shape({}),
  textClassName: PropTypes.string,
  visibilitySensorProps: PropTypes.shape({
    onChange: PropTypes.func,
    partialVisibility: PropTypes.bool,
    offset: PropTypes.shape({})
  })
};

VerticalTimelineElement.defaultProps = {
  children: '',
  className: '',
  contentStyle: null,
  infoStyle: null,
  icon: null,
  iconClassName: '',
  iconOnClick: null,
  iconStyle: null,
  id: '',
  style: null,
  date: '',
  dateStyle: null,
  position: '',
  textClassName: '',
  visibilitySensorProps: { partialVisibility: true, offset: { bottom: 40 } }
};

export default VerticalTimelineElement;
