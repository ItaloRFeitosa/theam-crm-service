const { CUSTOMERS_BUCKET_NAME } = require("#application/config/constants");
const { putSignedUrl, getSignedUrl } = require("#external/aws/s3");

const CustomerPhotoProviderName = {
  AWS: "aws",
};

const CustomerPhotoData = (props) => ({
  provider: CustomerPhotoProviderName.AWS,
  bucket: props.bucket || CUSTOMERS_BUCKET_NAME,
  key: `${props.customerId}/photo.${props.extension}`,
});

const CustomerPhotoProvider = () => ({
  putPhoto: async (props) => {
    const contentType = `image/*`;
    const photo = CustomerPhotoData(props);
    const signedUrl = await putSignedUrl({
      bucket: photo.bucket,
      key: photo.key,
      contentType,
    });
    return {
      ...photo,
      signedUrl,
    };
  },

  signPhoto: async ({ photo, ...customer }) => {
    if(!photo){
      return {
        ...customer,
        photoUrl: null,
      }
    }
    const signedUrl = await getSignedUrl(photo);
    return {
      ...customer,
      photoUrl: signedUrl,
    };
  },
});

module.exports = { CustomerPhotoProvider };
