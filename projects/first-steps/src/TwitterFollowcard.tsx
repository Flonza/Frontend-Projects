//The propierty children is exclusive for the values that are wrapped in the components. Can be used 
// Like a normal propt, but not is recommended.


//Hooks or utility
import { useState } from "react";


export function TwitterFollowCard({children, user = 'unknown', initialisFollowing}: any){
    // const username = `https://unavatar.io/${userName}` 

    // let state = useState(false); 
    // let isFollowing = state[0];
    // let changeState = state[1];

    const [isFollowing, changeFollow] = useState(initialisFollowing)
    const text = isFollowing ? 'Following' : 'Follow';
    const buttonClass = isFollowing ? 'followButton isFollowing' : 'followButton';

    const clickFollow = () => {
        changeFollow(!isFollowing)
    }
    

    return (
        <article className="tw-follow-card">
            <header className="tw-follow-card-header">
                <img src={`https://unavatar.io/${user}`} className="tw-follow-card-avatar"/>
                <div className='tw-followCard-info'>
                    <p><strong>{children}</strong></p>
                    <span className='followCard-user'>@{user}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClass} onClick={clickFollow}>{text}</button>
            </aside>
        </article>
    )
}