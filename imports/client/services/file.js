import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { compose, split, last } from 'lodash/fp'

const FileService = {
  ossClient: new OSS.Wrapper({
    region: Meteor.settings.public.aliyun.oss.region,
    bucket: Meteor.settings.public.aliyun.oss.bucket,
    accessKeyId: Meteor.settings.public.aliyun.accessKeyId,
    accessKeySecret: Meteor.settings.public.aliyun.accessKeySecret,
  }),

  namespaces: {
    USER_AVATARS: 'user_avatars',
  },

  /**
   * @param namespace
   * @param file
   * @returns {Promise} key
   */
  uploadFile(namespace, file) {
    const key = buildFileKey(namespace, file)
    return this.ossClient.multipartUpload(key, file).then(res => res.name)
  },

  /**
   * @param key
   * @returns url
   */
  getFileUrl(key) {
    return this.ossClient.getObjectUrl(key, getBaseUrl())
  },

  /**
   * @param key
   * @returns name
   */
  getFileName(key) {
    return compose(last, split('/'))(key)
  },
}

export default FileService

function getBaseUrl () {
  const {region, bucket} = Meteor.settings.public.aliyun.oss
  const aliyuncsDomain = 'aliyuncs.com'
  return `${bucket}.${region}.${aliyuncsDomain}`
}

function buildFileKey (dir, file) {
  return `${dir}/${Random.id()}/${file.name}`
}