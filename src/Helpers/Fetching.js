export const doFetch = async (fetchUrl, fetchMethod = 'GET', fetchData = null, fetchKey = null) => {
    const options = {
        method: fetchMethod,
        body: fetchData,
        headers: {
            'authorization': `Bearer ${fetchKey}`
        }
    };

    const response = await fetch(fetchUrl, options);
    const data = await response.json();

    if(data.items) {
        return data.items
    } else if(data.item) {
        return data.item
    } else if(data.error){
        return []
    } else if(data) {
        return data;
    }
}