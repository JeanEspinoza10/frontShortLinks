import './App.css'
import { Header } from './structure/Header/Header'
import { Generate } from './structure/GenerateLinks/Generate'
import { Views } from './structure/ViewsLinks/Views'
import { Footer } from './structure/Footer/Footer'
import { Loaders } from './components/status/Loaders'
import { Error } from './components/status/Error'
import { Success } from './components/status/Success'
import { useState } from 'react'

function App() {
  

  const [success, setSuccess] = useState(false)
  
  return (
    <>
     
      <Header />
      <main className='component-main'>
        {
          success ? (
            <Success message={'Link generated successfully'} changeInitialState={setSuccess} />
          ): (
            <>
              <Generate changeSuccess={setSuccess} />
              <Views />
            </>
          )
        }
        
      </main>
      <Footer/>
      
    </>
  )
}

export default App
