import FileMetaService from '../../../Services/APIServices/FileMetaService';

// Expose adapter to components
export default async function uploadImageCallBack(file) {
  try {
    const res = await FileMetaService.createFileMeta(
      {
        folder: process.env.REACT_APP_UPLOAD_FOLDER
      },
      [file]
    );
    if (res.ok && res.data && res.data[0]) {
      return { data: { link: res.data[0].uri } }; // Default field cannot be changed temporarily
    } else {
      throw new Error();
    }
  } catch (e) {
    throw e;
  }
}
