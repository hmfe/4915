import React from "react"

import { OmdbData, MovieItem } from "../api/apiProps"
import { omdbDefaultData } from "../api/omdbDefaultData"
import { getApiData } from "../api/api"

// SEARCH LIST

interface SearchListProps {
  searchString: string
  addToSearchHistory(item: MovieItem): void
}

function SearchList(props: SearchListProps) {
  let data: OmdbData = omdbDefaultData
  if (props.searchString && props.searchString.length >= 2) {
    data = getApiData(props.searchString)
  }

  function onItemClicked(item: MovieItem) {
    props.addToSearchHistory(item)
  }

  return (
    <>
      {data.Search && data.Search.length ? (
        <div className="search-list">
          <ul aria-label="Search results" role="list">
            {data.Search.map((item, itemIndex) => {
              const lowerCaseSearch = props.searchString.toLowerCase()
              const lowerCaseTitle = item.Title.toLowerCase()
              const termIndex = lowerCaseTitle.indexOf(lowerCaseSearch)

              const titleWithHighlight = (
                <React.Fragment>
                  {item.Title.substring(0, termIndex)}
                  <strong>
                    {item.Title.substring(
                      termIndex,
                      termIndex + lowerCaseSearch.length
                    )}
                  </strong>
                  {item.Title.substring(
                    termIndex + lowerCaseSearch.length,
                    item.Title.length
                  )}
                </React.Fragment>
              )

              return (
                <li key={itemIndex} role="listitem">
                  <a
                    href="#"
                    onClick={event => {
                      event.preventDefault()
                      onItemClicked(item)
                    }}
                  >
                    {titleWithHighlight}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </>
  )
}

// SEARCH HISTORY

interface SearchHistoryItemProps {
  movie: MovieItem
  timestamp: Date
}

interface SearchHistoryListProps {
  items: SearchHistoryItemProps[]
  removeFromSearchHistory(item: SearchHistoryItemProps): void
}

function SearchHistoryList(props: SearchHistoryListProps) {
  return (
    <>
      {props.items && props.items.length ? (
        <div id="search-history-list">
          <div className="search-history-list-header">
            <p>Movie title</p>
            <p>Date added</p>
          </div>
          <ul aria-label="Search history" role="list">
            {props.items.map((item, itemIndex) => (
              <li key={itemIndex} role="listitem">
                <p className="item-title">{item.movie.Title}</p>
                <p className="item-date">
                  {convertDateToString(item.timestamp)}
                </p>
                <button
                  role="button"
                  className="button list-remove-button"
                  onClick={event => {
                    event.preventDefault()
                    props.removeFromSearchHistory(item)
                  }}
                >
                  <span className="sr-only">Remove item from list</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}

// SEARCH BOX

interface SearchBoxProps {}
interface SearchBoxState {
  searchString: string
  searchHistory: SearchHistoryItemProps[]
}

class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  constructor(props: SearchBoxProps) {
    super(props)

    this.state = {
      searchString: "",
      searchHistory: [],
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.addToSearchHistory = this.addToSearchHistory.bind(this)
    this.removeFromSearchHistory = this.removeFromSearchHistory.bind(this)
    this.resetSearchHistory = this.resetSearchHistory.bind(this)
  }

  onSearchChange(event: React.SyntheticEvent) {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.setState({
      searchString: value,
    })
  }

  addToSearchHistory(item: MovieItem) {
    let searchHistory = this.state.searchHistory
    const newHistoryItem: SearchHistoryItemProps = {
      movie: item,
      timestamp: new Date(),
    }
    searchHistory.push(newHistoryItem)
    this.setState({
      searchHistory: searchHistory,
    })
  }

  removeFromSearchHistory(item: SearchHistoryItemProps) {
    let searchHistory = this.state.searchHistory
    searchHistory = searchHistory.filter(historyItem => {
      return historyItem.movie.imdbID !== item.movie.imdbID
    })
    this.setState({
      searchHistory: searchHistory,
    })
  }

  resetSearchHistory() {
    this.setState({
      searchHistory: [],
    })
  }

  render() {
    return (
      <div className="search-box">
        <h2 className="h3">Search</h2>
        <label htmlFor="search" className="sr-only">
          Search for movie titles
        </label>
        <input
          id="search"
          name="search"
          type="text"
          value={this.state.searchString}
          onChange={this.onSearchChange}
          placeholder="Search for movies!"
        />
        <SearchList
          searchString={this.state.searchString}
          addToSearchHistory={this.addToSearchHistory}
        />
        <SearchHistoryList
          items={this.state.searchHistory}
          removeFromSearchHistory={this.removeFromSearchHistory}
        />
        <button
          role="button"
          className="button delete-button"
          onClick={event => {
            event.preventDefault()
            if (this.state.searchHistory.length) {
              this.resetSearchHistory()
            } else {
              alert("Add some things to your list first!")
            }
          }}
        >
          Delete
        </button>
      </div>
    )
  }
}

// HELPER FUNCTIONS

function convertDateToString(date: Date) {
  const year = date.getFullYear()
  const month = ("0" + date.getMonth()).slice(-2)
  const day = ("0" + date.getDay()).slice(-2)
  const hours = ("0" + date.getHours()).slice(-2)
  const minutes = ("0" + date.getMinutes()).slice(-2)

  return year + "-" + month + "-" + day + ", " + hours + ":" + minutes
}

export default SearchBox
