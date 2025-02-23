import { withSession } from '../services/session';

interface AuthPageSSRProps {
    session: any;
}

export default function AuthPageSSR(props: AuthPageSSRProps) {

    return (
        <div>
            <h1>
                Auth Page Server Side Render
            </h1>
            <p>
                <a href="/logout">Logout</a>
            </p>
            <pre>
                {JSON.stringify(props, null, 2)}
            </pre>
        </div>
    )
}


export const getServerSideProps = withSession((ctx) => {
    return {
        props: {
            session: ctx.req.session,
        }
    }
})
