import './index.css'

const RepositoryItem = props => {
  const {RepositoryItemDetails} = props

  const {
    name,

    issuesCount,

    forksCount,

    starsCount,

    avatarUrl,
  } = RepositoryItemDetails

  return (
    <li>
      <div className="item-container">
        <img src={avatarUrl} alt={name} className="avatar" />

        <h1>{name}</h1>

        <div className="image-and-count">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="small-Image"
          />

          <p>{starsCount}</p>
        </div>

        <div className="image-and-count">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="small-Image"
          />

          <p>{forksCount}</p>
        </div>

        <div className="image-and-count">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="small-Image"
          />

          <p>{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
