// import type { AppProps } from 'next/app'
// import { SessionProvider } from "next-auth/react";

// export default function App({ Component, pageProps }: AppProps) {
//     return (
//         <SessionProvider>
//             <Component {...pageProps} />
//         </SessionProvider>
//     );
// }
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }: AppProps) {
    return (<SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>);
}
export default MyApp