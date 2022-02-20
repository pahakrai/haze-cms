import React from 'react'
import { Prompt } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { message as AntMessage } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { IoIosArrowBack } from 'react-icons/io'
import debounce from 'lodash/debounce'
import ObjectID from 'bson-objectid'
import { PageEditor, ReactPage as PreviewPage } from '@golpasal/editor'
import moment from 'moment'

import { toast } from '../../../Lib/Toast'
import * as PageDiffUtils from './PageDiffUtils'
import NavBar from '../../Common/NavBar'
import { PrimaryButton } from '../../Common/Button'
import PageContentWidget from './pageWidgets'
import PageLocale from './PageLocale'
import PageBase from './PageBaseDown'
import PageDiff from './PageDiffDown'
import { isContentType } from './Utils'
import H4 from '../../Common/H5'

import PageService from '../../../Services/APIServices/PageService'
import FileMetaService from '../../../Services/APIServices/FileMetaService'
import WidgetSettings from './pageWidgets/WidgetSettings'

// use editor need import
import './PagePreface'

const GlobalStyle = createGlobalStyle`
  h1, h2, h3, h4, h5, h6{
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
`

const Layout = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Container = styled.div`
  font: initial;
  font-family: sans-serif;
  margin-top: 50px;
  width: 100%;
  height: 100%;
  overflow: auto;
`

const PageNavBar = styled(NavBar)`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  padding: 0;
  z-index: 1;
`

const PageBackButton = styled(PrimaryButton)`
  margin: 0 0 0 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 10px;
  border: none;
`
const PageButton = styled.button`
  height: 100%;
  padding: 0px 10px;
  min-width: 75px;
  border: none;
  outline: none;
  cursor: ${(props) => (!props.disabled ? 'pointer' : 'default')};
  font-size: ${(props) => props.theme.fonts.size.h6};
  border-left: 1px solid #ddd;
  background-color: ${(props) => (!props.disabled ? '#fff' : '#eee')};
  ${(props) =>
    props.actived ? `color: ${props.theme.color.primaryHighlightText}` : ''};
  ${(props) =>
    props.actived ? ` background-color: ${props.theme.color.primary}` : ''};
  :hover {
    color: ${(props) =>
      !props.disabled ? props.theme.color.primaryHighlightText : ''};
    background-color: ${(props) =>
      !props.disabled ? props.theme.color.primaryHighlight : '#eee'};
  }
`

export default class PageContent extends React.PureComponent {
  static AvailableLocales = ['en', 'zh-hk', 'zh-cn']

  state = {
    // locale change flag
    currentLocale: null,
    page: null,
    // save from page.content or jump version content
    baseContent: null,
    // save edit content
    content: null,
    // save page.version or jump version
    currentVersion: 0,
    // page.version
    diffNodes: [],
    // preview or edit mode flag
    previewMode: false,
    // get all media
    mediaItems: [],
    // own controll displayLayout
    displayLayout: false
  }

  constructor(props) {
    super(props)
    // init data
    this.state.currentLocale = props.intl && props.intl.locale
    this.state.page = props.page
    this.state.content =
      props.page && JSON.parse(JSON.stringify(props.page.content))
    this.state.baseContent =
      props.page && JSON.parse(JSON.stringify(props.page.content))
    this.state.currentVersion = props.page && props.page.version
    this.state.diffNodes = props.page && props.page.diffNodes

    let currentWidgets = {}
    if (
      props.currentWorkspace.preferences &&
      props.currentWorkspace.preferences.widgets
    ) {
      currentWidgets = props.currentWorkspace.preferences.widgets.map((v) =>
        v.replace(v[0], v[0].toLowerCase())
      )
    } else {
      currentWidgets = ['textEditor', 'locale']
    }

    let pageWidget = {}
    currentWidgets.forEach((v) => (pageWidget[v] = PageContentWidget[v]))

    this.state.pageWidget = pageWidget

    this.onSearch = debounce(this.onSearch, 500)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.page && nextProps.page !== prevState.page) {
      return {
        page: nextProps.page,
        content: JSON.parse(JSON.stringify(nextProps.page.content)),
        baseContent: JSON.parse(JSON.stringify(nextProps.page.content)),
        currentVersion: nextProps.page.version,
        diffNodes: nextProps.page.diffNodes
      }
    }
    return null
  }

  componentDidMount() {
    this.onSearch()
  }
  onContentChange = (content) => {
    this.setState({ content })
  }

  onPageChange = (page) => {
    this.setState({ page })
  }

  onLocaleChange = (locale) => {
    this.setState({ currentLocale: locale })
  }

  onBack = () => this.props.onBack()

  onSaveAndPublish = async () => {
    const { intl } = this.props
    const { currentVersion } = this.state
    const isEdit = this.edited()
    const isPublish = currentVersion !== this.props.page.version
    if (!isEdit && !isPublish) {
      AntMessage.info(
        intl.formatMessage({ id: 'display_page_content_noChange' })
      )
      return
    }
    if (isPublish) {
      this.onPublish()
      return
    }
    // save , next publish
    const saveResult = await this.onSave()
    if (!!saveResult) {
      await this.onPublish({
        success: () => {
          AntMessage.success(
            intl.formatMessage({
              id: 'display_page_content_saveAndPublish_success'
            })
          )
        }
      })
    }
  }

  onPreview = () => {
    this.setState({ previewMode: !this.state.previewMode })
  }

  onPublish = (cb = {}) =>
    this.props.onPublish(
      this.state.content,
      {
        ...this.state.page,
        diffNodes: this.state.diffNodes,
        version: this.state.currentVersion,
        content: this.state.content
      },
      cb
    )

  onSave = async (onFailed) => {
    const { intl } = this.props
    const { content, version, _id } = this.props.page
    let result = false
    // call load
    const hideLoading = AntMessage.loading(
      intl.formatMessage({ id: 'loading' })
    )
    // get new diffNode
    const newDiffNode = PageDiffUtils.getNewDiffNode(
      content,
      this.state.content,
      version,
      this.state.diffNodes
    )
    const newDiffNodes = [...this.state.diffNodes, newDiffNode]
    // fetch fail back
    const callFailBack = () => {
      result = false
      toast.error(intl.formatMessage({ id: 'updated_failure' }))
      // onFailed && onFailed();
    }
    // fetch update
    try {
      const updateResult = await PageService.updatePage({
        _id,
        diffNodes: newDiffNodes
      })
      if (updateResult.ok) {
        this.setState({
          baseContent: JSON.parse(JSON.stringify(this.state.content)),
          diffNodes: newDiffNodes,
          currentVersion: newDiffNode.version
        })
        result = true
      } else {
        callFailBack()
      }
    } catch (error) {
      callFailBack()
    }
    // close loading
    hideLoading()
    return result
  }

  onSearch = async (query) => {
    try {
      const res = await FileMetaService.getFileMetas(query)
      if (res && res.ok && Array.isArray(res.data)) {
        this.setState({
          mediaItems: res.data.map((f) => ({
            _id: f._id,
            url: f.uri,
            status: 'resource',
            date: moment(f.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            name: f.displayName
          }))
        })
      }
    } catch (e) {}
  }
  onUploadMedia = async (accepted, rejected, uploadProgress, uploadFinish) => {
    // handle accepted files
    const acceptFiles = (accepted || []).map((af) => {
      const preview = URL.createObjectURL(af)
      return {
        preview,
        _id: preview,
        status: 'upload',
        progress: 0,
        file: af
      }
    })
    // update init acceptFiles
    uploadProgress(acceptFiles)
    // start update files
    for (let i = 0; i < acceptFiles.length; i++) {
      const af = acceptFiles[i]

      try {
        const res = await FileMetaService.createFileMeta(
          {
            files: [{ preview: af.preview }],
            folder: `${process.env.REACT_APP_UPLOAD_FOLDER}/${this.props.currentWorkspace._id}`
          },
          [af.file],
          ({ loaded, total }) => {
            const progress = (loaded / total) * 100
            uploadProgress([{ ...af, progress: Math.min(progress, 95) }])
          }
        )
        uploadProgress([{ ...af, progress: 100 }])
        // upload success
        uploadFinish([af])
        if (res.ok && res.data && Array.isArray(res.data)) {
          const data = res.data[0]
          // update state
          const { _id, uri, createdAt, displayName } = data
          this.setState({
            mediaItems: [
              {
                _id,
                url: uri,
                status: 'resource',
                date: moment(createdAt).format('YYYY-MM-DD HH:mm:ss'),
                name: displayName
              },
              ...this.state.mediaItems
            ]
          })
        } else throw new Error(`${res.status} - ${res.problem}`)
      } catch (error) {
        // log error
        // set fail status
        uploadFinish([af])
        // totast fail image
        AntMessage.error(
          this.props.intl.formatMessage({ id: 'updated_failure' })
        )
      }
    }
  }

  onJumpDiffNode = (targeDiffNode) => {
    const { content, version } = this.props.page
    const targeContent = PageDiffUtils.getSourceByDiffNode(
      content,
      version,
      targeDiffNode.version,
      this.state.diffNodes
    )
    this.setState({
      baseContent: JSON.parse(JSON.stringify(targeContent)),
      content: targeContent,
      currentVersion: targeDiffNode.version
    })
  }

  edited = () => {
    const { baseContent, content } = this.state
    return PageDiffUtils.isDiff(baseContent, content)
  }

  renderBackButton = () => {
    const { intl } = this.props
    return (
      <PageBackButton onClick={this.onBack}>
        <IoIosArrowBack size={18} style={{ color: '#333', float: 'left' }} />
        <H4
          style={{
            color: '#333',
            display: 'inline-block',
            margin: 0,
            padding: 0
          }}
        >
          {intl.formatMessage({ id: 'back' })}
        </H4>
      </PageBackButton>
    )
  }

  renderButton = () => {
    const { baseContent, content, currentVersion, diffNodes } = this.state
    const { intl } = this.props
    const isEdit = PageDiffUtils.isDiff(baseContent, content)
    // const isPublish = currentVersion !== this.props.page.version;
    // const isPublish = isEdit || currentVersion !== this.props.page.version;
    return (
      <React.Fragment>
        {/* save button */}
        <PageButton disabled={!isEdit} actived={isEdit} onClick={this.onSave}>
          {intl.formatMessage({
            id: 'save'
          })}
        </PageButton>
        {/* display diffNodes list */}
        <PageDiff
          diffNodes={diffNodes}
          currentVersion={currentVersion}
          onDiffNodeClick={this.onJumpDiffNode}
        >
          {({ visible, setVisible }) => (
            <PageButton
              style={{ minWidth: 35 }}
              onClick={() => setVisible(!visible)}
            >
              {!visible && <DownOutlined type="down" />}
              {visible && <UpOutlined type="up" />}
            </PageButton>
          )}
        </PageDiff>
        {/* publish button */}
        <PageButton
          // disabled={!isPublish}
          // actived={!previewMode && isPublish}
          actived={true}
          onClick={this.onSaveAndPublish}
        >
          {intl.formatMessage({ id: 'publish' })}
        </PageButton>
      </React.Fragment>
    )
  }

  renderNav = () => {
    const { currentLocale, page, previewMode } = this.state
    const { intl } = this.props
    return !previewMode ? (
      <PageNavBar style={{ height: 50 }}>
        {this.renderBackButton()}
        {/* display page base(title) */}
        <PageBase
          page={page}
          currentLocale={currentLocale}
          onPageChange={this.onPageChange}
        />
        {/* select locale */}
        <PageLocale
          currentLocale={currentLocale}
          onLocaleChange={this.onLocaleChange}
        />
        {/* select layout display */}
        {/* <PageLayoutSwitch
          value={this.state.displayLayout}
          onToggle={() =>
            this.setState({ displayLayout: !this.state.displayLayout })
          }
        /> */}
        <div style={{ flex: 1 }} />
        {/* preview */}
        <PageButton actived={previewMode} onClick={this.onPreview}>
          {intl.formatMessage({
            id: !previewMode ? 'preview' : 'preview_exit'
          })}
        </PageButton>
        {/* save  */}
        {this.renderButton()}
      </PageNavBar>
    ) : (
      <PageButton
        style={{
          position: 'absolute',
          top: 60,
          right: 20,
          zIndex: 9999,
          width: 100,
          height: 50,
          border: '1px solid #ddd',
          borderRadius: 5
        }}
        actived={previewMode}
        onClick={this.onPreview}
      >
        {intl.formatMessage({
          id: !previewMode ? 'preview' : 'preview_exit'
        })}
      </PageButton>
    )
  }

  renderPageContent = () => {
    const { intl, limitAccess, contentType } = this.props
    const { content, currentLocale, previewMode, pageWidget } = this.state

    return (
      <React.Fragment>
        {!previewMode && (
          <PageEditor
            page={content}
            type={[contentType]}
            systemLocale={intl.locale}
            widgetTypes={pageWidget}
            onChange={this.onContentChange}
            locale={currentLocale}
            limitAccess={limitAccess}
            media={{
              items: this.state.mediaItems,
              image: true,
              video: true,
              audio: true,
              uploadFn: this.onUploadMedia,
              onSearch: this.onSearch
            }}
            widgetSettings={WidgetSettings}
            availableLocales={PageContent.AvailableLocales}
          />
        )}
        {previewMode && (
          <PreviewPage
            locale={currentLocale}
            page={content}
            widgetSettings={WidgetSettings}
            widgetTypes={PageContentWidget}
          />
        )}
      </React.Fragment>
    )
  }

  static keyForPreviewMode = new ObjectID().toHexString()
  static keyForEditorMode = new ObjectID().toHexString()

  render() {
    const { page, intl } = this.props
    const { currentLocale, previewMode } = this.state
    const displayLayout =
      isContentType(page) &&
      !!page.layout &&
      !!page.layout.content &&
      this.state.displayLayout
    return (
      <Layout>
        <Prompt
          when={this.edited()}
          message={intl.formatMessage({ id: 'prompt_not_saved' })}
        />
        {this.renderNav()}
        <Container style={{ marginTop: previewMode ? 0 : 50 }}>
          {!displayLayout && this.renderPageContent()}
          {displayLayout && (
            <PreviewPage
              key={
                previewMode
                  ? PageContent.keyForPreviewMode
                  : PageContent.keyForEditorMode
              }
              {...(previewMode
                ? {}
                : {
                    forceViewport: true,
                    breakpointSelector: '.page_base .viewport'
                  })}
              locale={currentLocale}
              page={page.layout.content}
              widgetTypes={PageContentWidget}
              widgetSettings={WidgetSettings}
            >
              {this.renderPageContent()}
            </PreviewPage>
          )}
        </Container>
        <GlobalStyle />
      </Layout>
    )
  }
}
