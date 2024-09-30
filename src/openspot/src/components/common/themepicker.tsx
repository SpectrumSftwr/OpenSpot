import { ArrowRightIcon } from "@heroicons/react/24/outline"
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const SelectedContext = createContext<{selected:number, setSelected:Dispatch<SetStateAction<number>>}|null>(null);


const presetDefault: TPreset = {
  id: 0,
  name: "Default",
  background: "[#FAFAFA]",
  foreground: "[#BCBCBC]",
  accent: "todo",
  secondary: "todo"
}

const presetDark: TPreset = {
  id: 1,
  name: "Dark Mode",
  background: "[#333A52]",
  foreground: "white",
  accent: "todo",
  secondary: "todo"
}

const presetGreen: TPreset = {
  id: 2,
  name: "Evergreen",
  background: "brand-800",
  foreground: "white",
  accent: "todo",
  secondary: "todo"
}

const presetMonarch: TPreset = {
  id: 3,
  name: "Monarch",
  background: "purple-950",
  foreground: "white",
  accent: "todo",
  secondary: "todo"
}

const presets=[
  presetDefault, 
  presetDark, 
  presetGreen, 
  presetMonarch
];

export const ThemePicker = () => {
  const navigate = useNavigate();
  const [selected, setSelected]  = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<TPreset|null>(null)

  const handleNavigateToNext = async (event:any) => {
    event.preventDefault();

    console.log("Saving your choice of")
    console.log(selectedPreset);

    navigate("/signup/links")
  }

  useEffect(()=> {

    for (let ps of presets) {
      if (ps.id == selected) {
        setSelectedPreset(() => ps);
      }
    }
  },[selected])

  return (
    <SelectedContext.Provider value={{selected, setSelected}}>
        <form onSubmit={(event) => handleNavigateToNext(event)} 
        className="flex flex-col items-center h-[calc(100vh-150px)] w-screen justify-between">
        <div></div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl font-semibold text-gray-500 mb-10 mt-5 text-center">
              Choose a Theme for your new OpenSpot Page.
            </div>
            <ThemePresets />
          </div>
          <div onClick={(event) => handleNavigateToNext(event)} 
            className="bg-[#047460] text-white p-2 rounded-xl w-32 flex flex-row items-center justify-center drop-shadow-lg 
            hover:text-[#047460] hover:bg-[#FAFAFA] mb-10">
            <button type="submit">
              Next
            </button>
            <ArrowRightIcon className="ml-2 w-4 h-7"/>
          </div>
        </form>
    </SelectedContext.Provider>
  )
}

const ThemePresets = () => {
  const {selected,setSelected} = useContext(SelectedContext);
  const handleIsSelected = (theme: number) => {
    setSelected(() => theme)
  }

  return (
    <div className="flex flex-col items-center justify-center md:flex-row sm">
      <div onClick={() => handleIsSelected(0)}>
        <Preset {...presetDefault} /> 
      </div>
      <div onClick={() => handleIsSelected(1)}>
        <Preset {...presetDark} />
      </div>
      <div onClick={() => handleIsSelected(2)}>
        <Preset {...presetGreen} />
      </div>
      <div onClick={() => handleIsSelected(3)}>
        <Preset {...presetMonarch} />
      </div>
    </div>
  )
}

const Preset = (preset : TPreset) => {
  const {selected, setSelected}= useContext(SelectedContext);

  return (
    <div className={`text-center ${selected == preset.id && 'bg-gray-200 p-2 rounded-xl'}`}>
      <div className="font-bold">
        {preset.name}
      </div>
      <div className={`bg-${preset.background} h-60 w-fit p-2 md:h-72 md:w-52 rounded-xl m-4 drop-shadow-2xl`}>
        <div className="w-full h-full flex flex-col items-center">
          <div className="w-full flex flex-row items-center justify-center">
            <div className={`mt-6 flex flex-row items-center h-16 w-16 bg-${preset.foreground} rounded-full drop-shadow-md`}>
            </div>
            <div className="flex flex-col">
              <div className={`mt-8 m-1 flex flex-row items-center h-2 w-28 bg-${preset.foreground} rounded-xl drop-shadow-md`}>
              </div>
              <div className={`m-1 flex flex-row items-center h-2 w-28 bg-${preset.foreground} rounded-xl drop-shadow-md`}>
              </div>
              <div className={`m-1 flex flex-row items-center h-2 w-28 bg-${preset.foreground} rounded-xl drop-shadow-md`}>
              </div>
            </div>
          </div>
          <div className={`mt-4 flex flex-row items-center h-12 w-44 bg-${preset.foreground} rounded-lg drop-shadow-md`}>
          </div>
          <div className={`mt-2 flex flex-row items-center h-12 w-44 bg-${preset.foreground} rounded-lg drop-shadow-md`}>
          </div>
          <div className={`mt-2 flex flex-row items-center h-12 w-44 bg-${preset.foreground} rounded-lg drop-shadow-md`}>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TPreset {
  id: number,
  name: string;
  background: string;
  foreground: string;
  accent: string;
  secondary: string;
}
