// import { useSession } from "next-auth/react"
'use client'
import { useSession, signIn, signOut } from "next-auth/react"

// export default function Component() {
//   const { data: session } = useSession()
//   if (session) {
//     return <>
//       Signed in as {session.user.email} <br />
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   }

//   return <>
//     Not signed in <br />
//     <button onClick={() => signIn()}>Sign in</button>
//   </>
// }

export default function Component() {
  const { data: session } = useSession()

  return <>

    <div className="dashboard">
      <div className="navigation">
        <div className="user-info">
          <p>Nom d'utilisateur</p>
        </div>
        <ul>
          <li><a href="#">Mes notes</a></li>
          <li><a href="#">Projets</a></li>
          <li><a href="#">Paramètres</a></li>
        </ul>
      </div>
      <div className="main-content">
      </div>
    </div>
  </>
}