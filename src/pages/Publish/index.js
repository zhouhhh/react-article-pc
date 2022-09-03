import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { http } from "@/utils";

const { Option } = Select

const Publish = () => {
  const navigate=useNavigate()
  const { channelStore } = useStore()
  const [fileList, setFileList] = useState([])
  const [imgCount, setImgCount] = useState(1)
  const fileListRef = useRef([])
  const [params] = useSearchParams()
  const id = params.get('id')
  // 上传成功回调
  const onUploadChange = info => {
    const { fileList } = info
    const formatList=fileList.map(file=>{
      if(file.response){
        return {
          url:file.response.data.url
        }
      }
      return file
    })
    setFileList(formatList)
    fileListRef.current = formatList
  }
  const radioChange = (e) => {
    console.log(e)
    const count = e.target.value
    setImgCount(count)
    if (fileListRef.current.length === 0) return false
    if (count === 1) {
      const firstImg = fileListRef.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      setFileList(fileListRef.current)
    }
  }
  const onFinish = async (values) => {
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    id ? await http.put(`/mp/articles/${id}?draft=false`, params) : await http.post('/mp/articles?draft=false', params)
    navigate('/article')
    message.success('发布成功')
  }
  const form = useRef(null)
  useEffect(() => {
    async function getArticle() {
      const res = await http.get(`/mp/articles/${id}`)
      console.log(res)
      const { cover, ...formValue } = res.data
      form.current.setFieldsValue({ ...formValue, type: cover.type })
      const imageList = cover.images.map(url => ({ url }))
      setFileList(imageList)
      setImgCount(cover.type)
      fileListRef.current = imageList
    }
    if (id) {
      getArticle()
      console.log(form.current);
    }
  }, [id])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '编辑' : '发布'}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: 'ppp' }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {
              imgCount > 0 && (
                <Upload
                  name="image"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList
                  action="http://geek.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onChange={onUploadChange}
                  maxCount={imgCount}
                  multiple={imgCount > 1}
                >
                  <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
                </Upload>
              )
            }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)
