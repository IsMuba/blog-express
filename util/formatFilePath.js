// 格式化文件的路径，将 \ 转为 /
const formatFilePath = (file) => {
  return file ? file.path.replace('public', '').replaceAll('\\', '/') : ''
}

module.exports = formatFilePath
