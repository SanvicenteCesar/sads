import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
const Header = () => {

     // routing 
     const router = useRouter();

    const redirect = () => {
        router.push('/');
    }

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
       <img 
                onClick={() => redirect() }
                className="w-32 mb-8 md:mb-0 cursor-pointer" src="/logo.png" 
            />

      <div>
        <Link href="/login">
          <a className="bg-purple-700 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
            Iniciar Sesión
          </a>
        </Link>
        {/* <Link href="/createaccount">
          <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
            Crear Cuenta
          </a>
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
