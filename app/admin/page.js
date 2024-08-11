
import { getServerSession } from "next-auth";
import { authOptions, signOut } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Admin() {
    const session = await getServerSession(authOptions);
    // if (!session) {
    //     redirect('/login')
    // }

    // if (session.user.role !== "admin") {
    //     redirect('/')
    // }


    return (
        <main >
            {JSON.stringify(session)}
        </main>
    );
}