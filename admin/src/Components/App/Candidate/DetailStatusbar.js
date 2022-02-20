import React, { Component } from 'react';
import { FaChevronRight } from 'react-icons/fa';

class componentName extends Component {
  render() {
    return (
      <div
        style={{
          color: '#999',
          cursor: 'pointer',
          width: '165px',
          padding: '10px 0 20px'
        }}
      >
        <div
          style={{
            display: 'flex'
          }}
        >
          <p
            style={{
              fontSize: '16px',
              flex: 1,
              background: '#dce4e6',
              margin: 0,
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center'
            }}
          >
            TODO
          </p>
          <div
            style={{
              fontSize: '20px',
              width: '40px',
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              background: '#cad2d3',
              textAlign: 'center',
              height: '40px',
              lineHeight: '45px'
            }}
          >
            <FaChevronRight color="#fff" />
          </div>
        </div>
      </div>
    );
  }
}

export default componentName;
