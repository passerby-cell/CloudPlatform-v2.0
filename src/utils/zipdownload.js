/**
 * 同步下载打包【推荐】
 * @param zipName 压缩包文件名
 * @param files 文件列表，格式：[{"name":"文件名", "url":"文件下载地址"},……]
 */

export const zipFiles = (zipName, files) => {
  console.log("同步下载打包开始时间：" + new Date());
  // 创建压缩文件输出流
  const zipFileOutputStream = streamSaver.createWriteStream(zipName);
  // 创建下载文件流
  // const fileIterator = files.values();
  const fileIterator = files.values();
  const readableZipStream = new ZIP({
    async pull(ctrl) {
      const fileInfo = fileIterator.next();
      if (fileInfo.done) {
        //迭代终止
        ctrl.close();
      } else {
        const { name, url } = fileInfo.value;
        return fetch(url).then((res) => {
          ctrl.enqueue({
            name,
            stream: () => res.body,
          });
        });
      }
    },
  });
  if (window.WritableStream && readableZipStream.pipeTo) {
    // 开始下载
    readableZipStream
      .pipeTo(zipFileOutputStream)
      .then(() => console.log("同步下载打包结束时间：" + new Date()));
  }
};
function objectValues(obj) {
  let vals = [];
  for (const prop in obj) {
    vals.push(obj[prop]);
  }
  return vals;
}
