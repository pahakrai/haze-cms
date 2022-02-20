import React, { useEffect, useState } from 'react'
import { Collapse, Tree, Select } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { FormattedMessage } from 'react-intl'

import { toast } from '../../../Lib/Toast'
import Button from '../../Common/Button'
import ThemeService from '../../../Services/APIServices/ThemeService'

const { Panel } = Collapse
const { Option } = Select

const Label = styled.div`
  padding: 3px 20px 0 0;
  display: inline-block;
  font-weight: 600;
  color: #666666;
  font-size: 15px;
`

const WorkspaceSelectTheme = ({ intl, formValueSetting, changeTheme }) => {
  const [data, setData] = useState([])
  const [safekey, setSafekey] = useState('')
  const [treeData, setTreeData] = useState([])
  const [dimensions, setDimensions] = useState([])
  const [defaultTheme, setDefaultTheme] = useState({})

  useEffect(() => {
    const fn = async () => {
      const { data } = await ThemeService.getAllTheme()
      setSafekey(
        formValueSetting && formValueSetting.theme
          ? formValueSetting.theme._id
          : data[0]._id
      )
      setData(data)
      setDefaultTheme(
        formValueSetting && formValueSetting.theme
          ? formValueSetting.theme
          : data[0]
      )
      changeTab(
        data,
        formValueSetting && formValueSetting.theme
          ? formValueSetting.theme._id
          : data[0]._id
      )
    }

    fn()
    // eslint-disable-next-line
  }, [])

  const changeTab = (formValue, i) => {
    const value = formValue.filter((v) => v._id === i)[0]
    setDefaultTheme(value)
    setSafekey(i)
    let res = []
    let dimensionsRes = []
    if (value.color) {
      Object.keys(value.color).forEach((v) =>
        res.push({
          title:
            intl.formatMessage({ id: `display_theme_${v}` }) +
            '：' +
            value.color[v],
          key: v,
          icon: () => (
            <div
              style={{
                background: value.color[v],
                width: 15,
                height: 15,
                marginTop: 5
              }}
            />
          )
        })
      )
      setTreeData([
        {
          title: intl.formatMessage({ id: 'display_theme_color' }),
          key: 'color',
          children: res
        }
      ])
    } else {
      setTreeData([
        {
          title: intl.formatMessage({ id: 'display_theme_color' }),
          key: 'color',
          children: null
        }
      ])
    }

    if (value.dimensions) {
      Object.keys(value.dimensions).forEach((v) =>
        dimensionsRes.push({
          title:
            intl.formatMessage({ id: `display_theme_${v}` }) +
            '：' +
            value.dimensions[v],
          key: v,
          icon: () => (
            <div
              style={{
                background: value.dimensions[v],
                width: 15,
                height: 15,
                marginTop: 5
              }}
            />
          )
        })
      )
      setDimensions([
        {
          title: intl.formatMessage({ id: 'display_theme_dimensions' }),
          key: 'dimensions',
          children: dimensionsRes
        }
      ])
    } else {
      setDimensions([
        {
          title: intl.formatMessage({ id: 'display_theme_dimensions' }),
          key: 'dimensions',
          children: null
        }
      ])
    }
  }

  const selectCopy = (value) => {
    toast.success(<FormattedMessage id={'display_copy_success'} />, {
      position: 'top-center',
      autoClose: 1000
    })
    copy(defaultTheme.color[value])
  }

  return (
    <>
      <div style={{ overflow: 'auto', maxHeight: 500 }}>
        {intl.formatMessage({ id: 'display_theme_current_theme' })}：
        <Select
          defaultValue={safekey}
          value={safekey}
          style={{ width: 120 }}
          onChange={(i) => changeTab(data, i)}
        >
          {data.map((v) => (
            <Option key={v._id} value={v._id}>
              {v.name}
            </Option>
          ))}
        </Select>
        {/* show theme info */}
        {defaultTheme && (
          <div style={{ paddingTop: 20 }}>
            <Label>
              {intl.formatMessage({ id: 'display_theme_name' })}:{' '}
              {defaultTheme.name}
            </Label>

            <Label>
              {intl.formatMessage({ id: 'display_theme_scope' })}:{' '}
              {defaultTheme.scope}
            </Label>

            <Label>
              {intl.formatMessage({ id: 'display_theme_createTime' })}:{' '}
              {moment(defaultTheme.createdAt).format('YYYY-MM-DD')}
            </Label>

            <Collapse
              defaultActiveKey={['1', '2', '3']}
              style={{ marginTop: 30 }}
            >
              <Panel
                header={intl.formatMessage({ id: 'display_theme_icons' })}
                key="1"
              >
                <div
                  style={{
                    display: 'flex',
                    background: '#000',
                    padding: defaultTheme.icons ? '20px 0 20px 0' : ''
                  }}
                >
                  {defaultTheme.icons && defaultTheme.icons.facebook && (
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexFlow: 'column'
                      }}
                    >
                      <img alt="facebook" src={defaultTheme.icons.facebook} />
                      <span style={{ color: '#fff' }}>Facebook</span>
                    </div>
                  )}
                  {defaultTheme.icons && defaultTheme.icons.youtube && (
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexFlow: 'column'
                      }}
                    >
                      <img alt="youtube" src={defaultTheme.icons.youtube} />
                      <span style={{ color: '#fff' }}>Youtube</span>
                    </div>
                  )}
                  {defaultTheme.icons && defaultTheme.icons.instagram && (
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexFlow: 'column'
                      }}
                    >
                      <img alt="instagram" src={defaultTheme.icons.instagram} />
                      <span style={{ color: '#fff' }}>Instagram</span>
                    </div>
                  )}
                  {defaultTheme.icons && defaultTheme.icons.search && (
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexFlow: 'column'
                      }}
                    >
                      <img alt="search" src={defaultTheme.icons.search} />
                      <span style={{ color: '#fff' }}>
                        {intl.formatMessage({ id: 'display_theme_search' })}
                      </span>
                    </div>
                  )}
                </div>
              </Panel>
              <Panel
                header={intl.formatMessage({ id: 'display_theme_color' })}
                key="2"
              >
                {treeData && treeData[0] && treeData[0].children && (
                  <Tree
                    showIcon
                    defaultExpandAll
                    defaultSelectedKeys={['0']}
                    treeData={treeData}
                    onSelect={(v) => selectCopy(v)}
                  />
                )}
              </Panel>
              <Panel
                header={intl.formatMessage({ id: 'display_theme_dimensions' })}
                key="3"
              >
                {dimensions && dimensions[0] && dimensions[0].children && (
                  <Tree
                    showIcon
                    defaultExpandAll
                    defaultSelectedKeys={['0']}
                    treeData={dimensions}
                    onSelect={(v) => selectCopy(v)}
                  />
                )}
              </Panel>
            </Collapse>
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignOtems: 'center',
          paddingTop: 30
        }}
      >
        <Button.Primary onClick={() => changeTheme(defaultTheme)}>
          {<FormattedMessage id={'display_theme_use'} />}
        </Button.Primary>
      </div>
    </>
  )
}

export default WorkspaceSelectTheme
