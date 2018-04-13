import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dragger from './components/dragger.jsx';
import './index.less';

const DefaultClickJumpPercent = 4 / 48;

class DragComponent extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  /**
   * 点击左右空白区域触发的点击拖拽
   */
  clickDrag = direction => {
    const { clickJumpPercent, _dragActions } = this.props;
    let cjp = clickJumpPercent ? clickJumpPercent : DefaultClickJumpPercent;
    _dragActions.setClickDrag(direction === 'left' ? -1 * cjp : cjp);
  };

  renderDragger = (direction, dragCallback) => {
    const { changeDragStatus, finalDrag } = this.props._dragActions;
    return (
      <Dragger
        drag={dragCallback}
        changeDragStatus={changeDragStatus}
        direction={direction}
        finalDrag={finalDrag}
        callback={this.props.callback}
      />
    );
  };

  render() {
    const { data, width } = this.props;
    const { dragSetShowNum, dragSetShowIndex } = this.props._dragActions;
    const { showPercent, showStartPercent } = data;
    const areaWidth = width * showPercent;
    const positionLeft = showStartPercent * width;
    return (
      <div className="chart-slider">
        <div className="left-area" style={{ minWidth: positionLeft }} onClick={() => { this.clickDrag('left'); }} />
        <div
          className="drag-area"
          style={{ minWidth: areaWidth }}
        >
          <div className="left-drag">
            {this.renderDragger('left', dragSetShowNum)}
          </div>
          <div className="right-drag">
            {this.renderDragger('right', dragSetShowNum)}
          </div>
          <div className="center-drag">
            {this.renderDragger('', dragSetShowIndex)}
          </div>
        </div>
        <div className="right-area" onClick={() => { this.clickDrag('right'); }} />
      </div>
    );
  }
}

export default DragComponent;
