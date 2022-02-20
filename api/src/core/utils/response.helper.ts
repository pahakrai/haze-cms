class ResponseHelper {
  /**
   * map to display mode
   * @param mapData data source
   * @param lang current language
   */
  public _mapToDisplay(mapData, lang: string) {
    let data = mapData;
    if (data.toJSON) {
      data = data.toJSON();
    }
    if (data instanceof Array) {
      data.forEach((d, index) => {
        if (d && typeof d === 'object') {
          if (d[lang] || d[lang] === '') {
            data[index].display = d[lang];
          } else if (d._bsontype === 'ObjectId') {
            data[index] = d.toString();
          } else if (d._doc) {
            data[index] = d._doc;
            d = data[index];
            data[index] = this._mapToDisplay(data[index], lang);
          } else if (typeof data === 'object') {
            data[index] = this._mapToDisplay(data[index], lang);
          }
        }
      });
    } else if (typeof data === 'object') {
      const props = Object.keys(data);
      props.forEach(prop => {
        let currentValue = data[prop];
        if (prop === '_id') {
          data[prop] = currentValue.toString();
          currentValue = data[prop];
        }
        if (currentValue && typeof currentValue === 'object') {
          if (currentValue[lang] || currentValue[lang] === '') {
            data[`${prop}_display`] = currentValue[lang];
          } else if (currentValue._bsontype === 'ObjectId') {
            data[prop] = currentValue.toString();
          } else if (currentValue._doc) {
            data[prop] = currentValue._doc;
            currentValue = data[prop];
            data[prop] = this._mapToDisplay(data[prop], lang);
          } else if (typeof data === 'object') {
            data[prop] = this._mapToDisplay(data[prop], lang);
          }
        }
      });
    }
    return data;
  }

  /**
   * map user object
   * @param mapData data source
   * @param type {'normal', 'depth'} default is depth
   */
  public _mapUserObject(mapData, isGetBasicField = true) {
    const cleansedUser = {...mapData};
    delete cleansedUser.securityPass;
    delete cleansedUser.password;
    delete cleansedUser.loginChannel;
    delete cleansedUser.refreshToken;
    delete cleansedUser.verifyToken;
    delete cleansedUser.__v;
    if (isGetBasicField) {
      delete cleansedUser.workspace;
      delete cleansedUser.phone;
      delete cleansedUser.phoneRegionCode;
      delete cleansedUser.status;
      delete cleansedUser.userType;
    }

    return cleansedUser;
  }
}

export default new ResponseHelper();
