import React, { useEffect, useState } from "react";
import { defaultKeys } from "./default_keys";

const BoxedKey = (p: { children: any }) => (
  <div
    className={[
      "inline-block box-border mr-1 w-fit",
      "border border-neutral-400 rounded px-1 bg-neutral-100"
    ].join(' ')}
  >
    {p.children}
  </div>
);

const Model = (p: { close: Function }) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => p.close()}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded shadow-lg">
          TODO: add stuff
        </div>
      </div>
    </div>
  );
}


export const KeyBindings = () => {
  const [modal, showModal] = useState(true);
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    chrome.storage.local.get(['keys'], (result) => {
      setKeys(result.keys ?? defaultKeys);
    });
  }, []);

  const Icon = (p: { src: string }) =>
    <div className="hidden group-hover:inline-block hover:bg-neutral-300 cursor-pointer w-fit p-1 mx-0 rounded-sm">
      <img src={p.src} className="inline" />
    </div>;


  return <div className="p-2">
    <table className="w-full min-h-[200px] select-none">
      <thead className="h-8 bg-neutral-100">
        <tr className="text-left border-b border-gray-300">
          <th className="px-2">Name</th>
          <th className="px-2">Keybinding</th>
          <th className=""></th>
        </tr>
      </thead>
      <tbody>
        {keys.map((key: any, i: number) => {
          return <tr
            key={i}
            className={"group hover:bg-neutral-200 " + (i % 2 ? "bg-zinc-100" : "")}
          >
            <td className="h-6 p-2 border-r border-gray-300">{key.name}</td>
            <td className="h-6 px-2 border-r border-gray-300">
              {key.keys.ctrl && <BoxedKey>Ctrl</BoxedKey>}
              {key.keys.alt && <BoxedKey>Alt</BoxedKey>}
              {key.keys.command && <BoxedKey>Command</BoxedKey>}
              {key.keys.shift && <BoxedKey>Shift</BoxedKey>}
            </td>
            <td className="w-14 text-right pr-1">
              <Icon src="edit.svg" />
              <Icon src="chrome-close.svg" />
            </td>
          </tr>
        })}
        <tr></tr>
      </tbody>
    </table>

    <div>
      <button
        className="mt-2 bg-sky-700 text-white rounded-sm px-2 py-1"
        onClick={() => showModal(true)}
      >Add New Key Binding</button>
    </div>

    {modal && <Model close={() => showModal(false)} />}
  </div>;
};
