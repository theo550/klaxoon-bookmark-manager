import { useEffect, useState } from "react"
import { convertNumberIntoTimer, getUnits, getAddTime } from '../functions/functions'

interface Props {
  data: any
}

export default function Bookmark({ data }: Props) {

  const [uploadDate, setUploadDate] = useState<string>('')
  const [minutes, setMinutes] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [day, setDay] = useState<number>(0)

  
  useEffect(() => {
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    const date = new Date(data.upload_date)
    setUploadDate(`${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`)

    // timer for added bookmark in the app
    while (minutes < 60) {
      const timer = setInterval(() => {
        setMinutes(minutes + 1)
      }, 60000)
      return () => clearInterval(timer)
    }
    if (minutes === 60) {
      setHours(hours + 1)
      setMinutes(0)
    }
    if (hours === 24) {
      setDay(day + 1)
      setHours(0)
      setMinutes(0)
    }
    
    
  }, [data.upload_date, day, minutes, hours])

  
  return (
    <div className='bookmark'>
      {data.html ? <div dangerouslySetInnerHTML={{__html:data.html}}></div> : <img src={data.thumbnail_url} alt={data.title}></img>}
      <h4>{data.title}</h4>
      <a href={data.url} rel='noreferrer' target='_blank'>{data.url}</a>
      <p>auteur : {data.author_name}</p>
      <p>ajouté il y a {getAddTime(day, hours, minutes)} {getUnits(day, hours, minutes)}</p>
      {data.upload_date ? <p>publié le {uploadDate}</p> : ''}
      <p>{data.type === 'video' ? convertNumberIntoTimer(data.duration) : data.width + ' x ' + data.height}</p>
    </div>
  )
}
