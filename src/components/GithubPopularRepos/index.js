import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusRender = {
  initial: 'INITIAL',

  success: 'SUCCESS',

  failure: 'FAILURE',

  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},

  {id: 'JAVASCRIPT', language: 'Javascript'},

  {id: 'RUBY', language: 'Ruby'},

  {id: 'JAVA', language: 'Java'},

  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    repoData: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apiStatusRender.initial,
  }

  // eslint-disable-next-line react/sort-comp

  componentDidMount() {
    this.getRepoData()
  }

  getRepoData = async () => {
    const {activeId} = this.state

    this.setState({apiStatus: apiStatusRender.inProgress})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(eachData => ({
        id: eachData.id,

        name: eachData.name,

        issuesCount: eachData.issues_count,

        forksCount: eachData.forks_count,

        starsCount: eachData.stars_count,

        avatarUrl: eachData.avatar_url,
      }))

      this.setState({repoData: updatedData, apiStatus: apiStatusRender.success})
    } else {
      this.setState({apiStatus: apiStatusRender.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepoList = () => {
    const {repoData} = this.state

    return (
      <ul>
        {repoData.map(repoItems => (
          <RepositoryItem
            key={repoItems.id}
            RepositoryItemDetails={repoItems}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure"
      />

      <p>Something went wrong</p>
    </div>
  )

  renderRepository = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusRender.success:
        return this.renderRepoList()

      case apiStatusRender.failure:
        return this.renderFailureView()

      case apiStatusRender.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  setActiveId = newId => {
    this.setState({activeId: newId}, this.getRepoData)
  }

  renderLanguageList = () => {
    const {activeId} = this.state

    return (
      <ul>
        {languageFiltersData.map(languageItem => (
          <LanguageFilterItem
            key={languageItem.id}
            LanguageFilterItemDetails={languageItem}
            setActiveId={this.setActiveId}
            isActive={activeId === languageItem.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="head">Popular</h1>

          {this.renderLanguageList()}

          {this.renderRepository()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
