import { FilesCollection } from 'meteor/ostrio:files';

const Files = new FilesCollection({
  collectionName: 'Files',
  allowClientCode: true, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      // console.log('se puede subir FILE', file);
      return true;
    } else {
      return 'Por favor suba un archivo png, jpg o jpeg con un tamaño igual o menor a 10MB';
    }
  }
});

export default Files;
