import React, { PureComponent } from 'react';

import ServiceService from '../../Services/APIServices/ServiceService';
import Dropdown from '../../Components/Form/Dropdown';

export class ServiceDropdown extends PureComponent {
  state = {
    options: []
  };
  componentDidMount() {
    this.updateOptions();
  }

  async updateOptions() {
    const { query, intl } = this.props;
    const result = await ServiceService.getServices({
      isActive: true,
      ...(query || {})
    });
    if (result && result.ok && result.data && result.data.length) {
      this.setState({
        options: [...result.data].map(v => {
          return { value: v._id, label: v.name[intl.locale] };
        })
      });
    }
  }

  render() {
    const { options } = this.state;
    return <Dropdown options={options} {...this.props} />;
  }
}
export default ServiceDropdown;
