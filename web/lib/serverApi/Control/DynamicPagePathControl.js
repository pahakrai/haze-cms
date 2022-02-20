const axios = require("../");
const defaultTimeInterval = 600 * 1000;

module.exports = ({ timeInterval = defaultTimeInterval, updated }) => {
  const updatePath = async () => {
    try {
      const response = await axios.get("/pages/paths", {
        params: {
          isTemplate: false,
          isSection: false,
          isSeo: false,
        },
      });
      if (response.statusText === "OK") {
        const paths = Array.isArray(response.data)
          ? response.data.filter((p) => !!p)
          : [];
        updated && updated(paths);
      }
    } catch (e) {
      console.warn("get dynamic page list throw error");
    } finally {
      // fetch again after 1 min
      setTimeout(updatePath, timeInterval);
    }
  };
  updatePath();
};
