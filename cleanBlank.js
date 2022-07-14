let fs = require('fs');
const rootPath='./test'
let cleanBlank = function() {

  fs.readdir(rootPath, function (err, files) {
    if (err) {
      console.log(err, 5);
    }
    console.log('root path', files);
    files.forEach((e) => {
      fs.stat(`${rootPath}${e}`, function (err, stat) {
        if (err) {
          console.error(err);
          return;
        }
        // 如果是文件夹，则继续打开目录
        if (stat.isDirectory()) {
          // 如果目录名有空格 则进行去除空格操作
          if (e.includes(" ")) {
            let newPath = e.replace(/\s+/g, '');
            fs.rename(`${rootPath}${e}`, `${rootPath}${newPath}`, () => { })
            cleanBlank();
          } else {
            // 读取文件夹下的文件
            fs.readdir(`${rootPath}${e}`, function (err, dirFiles) {
              if (err) return;
              // 文件列表进行遍历，如果文件名有空格 则进行去空格操作
              dirFiles.forEach((fileItem) => {
                if (fileItem.includes(' ')) {
                  let newPath = fileItem.replace(/\s+/g, '');
                  fs.rename(`${rootPath}${e}/${fileItem}`, `${rootPath}${e}/${newPath}`, () => { })
                }
              })
            })
          }
        }
      })
    })
  })
}
cleanBlank();