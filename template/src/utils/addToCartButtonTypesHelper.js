// eslint-disable-next-line import/prefer-default-export

// Expects an OnClick event object
// Optional: Expects a callback function
// Attaches a class to the Onclick Event target and detaches it after 1 second
// Calls to the onFinish callback function after detaching the class
export const animateButton = (event, onFinish = () => { }) => {
  event.target.classList.add('pulse');
  setTimeout(() => {
    onFinish();
    event.target.classList.remove('pulse');
  }, 1000);
};

export const button = '';
