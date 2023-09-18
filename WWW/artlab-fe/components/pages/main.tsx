import { Header } from "components/header";
import React from "react";
import { UserAuthForm } from "./user-auth-form";
import AuthenticationPage from "./authentication-page";

const colors = [
  "text-red-500",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
];
const textArt = `
  _____ _    _ ______  _____ _____ _______ 
 |_   _| |  | |  ____|/ ____|  __ \__   __|
   | | | |  | | |__  | (___ | |__) | | |   
   | | | |  | |  __|  \___ \|  ___/  | |   
  _| |_| |__| | |____ ____) | |      | |   
 |_____|_____/|______|_____/|_|      |_|   
`;

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Main = () => {
  const colorClass = getRandomColor();
  return (
    <main className="">
      <Header />
      
      <div className="flex flex-col items-center justify-center h-screen">
        <AuthenticationPage/>
        
      </div>
    </main>
  );
};

export default Main;