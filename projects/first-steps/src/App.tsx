import './App.css'
import { TwitterFollowCard } from './TwitterFollowcard'

export function App(){

    const jamesbond = {user: 'jamesbond', initialisFollowing:false};
    return (
        <>
            <TwitterFollowCard user="mendozasiuuu" initialisFollowing={true}>
                My avatar
            </TwitterFollowCard>
            <TwitterFollowCard  user="catlover04" initialisFollowing={false}>
                I love the cats
            </TwitterFollowCard>
            <TwitterFollowCard  {...jamesbond}>
                Im ur president
            </TwitterFollowCard>
        </>
    )
}