import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import Image from "next/image"
import { PawsContainer } from "@/components/paws/PawsContainer"

import { Button } from "@/components/ui/button"

export default async function App() {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <main className="h-dvh flex flex-col items-center justify-center gap-6 text-4xl p-4">
      <div className="h-4/5 w-4/5 max-w-screen-sm border border-zinc-200 flex flex-col items-center gap-2 relative">
        <Image
          className="m-0 rounded-xl"
          src="/images/Spot-Transparent.png"
          width={200}
          height={200}
          sizes="300px"
          alt="Spot"
          priority={true}
          title="Spot"
        />
        <h1 className="font-[AtmaRegular] text-2xl">Reuniting Missing Pets</h1>

        {/* <PawsContainer /> */}

        <Button asChild>
          <LoginLink>Sign In</LoginLink>
        </Button>
        <div className="flex flex-col absolute bottom-8 ">
          <h3 className="font-[RalewayThin] text-2xl p-4 text-nowrap">
            Don't have an account?
          </h3>

          <Button asChild className="w-5/6 self-center">
            <RegisterLink>Sign Up</RegisterLink>
          </Button>
        </div>

        {/* {!isUserAuthenticated ? (
          <>
            
          </>
        ) : (
          <div className="flex gap-4 font-normal">
            {user?.picture ? (
              <Image
                className="rounded-full"
                src={user?.picture}
                width={75}
                height={75}
                alt="user profile avatar"
              />
            ) : (
              <div className=" rounded-full p-4">
                {user?.given_name?.[0]}
                {user?.family_name?.[0]}
              </div>
            )}
            <div>
              <p className="text-2xl">
                {user?.given_name} {user?.family_name}
              </p>

              <LogoutLink className="text-black">Log out</LogoutLink>
            </div>
          </div>
        )} */}
      </div>
    </main>
  )
}
