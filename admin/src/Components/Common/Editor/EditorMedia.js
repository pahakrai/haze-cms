import React from 'react';

const EditorMedia = props => {
  const { block, contentState } = props;
  const data = contentState.getEntity(block.getEntityAt(0)).getData();

  const emptyHtml = ' ';
  return (
    <div>
      {emptyHtml}
      <img
        src={data.src}
        alt={data.alt || ''}
        style={{ height: data.height || 'auto', width: data.width || 'auto' }}
      />
    </div>
  );
};

export default EditorMedia;
