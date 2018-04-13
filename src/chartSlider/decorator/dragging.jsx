import React, { PureComponent } from 'react';
import FinalDrag from './finalDrag.jsx';

/**
 * 装饰器
 */
const dragging = CHART_WIDTH =>
  OldComponent =>
    @FinalDrag()
    class Dragging extends PureComponent {
      static propTypes = {
      };

      constructor(props) {
        super(props);
        this.state = {
          data: props.data,
        };
      }

      componentWillReceiveProps(nextProps) {
        this.setState({
          data: nextProps.data,
        });
      }

      changeDragStatus = status => {
        this.isDragging = status;
      };

      /**
       * 拖拽中的效果展示
       */
      dragSetShowIndex = (width, direction, callback) => {
        if(this.isDragging === false) return;
        const { data } = this.props;
        const { showPercent, showStartPercent } = data;

        let newShowStartPercent = showStartPercent + (width / CHART_WIDTH).toFixed(6) * 1;
        if (newShowStartPercent < 0) {
          newShowStartPercent = 0;
        }
        if ((showPercent + newShowStartPercent) > 1) {
          newShowStartPercent = 1 - showPercent;
        }
        this.setState({
          data: Object.assign({}, data, {
            showStartPercent: newShowStartPercent,
          }),
        });
        if (callback) {
          callback({
            showPercent,
            showStartPercent: newShowStartPercent,
          });
        }
      };

      /**
       * 左右句柄拖拽
       */
      dragSetShowNum = (dragWidth, direction, callback) => {
        if(this.isDragging === false) return;
        const { data } = this.props;
        const { showPercent, showStartPercent } = data;

        const diff = (dragWidth / CHART_WIDTH).toFixed(6) * 1;
        let newIndex;
        let newShowNum;

        if (direction === 'left') {
          newIndex = showStartPercent + diff;
          newShowNum = showPercent - diff;
          if (newIndex < 0) {
            newIndex = 0;
            newShowNum = showStartPercent + showPercent;
          }
          if (newIndex >= showStartPercent + showPercent) {
            newIndex = showStartPercent + showPercent - 0.01;
            newShowNum = 0.01;
          }
        } else {
          newIndex = showStartPercent;
          newShowNum = showPercent + diff;
          if (newShowNum <= 0) newShowNum = 0.01;
          if ((newShowNum + newIndex) >= 1) {
            newShowNum = 1 - newIndex;
          }
        }
        this.setState({
          data: Object.assign({}, data, {
            showStartPercent: newIndex,
            showPercent: newShowNum,
          }),
        });
        if (callback) {
          callback({
            showStartPercent: newIndex,
            showPercent: newShowNum,
          });
        }
      };

      /**
       * 点击拖拽时触发
       */
      setClickDrag = (diff, callback) => {
        const { data } = this.props;
        const { showPercent, showStartPercent } = data;
        let newShowPercent = showStartPercent + diff;
        if ((showPercent + newShowPercent) > 1) {
          newShowPercent = 1 - showPercent;
        } else if (newShowPercent < 0) {
          newShowPercent = 0;
        }
        this.props.finalDrag({
          showStartPercent: newShowPercent,
          showPercent,
        });
        if (callback) {
          callback({
            showStartPercent: newShowPercent,
            showPercent,
          });
        }
      };

      /**
       * 拖拽结束时触发
       */
      finalDrag = () => {
        const { showStartPercent, showPercent } = this.state.data;
        this.props.finalDrag({
          showStartPercent,
          showPercent,
        });
      };

      render() {
        const _dragActions = {
          setClickDrag: this.setClickDrag,
          dragSetShowIndex: this.dragSetShowIndex,
          dragSetShowNum: this.dragSetShowNum,
          finalDrag: this.finalDrag,
          changeDragStatus: this.changeDragStatus,
        };
        return (
          <div>
            <OldComponent
              {...this.props}
              data={this.state.data}
              _dragActions={_dragActions}
            />
          </div>
        );
      }
    };

export default dragging;
