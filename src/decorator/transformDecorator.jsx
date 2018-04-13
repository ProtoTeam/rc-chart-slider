import React, { PureComponent } from 'react';

const calTransformWidth = (showPercent, showStartPercent, CHART_WIDTH) => {
  return `translate(${ showStartPercent * CHART_WIDTH / showPercent * -1 }, 0)`;
};

/**
 * 装饰器
 */
const transformDecorator = CHART_WIDTH =>
  OldComponent =>
    class extends PureComponent {
      static propTypes = {};

      render() {
        const { data } = this.props;
        return (
          <g
            transform={calTransformWidth(data.showPercent, data.showStartPercent, CHART_WIDTH)}
          >
            <OldComponent
              {...this.props}
            />
          </g>
        );
      }
    };

export default transformDecorator;
