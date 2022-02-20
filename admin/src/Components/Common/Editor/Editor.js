import React, { PureComponent } from 'react';
// editor
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// editor css
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import uploadImageCallBack from './UploadAdapter';
import EditorMedia from './EditorMedia';

const getEditorStateFromHtml = value => {
  const contentBlock = htmlToDraft(value);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);

    return editorState;
  }
};
const getHtmlFromState = editorState =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()));

const toolbarConfig = {
  options: [
    'inline',
    'embedded',
    'emoji',
    'image',
    'colorPicker',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'link',
    'remove',
    'history'
  ],
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
  fontSize: {
    options: [10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96]
  },
  image: {
    uploadCallback: uploadImageCallBack,
    previewImage: true,
    defaultSize: { height: 100, width: 100 }
  }
};
export default class EditorView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editorState: getEditorStateFromHtml(props.value || '')
    };
  }

  componentDidUpdate(prevProps) {
    const nextProps = this.props;
    const prevState = this.state;

    if (
      prevProps.value !== nextProps.value &&
      nextProps.value !== prevState.value
    ) {
      const initEditorState = getEditorStateFromHtml(nextProps.value || '');
      this.setState({
        value: nextProps.value,
        editorState: initEditorState
      });
    }
  }

  _onChange = editorState => {
    const { onChange } = this.props;
    const value = getHtmlFromState(editorState) || '';
    onChange && onChange(value);
    this.setState({ editorState, value });
  };

  render() {
    const {
      editorClassName = 'common-editor',
      showToolbar,
      locale,
      toolbarOnFocus
    } = this.props;
    const { editorState } = this.state;
    return (
      <Editor
        // initialEditorState={editorState}
        toolbarOnFocus={toolbarOnFocus}
        onEditorStateChange={this._onChange}
        editorState={editorState}
        toolbarHidden={showToolbar}
        blockRendererFn={myBlockRenderer}
        editorClassName={editorClassName}
        toolbar={toolbarConfig}
        localization={{
          locale: { 'zh-cn': 'zh', en: 'en', 'zh-hk': 'zh_tw' }[locale]
        }}
        stripPastedStyles={true}
      />
    );
  }
}

// custom image atom renderer.
function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType();

  // Convert image type to mediaComponent
  if (type === 'atomic') {
    return {
      component: EditorMedia,
      editable: false,
      props: {
        foo: 'bar'
      }
    };
  }
}
