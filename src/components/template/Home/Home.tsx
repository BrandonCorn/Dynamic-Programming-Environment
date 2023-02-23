import React from 'react';
import CodeCell from '../../organisms/CodeCell/CodeCell';
import MarkdownCell from '../../organisms/MarkdownCell/MarkdownCell';

const HomeTemplate: React.FC = (props) => {
  return (
    <div>
      <div style = {{margin: '25px'}}>
        <MarkdownCell />
      </div>
      <div style={{margin: '25px'}}>
        {/* <CodeCell /> */}
      </div>
    </div>
  )
}

export default HomeTemplate;