// eslint-disable-next-line import/prefer-default-export
export const animateButton = (event, onFinish = () => { }) => {
  event.target.classList.add('pulse');
  setTimeout(() => {
    onFinish();
    event.target.classList.remove('pulse');
  }, 1000);
};
