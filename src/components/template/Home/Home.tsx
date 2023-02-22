import React from 'react';
import CodeBlock from '../../organisms/CodeBlock/CodeBlock';
import MarkdownBlock from '../../organisms/MarkdownBlock/MarkdownBlock';

const HomeTemplate: React.FC = (props) => {
  return (
    <div>
      <div style={{margin: '25px'}}>
        {/* <CodeBlock /> */}
      </div>
      <div style = {{margin: '25px'}}>
        <MarkdownBlock />
      </div>
    </div>
  )
}

export default HomeTemplate;