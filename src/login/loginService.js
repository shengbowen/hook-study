export default {
  login(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
        console.log(data);
      }, 400);
    });
  },
};
