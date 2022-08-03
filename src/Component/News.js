import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 3
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    console.log('this is constructor')
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }


  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a655d738b25414bbacff8570c9d7d6c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading: false})

  }
  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a655d738b25414bbacff8570c9d7d6c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({articles: this.state.articles.concat(parseData.articles), 
      totalResults: parseData.totalResults})
   };

  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a655d738b25414bbacff8570c9d7d6c&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading: false})
    this.updateNews();
    
  }
  handleNext = async() =>{
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a655d738b25414bbacff8570c9d7d6c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({articles: parseData.articles})

    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parseData.articles,
    //   loading: false
    //   })}
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }
  handlePrevious = async () =>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a655d738b25414bbacff8570c9d7d6c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({articles: parseData.articles})

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   loading: false
    // })

    this.setState({page: this.state.page - 1})
    this.updateNews();


  }
  

  render() {
    return (
      <>
        <h2 className='text-center mb-5'>NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner /> }
        >
          <div className='container'>
          <div className='row'>      
          { this.state.articles.map((element, index)=>{
            return (
             <div className='col-md-4' key={index}>
               <NewsItem title={element.title} description={element.description} imageURL={element.urlToImage}  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
             </div>
            )
          })} 
        </div>
          </div>
        
        </InfiniteScroll> 
      </>
    )
  }
}
