export const read = file => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = function () {
        console.log('---', reader.result);
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  }
