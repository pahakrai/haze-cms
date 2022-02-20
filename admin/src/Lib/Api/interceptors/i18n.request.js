class I18nInterceptor {
  constructor(axioInstance, config) {
    this.setConfig(config);
    this.axioInstance = axioInstance;
    this.configInterceptor();
  }
  configInterceptor() {}
  setConfig(config) {
    this.config = config;
  }
  getConfig() {
    return this.config;
  }
}

export default I18nInterceptor;
