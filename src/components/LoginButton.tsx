// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useState } from 'react';
import { MdArrowDropDown } from "react-icons/md";
import { RiUserSmileFill } from "react-icons/ri"

import Account from '@/components/Account'
import Button from "@/components/buttons/Button";


export default function LoginButton() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const session = useSession()
  const supabase = useSupabaseClient()

  function toggleDropdown() {
    setIsDropdownVisible(!isDropdownVisible);
  }

  return (
    <>
      <div className="relative bg-green-100 text-white p-2">
        <Button className="bg-green-100 border-0" onClick={toggleDropdown}>
          <RiUserSmileFill size={30} color="green" />
          <MdArrowDropDown size={20} color="green" />
        </Button>
        {isDropdownVisible && (
          <div className="absolute top-14 bg-green-100 right-2 text-black border-emerald-700 border-2 rounded-md z-50 w-96 border-dashed p-5">
            {!session ? (
              <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
            ) : (
              <Account session={session} />
            )}
          </div>
        )}
      </div>
    </>
  )
}