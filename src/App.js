import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
    }
  }
  fetchBlogs = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    return await res.json()
  }
  fetchImages = async () => {
    const res = await fetch('https://picsum.photos/v2/list?page=1&limit=100')
    return await res.json()
  }

  mergeData = async () => {
    let blogs = await this.fetchBlogs()
    let imgs = await this.fetchImages()
    for (let i = 0; i < blogs.length; i++) {
      blogs[i].imageData = imgs[i]
    }
    return blogs
  }

  componentDidMount() {
    this.mergeData()
      .then(blogs => {
        this.setState({blogs})
        console.log('blogs: ', this.state.blogs)
      })
  }
  render() {
    const { blogs } = this.state
    // const cards = blogs.length ? (
    //   blogs.map(blog => (
    //     <div key={blog.id} className="card">
    //       <div className="card-body">
    //       <img className="card-img-top" src={blog.imageData} alt={blog.imageData.author} />
    //         <h5 className="card-title">{blog.title}</h5>
    //         <p>{blog.body}</p>
    //         <a href="#" className="btn btn-primary">Go somewhere</a>
    //       </div>
    //     </div>
    //   ))
    // ) : (
    //   <div className="center">Loading...</div>
    // )
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <div className="container">
          <span className="navbar-brand mb-0 h1">Small</span>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {blogs.map(blog => (
                <div key={blog.id} className="card">
                  <div className="card-body">
                    <img className="card-img-top" src={blog.imageData.download_url} alt={blog.imageData.author} />
                    <h5 className="card-title">{blog.title}</h5>
                    <p>{blog.body}</p>
                  </div>
                </div>
                )
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
