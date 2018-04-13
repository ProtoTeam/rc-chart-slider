### rc-chart-slider
一个给react图表绘制用的漫游器

### 运行效果
![image](https://gw.alipayobjects.com/zos/rmsportal/YixcFSrFjFjYLhVjOHWO.gif)

效果是图表下面的漫游器，我没有单独截图，具体使用的参照可以看[demo](https://github.com/ProtoTeam/time-gantt/tree/master/demo)

### 文档
#### DraggingDecorator
```
    @DraggingDecorator(CHART_WIDTH) // 传入图表宽度
```

#### DragComponent
```
    import { DragComponent } from 'rc-chart-slider';

    <DragComponent
            data={{
              showPercent, // 显示百分比
              showStartPercent, // 初始位置
            }}
            width={CHART_WIDTH} // 图表宽度
            clickJumpPercent={CLICK_JUMP_PERCENT} // 点击时跳跃的百分比
            callback={} // 拖动的时候的callback
            _dragActions={this.props._dragActions}
          />
```

#### transformDecorator
回来给svg的图表根据showPercent和showStartPercent偏移一定的距离
```
import { transformDecorator } from 'rc-chart-slider';
@transformDecorator(CHART_WIDTH) // 传入图表宽度
```