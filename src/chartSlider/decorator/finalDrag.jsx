import React, { PureComponent } from 'react';

/**
 * 装饰器
 */
const finalDrag = () =>
  OldComponent =>
    class extends PureComponent {
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

      finalDrag = params => {
        const { showStartPercent, showPercent } = params;
        this.setState({
          data: Object.assign({}, this.props.data, { showStartPercent, showPercent })
        });
      };

      render() {
        return (
          <div>
            <OldComponent
              {...this.props}
              data={this.state.data}
              finalDrag={this.finalDrag}
            />
          </div>
        );
      }
    };

export default finalDrag;
