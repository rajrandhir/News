import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageURL, newsUrl, date, author, source } = this.props;
    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "88%", zIndex: "1"}}>
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
          <img src={imageURL} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}{" "}
            </h5>
            <p className="card-text">{description}</p>
            <p class="card-text">
              <small className="text-muted">
                Last updated by {!author ? "unkon" : author}{" "}
                {new Date(date).toGMTString()} mins ago
              </small>
            </p>
            <a href={newsUrl} target="-blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
