import axios from 'axios';
import { useRef, useState } from 'react'
import { youtube_parser } from './utils'
import { useEffect } from 'react';

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const [isDownloadComplete, setDownloadComplete] = useState(false);

  const handleDownloadComplete = () => {
    setDownloadComplete(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);
    console.log(youtubeID)

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }

    axios(options)
    .then(
      res => {
        setUrlResult(res.data.link)
        // location.reload();
        }
      )
    .catch(err => console.log(err))

    inputUrlRef.current.value = '';
    //
  }

  useEffect(() => {
    if (isDownloadComplete) {
      window.location.reload(); // Refresh halaman setelah pengunduhan selesai
    }
  }, [isDownloadComplete]);

  return (
      <div className="app">
        <span className="logo">youtube2mp3</span>
        <section className="content">
          <h1 className="content_title">
              Youtube to MP3 Converter
          </h1>
          <p className="content_description">
            Transform Youtube videos to Mp3
          </p>
          <form onSubmit={handleSubmit} className="form">
            <input ref={inputUrlRef} placeholder="Paste a Youtube video URL link" className="form_input" type="text" />
            <button type="submit" className="form_button">Search</button>
          </form>
          {urlResult ? (
            <a
              href={urlResult}
              download
              className="download_btn"
              onBlur={handleDownloadComplete}
            >
              Download MP3
            </a>
          ) : null}
        </section>
      </div>
  )
}

export default App
