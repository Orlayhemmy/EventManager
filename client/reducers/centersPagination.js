const pagination = (centers, pageId) => {
  const pages = Math.ceil(centers.length / 5);
  const boundary = pageId * 5 || 0;
  const showCenters = centers.slice(boundary, (boundary + 1) * 5);
  let isNext = false;
  if (centers.length > boundary + 5) isNext = true;
  const pageObj = {
    pages,
    showCenters,
    isNext
  };
  return pageObj;
};
export default pagination;
