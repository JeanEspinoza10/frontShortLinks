import { useEffect, useState } from "react";
import { createFreeShortLink } from "@utils/consumer";
import { Error } from "@components/status/Error";
import { Loaders } from "@components/status/Loaders";
import "./generate.css";

export const Generate = ( {changeSuccess}) => {

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorList, setErrorList] = useState({
    message: "",
    status: false,
  });


  const inputChangeValue =  (e) => {
    e.preventDefault();
    setUrl(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createFreeShortLink(url).then(async(response) => {
        setLoading(true)
        const newError = {
            ...errorList,
            status: false,
            message: ''
        }
        setErrorList(newError)
        if(response.ok) {
            setLoading(false)
            changeSuccess(true)
        } else if(response.status === 409) {
            setLoading(false)
            const data = await response.json()
            console.log(data)
            setErrorList({
                ...errorList,
                status: true,
                message: data.message
            })
        }else {
            changeSuccess(false)
            setLoading(false)
            throw new Error('Error al generar el link')
        }

    }).catch( (error) => {
        const newError = {
            ...errorList,
            status: true,
            message: error.message
        }
        setErrorList(newError)
        setLoading(false)
    });
  };

  return (
    <>
    {
        loading ? (
            <Loaders />
        ): errorList.status ? (
            <Error message={errorList.message} changeInitialState={setErrorList} />
        ) : (
            <main className="component-generate">
                <section className="component-generate-main">
                <h1>Shorten, Share, and Track Your Links</h1>
                <form className="component-generate-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={url}
                        onChange={inputChangeValue}
                        placeholder="Enter your URL" />
                    <button type="submit">Generate</button>
                </form>
                </section>
            </main>
        )
    }
    </>
  );
};
