import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from 'react';
import { MdArrowDropDown } from "react-icons/md";
import { RiUserSmileFill } from "react-icons/ri"

import Button from "@/components/buttons/Button";


export default function LoginButton() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { data: session } = useSession()

  function toggleDropdown() {
    setIsDropdownVisible(!isDropdownVisible);
  }
  return (
    <>
      <div className="relative bg-green-100 text-white p-2">
        <Button className="bg-emerald-300 border-0" onClick={toggleDropdown}>
          <RiUserSmileFill size={30} />
          <MdArrowDropDown />
        </Button>
        {isDropdownVisible && (
          <div className="absolute top-14 bg-emerald-200 right-2 text-black border-emerald-700 border-2 rounded-md z-50 border-dashed opacity-90">
            {session && (
              <div className="m-2">
                <p className="p-2">Signed in as {session.user.email}</p>
                <Button className="m-2" onClick={() => signOut()}>Sign&nbsp;out</Button>
              </div>
            )}
            {!session && (
              <Button onClick={() => signIn()}>Sign&nbsp;in</Button>
            )}
          </div>
        )}
      </div>
    </>
  )
}