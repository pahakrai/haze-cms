const axios = require("../");
const defaultTimeInterval = 600 * 1000;

module.exports = ({ timeInterval = defaultTimeInterval, updated }) => {
  const updateData = async () => {
    try {
      const response = await axios.get("/pages", {
        params: {
          isTemplate: false,
          isSection: false,
          isSeo: true,
          isActive: true
        }
      });

      if (response.statusText === "OK") {
        const data = response.data;
        updated && updated(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.warn("get page seo data throw error");
    } finally {
      // fetch again after 1 min
      setTimeout(updateData, timeInterval);
    }
  };
  updateData();
};
