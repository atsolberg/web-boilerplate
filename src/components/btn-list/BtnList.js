import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import $ from 'jquery';

import { onEnter } from '../../function';
import { uuid } from '../../string';
import styles from './styles';
import { isIos } from '../../device';

const { bool, arrayOf, shape, string, func } = PropTypes;

/**
 * Renders an option picker as a list of radio buttons.
 * The list will scroll off the screen on mobile with an option
 * to toggle the scrolling off and let the items wrap.
 * @param {object} options - an array of option objects with names and values.
 * @param {function} onSelect - callback fired when a selection is made.
 */
class BtnList extends Component {
  idPrefix = uuid();

  state = {
    clipped: false,
    scroll: false,
    scrunch: false
  };

  componentDidMount() {
    this.configSideScroll();
    window.addEventListener('orientationchange', this.onOrientationChange);
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.onOrientationChange);
  }

  /**
   * Re-configure the side scrolling when an mobile
   * device is rotated.  If we don't wait a little,
   * the viewport width won't be correct.
   */
  onOrientationChange = () => {
    setTimeout(this.configSideScroll, 200);
  };

  /**
   * Determine if the list will go off screen on mobile:
   *   - set 'clipped' and 'scroll'.
   * Determine if the list item margin should be adjusted
   * to avoid the screen clipping right between the buttons:
   *   - set 'scrunched'.
   */
  configSideScroll = () => {
    // Use 'screen' on iOS, account for gutters.
    const viewport = (isIos() ? window.screen.width : window.outerWidth) - 30;
    const items = $(this.list)
      .find('li')
      .toArray();
    const gutterWidth = Number(
      $(items[0])
        .css('marginRight')
        .replace('px', '')
    );

    const gutters = [];

    const width = items.reduce((sum, item) => {
      /* eslint-disable no-param-reassign */
      sum += $(item).outerWidth(true);
      // Record where each gutter starts in-case the screen
      // clips right in between two buttons, making it hard
      // to tell there are more options off screen.
      gutters.push(sum);
      return sum;
    }, 0);

    const clipped = viewport < width;
    if (clipped) {
      this.setState(() => ({
        clipped: true,
        scroll: true
      }));

      // Adjust the margins to make sure we clip on top of a button
      // instead of in between.
      const scrunch = gutters.reduce((hasBadClip, gutter) => {
        const distance = viewport - gutter;
        const max = -Math.abs(gutterWidth + 1);
        return hasBadClip || (distance < 1 && distance >= max);
      }, false);
      this.setState(() => ({ scrunch }));
    } else {
      this.setState(() => ({ clipped: false }));
    }
  };

  onSelect = ({ currentTarget: { value } }) => {
    const { onSelect } = this.props;
    onSelect(value);
  };

  onToggle = () => {
    this.setState((prevState) => ({
      scroll: !prevState.scroll
    }));
  };

  render() {
    const { clipped, scroll, scrunch } = this.state;
    const {
      options,
      selected,
      className,
      idPrefix = this.idPrefix,
      style,
      ...rest
    } = this.props;

    const isIconList = !!options[0].icon;

    return (
      <>
        <ul
          css={[
            styles.radioList,
            ...(isIconList ? [styles.iconRadioList] : []),
            ...(style ? [style] : [])
          ]}
          className={cx(className, {
            '-side-scroll': clipped && scroll,
            '-scrunched': scrunch
          })}
          aria-label={`${selected} selected`}
          ref={(c) => (this.list = c)}
          {...rest}
        >
          {options.map((o) => {
            const id = `${idPrefix}-${o.value}`;
            return (
              <li
                key={o.value}
                className={cx({
                  active: o.value === selected,
                  unavailable: o.available === false
                })}
              >
                <label
                  role="radio"
                  aria-checked={o.value === selected}
                  htmlFor={id}
                  tabIndex={0}
                >
                  <input
                    id={id}
                    type="radio"
                    value={o.value}
                    onClick={this.onSelect}
                    onKeyPress={onEnter(this.onSelect)}
                  />
                  {o.icon && <img src={o.icon} alt="" />}
                  {o.label}
                </label>
              </li>
            );
          })}
        </ul>
        {clipped && (
          <div className="tar visible-xs bump-up-sm">
            <button
              type="button"
              css={styles.expander}
              className={cx({ '-expanded': !scroll })}
              onClick={this.onToggle}
            >
              {scroll ? 'Show More' : 'Show Less'}
              <span className="caret" />
            </button>
          </div>
        )}
      </>
    );
  }
}
BtnList.displayName = 'BtnList';
BtnList.propTypes = {
  options: arrayOf(
    shape({
      label: string.isRequired,
      value: string.isRequired,
      available: bool,
      icon: string
    })
  ).isRequired,
  selected: string.isRequired,
  onSelect: func.isRequired,
  idPrefix: string,
  className: string
};

export default BtnList;
