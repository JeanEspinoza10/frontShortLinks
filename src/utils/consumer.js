
export const getFreeShortLink = async () => {
    const response = await fetch(`https://linksfast.site/api/v1/free/information`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data
}

export const updateFreeShortLink = async (id , state) => {
    const response = await fetch(`https://linksfast.site/api/v1/free/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id,
            "state": state
        })
    })
    return response
}   


export const createFreeShortLink = async (url) => {
    const response = await fetch(`https://linksfast.site/api/v1/free/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "url": url
        })
    })
    return response
}



export const getFreeStatisticsShortLink = async () => {
    const response = await fetch(`https://linksfast.site/api/v1/free/statistics`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response;
}