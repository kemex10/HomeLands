import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/ContextProvider';
import Style from './Heart.module.scss';
import { doFetch } from '../Helpers/Fetching'

const Heart = (props) => {
    const houseId = props.id;

    const { loginData, favList, setFavList } = useContext(AppContext);
    const [isFavorit, setIsFavorit] = useState(false);

    const setAsFavorit = async () => {
        setIsFavorit(true)
        setFavList([...favList, houseId]);
        
        const url = `https://api.mediehuset.net/homelands/favorites`;
        const formData = new FormData();
            formData.append('home_id', houseId);
        const response = await doFetch(url, 'POST', formData, loginData.access_token);

        const sessionData = JSON.stringify([...favList, houseId]);
        sessionStorage.setItem('favList', sessionData);

        return response;
    }

    const removeAsFavorit = async () => {
        setIsFavorit(false)
        const filteredFavList = favList.filter(elements => elements !== houseId);
        setFavList(filteredFavList);

        const url = `https://api.mediehuset.net/homelands/favorites/${houseId}`;
        const response = await doFetch(url, 'DELETE', null, loginData.access_token);

        const sessionData = JSON.stringify(filteredFavList);
        sessionStorage.setItem('favList', sessionData);
        
        return response;
    }

    useEffect(() => {
        const isLiked = favList.some(element => element === houseId);
        if(isLiked) {
            setIsFavorit(true);
        } else {
            setIsFavorit(false);
        }
    }, [favList]);


    return (
        <svg onClick={!isFavorit ? setAsFavorit : removeAsFavorit} className={isFavorit ? `${Style.heart} ${Style.active}` : Style.heart} viewBox="0 0 139.66 120.58">
            <path d="M69.92,18.48l2.27-2.91C82.31,2.63,97.79-2.79,112.7,1.38c14.17,4,24.42,16.84,26.47,32.89,2,15.37-2,29-11.34,41.25a111.79,111.79,0,0,1-25.18,24.09c-10.09,7-20.44,13.72-30.76,20.42a4.19,4.19,0,0,1-3.72.19c-14.1-9.74-28.58-19-42-29.67C14.83,81.54,5.8,70.2,1.93,55.63A50.29,50.29,0,0,1,2.24,27C6.45,13.72,14.63,4.16,28.64,1.08c14.69-3.24,27.13,1.3,37.2,12.39C67.22,15,68.44,16.66,69.92,18.48Zm50.45,23.69c0,.66-.05,1.32-.13,2-.37,3.25.42,5.83,4.11,6.36,3.05.44,5.24-1.78,5.28-5.8A50,50,0,0,0,128.78,33c-2.86-12.36-13.91-22.58-25.64-24.26-3.91-.56-6.76,1.53-6.4,4.8s2.81,4,5.5,4.69A23.36,23.36,0,0,1,120.37,42.17Z"/>
        </svg>
    )
}

export { Heart };