import './App.css'
import { TwitterFollowCard } from './TwitterFollowcard'

export function App(){

    const usersArray = [
        {
          name: "Midulive",
          username: "miudev",
          isFollowing: true
        },
        {
          name: "Mendoza",
          username: "jamesbond",
          isFollowing: false
        },
        {
          name: "Men, i love the cats",
          username: "catlover04",
          isFollowing: true
        },
        {
          name: "Guillermo del toro",
          username: "ryangosling",
          isFollowing: false
        }
      ];

    // const jamesbond = {user: 'jamesbond', initialisFollowing:false};
    return (
        usersArray.map(user => {
            const {name, username, isFollowing} = user;
            return (
                <TwitterFollowCard isFollowing={isFollowing} user={username} key={username}>
                    {name}
                </TwitterFollowCard>
            )
        })
        // <>
        //     <TwitterFollowCard  {...jamesbond}>
        //         Im ur president
        //     </TwitterFollowCard>
        // </>
    )
}