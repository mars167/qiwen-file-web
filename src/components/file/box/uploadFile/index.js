import Vue from 'vue'
// 导入组件
import UploadFile from './Box.vue'
// 使用基础 Vue 构造器，创建一个“子类”
const UploadFileConstructor = Vue.extend(UploadFile)

let uploadFileInstance = null
/**
 * 初始化右键菜单实例
 * @param {string} params 上传文件组件参数
 * @param {object} uploadWay 上传方式 0-文件上传 1-文件夹上传 2-粘贴图片或拖拽上传
 */
const initInstanceUploadFile = (params, uploadWay) => {
	uploadFileInstance = new UploadFileConstructor({
		el: document.createElement('div'),
		data() {
			return {
				params,
				uploadWay
			}
		}
	})
}
/**
 * 右键菜单 Promise 函数
 * @returns {Promise} 抛出确认和取消回调函数
 */
const showUploadFileBox = (obj) => {
	let { params, uploadWay } = obj
	return new Promise((reslove) => {
		initInstanceUploadFile(params, uploadWay)
		uploadFileInstance.callback = (res) => {
			reslove(res)
		}
		document.body.appendChild(uploadFileInstance.$el) //  挂载 DOM
		Vue.nextTick(() => {
			uploadFileInstance.handlePrepareUpload() //  上传组件开始预处理
		})
	})
}

export default showUploadFileBox