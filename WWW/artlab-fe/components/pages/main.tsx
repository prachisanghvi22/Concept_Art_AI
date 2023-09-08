import { Header } from "components/header";
import React from "react";

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
        <h1 className={`text-4xl font-bold ${colorClass} mb-6`}>
          Random Text Art
        </h1>
        <pre className="text-white font-mono bg-gray-800 p-4 rounded-lg">
          {textArt}
        </pre>
        <p className={`text-lg mt-6 ${colorClass}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </main>
  );
};

export default Main;
