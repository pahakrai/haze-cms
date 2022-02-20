import React from 'react';
import { Popover, Radio, Empty } from 'antd';

const PageDiffs = ({
  diffNodes,
  currentVersion,
  onDiffNodeClick,
  onMouseEnter,
  onMouseLeave
}) =>
  !!diffNodes && !!diffNodes.length ? (
    <Radio.Group
      style={{
        maxHeight: 350,
        overflow: 'auto',
        marginRight: -16,
        paddingRight: 16
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onChange={e =>
        onDiffNodeClick(diffNodes.find(d => d.version === e.target.value))
      }
      value={currentVersion}
    >
      {diffNodes
        .sort((a, b) => b.version - a.version)
        .map(d => (
          <Radio
            key={d.version}
            style={{
              display: 'block',
              height: '30px',
              lineHeight: '30px'
            }}
            value={d.version}
          >
            {`V. ${d.version}`}
          </Radio>
        ))}
    </Radio.Group>
  ) : (
    <Empty />
  );

const PageDiffDown = ({
  diffNodes,
  currentVersion,
  children,
  onDiffNodeClick
}) => {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  // const isOkData = !!(diffNodes && diffNodes.length);
  return (
    <Popover
      placement="bottom"
      visible={visible}
      content={
        <PageDiffs
          diffNodes={diffNodes}
          currentVersion={currentVersion}
          onDiffNodeClick={onDiffNodeClick}
        />
      }
      trigger="hover"
    >
      {children({ visible, setVisible })}
    </Popover>
  );
};

export default PageDiffDown;
