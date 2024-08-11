"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();


    const onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)

        const res = await signIn("credentials", {
            redirect: false,
            username: data.get("username"),
            password: data.get("password")
        })

        if (res.error) {
            alert("invalid credentials")
        }
        router.push('/clienthome')


    }

    return (
        <>
            <form style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
                margin: "50px"
            }} onSubmit={onSubmit} >
                <input name="username" />
                <input name="password" type="password" />
                <button>submit</button>
            </form>
            <button onClick={() => signIn("github", {
                callbackUrl: "/clienthome"
            })} >sign in with github</button>
            {/* <button onClick={() => signIn("google")}>sign in with google</button>
            <button onClick={() => signIn("facebook")}>sign in with facebook</button> */}
        </>
    )
}