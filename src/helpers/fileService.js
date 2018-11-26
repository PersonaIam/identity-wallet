/**
 * Created by vladtomsa on 10/10/2018
 */
import FileSaver from 'file-saver';
import { Base64 } from 'js-base64';
const decode = Base64.decode;

export const readInputFile = (inputFile) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject('Error while reading file');
    };

    fileReader.onloadend = (readEndEvent) => {
      const result = readEndEvent.target.result;

      // at the begining we have application type info that needs to be removed
      const fileData = result;
      const fileName = inputFile.name;
      const fileType = inputFile.type;


      const fileInfo = {
        fileName,
        fileType,
        fileData,
      };

      resolve(fileInfo);
    };

    fileReader.readAsDataURL(inputFile);
  });
};

export const saveFile = (file, fileName) => {
  const fileData = file.substr(file.indexOf(',') + 1, file.length);
  const fileType = file.substr(0, file.indexOf(',')).split(':')[1].split(';')[0];

  const data = b64toBlob(fileData, fileType);

  FileSaver.saveAs(data, fileName);
};

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = decode(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});

  return blob;
};
