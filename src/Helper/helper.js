import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const TypeImage = {
  subImage: "subimage",
  mainImage: "mainimage",
};
export const upLoadImage = async (filesList, nameFolder, typeImage) => {
  const promises = [];
  // const urls = [];

  return Promise.all(
    filesList.map(async (file) => {
      let urls = "";
      const storageRef = ref(
        storage,
        `/${nameFolder}/${typeImage}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            urls = url;
            console.log("chdjasjdas", urls);
          });
        }
      );
      return urls;
    })
  );
};

export const formatPrice = (price) => {
  if (!!price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }

  return 0;
};
