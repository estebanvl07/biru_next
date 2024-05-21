// import B2 from "backblaze-b2";

// export const uploadImageToBucket = async (file: Buffer, filename: string) => {

//   const b2 = new B2({
//     applicationKeyId: "",
//     applicationKey: "",
//   });

//   const { data: authData } = await b2.authorize();
//   const { data: uploadData } = await b2.getUploadUrl({
//     bucketId: "",
//   });

//   const { data } = await b2.uploadFile({
//     uploadUrl: uploadData.uploadUrl,
//     uploadAuthToken: uploadData.authorizationToken,
//     data: file,
//     fileName: "",
//   });

//   return data;
// };
