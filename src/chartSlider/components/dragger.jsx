import React, { PureComponent } from 'react';

class Dragger extends PureComponent {
  constructor(props) {
    super(props);
    this.beginning = false;
    this.dragStartClientX = null;
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    document.addEventListener('mouseup', this.onMouseUp, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove, false);
    document.removeEventListener('mouseup', this.onMouseUp, false);
  }

  onMouseDown = () => {
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    this.beginning = true;
    this.props.changeDragStatus(true);
  };

  onMouseUp = () => {
    if (!this.beginning) return;
    document.body.style.cursor = 'auto';
    document.body.style.userSelect = 'initial';
    this.beginning = false;
    this.dragStartClientX = null;
    this.props.changeDragStatus(false);
    this.props.finalDrag();
  };

  onMouseMove = e => {
    if (!this.beginning) return;
    if (this.dragStartClientX === null) {
      this.dragStartClientX = e.clientX;
      return;
    }
    const dragWidth = e.clientX - this.dragStartClientX;
    this.props.drag(dragWidth, this.props.direction, this.props.callback);
  };

  render() {
    return (
      <div onMouseDown={this.onMouseDown} style={{ height: '100%', width: '100%' }} />
    );
  }
}

export default Dragger;
