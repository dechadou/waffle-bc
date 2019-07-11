const urlParams = new URLSearchParams(window.location.search);
const getParam = name => urlParams.get(name);
export default getParam;
