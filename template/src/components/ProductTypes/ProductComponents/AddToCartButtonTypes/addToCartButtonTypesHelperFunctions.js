export default (event, onFinish = () => {}) => {
  event.target.classList.add('pulse');
  setTimeout(() => {
    onFinish();
    event.target.classList.remove('pulse');
  }, 1000);
};
