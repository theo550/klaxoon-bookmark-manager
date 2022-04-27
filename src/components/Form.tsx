import React, { useState } from "react"
import './form.css'
import Bookmark from "./Bookmark"

export default function Form() {

  const [linkValue, setLinkValue] = useState('')
  const [bookmarksList, setBookmarksList] = useState<object[]>([])
  const [linkError, setLinkError] = useState('')


  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()

    // fetch data from http://noembed.com/
    fetch(linkValue.length === 9 ? `http://noembed.com/embed?url=https://vimeo.com/${linkValue}` : `http://noembed.com/embed?url=${linkValue}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(result => {
      if (result.error) {
        setLinkError('Il y a une erreur avec le lien')
        setLinkValue('')
      } else {
        setBookmarksList([...bookmarksList, result])
        setLinkValue('')
        setLinkError('')
      }
    })
    .catch(error => {
      console.log('fetching error', error)
    })
  }

  return (
    <div>

      <form className="form" onSubmit={submitForm}>
        <input
          value={linkValue} 
          onChange={(e) => setLinkValue(e.target.value)} 
          type="text" 
          placeholder="ex : https://vimeo.com/565486457, 565486457, https://www.flickr.com/photos/feuilllu/45771361701/"
        />
        <p className="link-error">{linkError}</p>
        <input type="submit" value="submit" />
      </form>

      <ul className="bookmark-list">
        {bookmarksList.map((element, index) => 
        <li key={index}>
          {<Bookmark data={element}/>}

          <button 
            onClick={() => {
              // Delete bookmark from the list
              bookmarksList.splice(index, 1)
              setBookmarksList([...bookmarksList])
            }} 
            className='deleteButton'>
              supprimer
          </button>

        </li>)}
      </ul>

    </div>
  )
}
