import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './MainScroll.css';

class MainScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: Array.from({ length: 10 })
    };
  }

  fetchMoreData = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 10 }))
      });
    }, 1500)
  };

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={true}
        loader={<h2 className="loading">Loading...</h2>}
      >
        {this.state.items.map((i, index) => (
          <div className="scroll-div" key={index}>
            <h2>Post #{index + 1}</h2>
          </div>
        ))}
      </InfiniteScroll>
    );
  }
}

export default MainScroll;