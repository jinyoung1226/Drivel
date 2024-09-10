export let deepLinkURL = null;

export const setDeepLinkURL = (url) => {
  deepLinkURL = url;
};

export const getDeepLinkURL = () => {
  return deepLinkURL;
};