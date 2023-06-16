import './index.css'

const LanguageFilterItem = props => {
  const {LanguageFilterItemDetails, setActiveId, isActive} = props

  const {language, id} = LanguageFilterItemDetails

  const isActiveClassName = isActive ? 'active' : ''

  const onClicking = () => {
    setActiveId(id)
  }

  return (
    <li className="list-container">
      <button
        type="button"
        onClick={onClicking()}
        className={`button ${isActiveClassName}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
