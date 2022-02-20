export default className => {
  setTimeout(() => {
    const errorDomEle = document.querySelector(`.${className}`);
    if (errorDomEle) {
      errorDomEle.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, 500);
};
